package io.trigger.forge.android.modules.sqlite;

import java.util.ArrayList;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import io.trigger.forge.android.core.ForgeParam;
import io.trigger.forge.android.core.ForgeTask;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteException;

public class API {
	private static final String INSERT_QUERY = "CREATE TABLE %s %s";

	public static void createTables(final ForgeTask task, @ForgeParam("schema") final JsonArray tableDictionaries){
		for(JsonElement element : tableDictionaries){
			if (!element.isJsonObject()){
				task.error("Schemas must be JSON objects");
				return;
			}
			JsonObject obj = element.getAsJsonObject();
			if (!obj.has("name") || !obj.has("schema")){
				task.error("Each table must have a `name` and `schema`");
				return;
			}
			String sql = String.format(INSERT_QUERY, obj.get("name").getAsString(), obj.get("schema").getAsString());
			try {
				Database.getDatabase().execSQL(sql);
			} catch (SQLException e) {
				task.error(e);
			}
		}
		task.success();
	}
	public static void writeAll(final ForgeTask task, @ForgeParam("queries") final JsonArray updateQueries){
		JsonArray rowsAffected = new JsonArray();

		for (JsonElement query : updateQueries){
			if (!query.isJsonObject()){
				task.error("Queries must be JSON objects");
				return;
			}
			JsonObject queryObj = query.getAsJsonObject();
			if (!queryObj.has("query")){
				task.error("Each query must have a `query` field");
				return;
			}

			// If binding arguments were included, copy them into an array
			String[] args = new String[0];
			if (queryObj.has("args")){
				ArrayList<String> argsList = new ArrayList<String>();
				for (JsonElement arg : queryObj.get("args").getAsJsonArray()){
					argsList.add(arg.getAsString());
				}
				args = argsList.toArray(new String[argsList.size()]);
			}

			try {
				Database.getDatabase().execSQL(queryObj.get("query").getAsString(), args);

				int lastRow = getLastInsertRow();
				rowsAffected.add(new JsonPrimitive(lastRow));
			} catch (SQLException e) {
				task.error(e);
			}
		}
		task.success(rowsAffected);
	}
	public static void multiQuery(final ForgeTask task, @ForgeParam("queries") final JsonArray queries){
		JsonArray allResults = new JsonArray();
		try{
			for(JsonElement queryEl : queries){
				String query = queryEl.getAsString();
				JsonArray result = executeQuery(query);
				allResults.add(result);
			}
			task.success(allResults);
		} catch (SQLException e) {
			task.error(e);
		}
	}
	public static void query(final ForgeTask task, @ForgeParam("query") final String query){
		try {
			JsonArray results = executeQuery(query);
			task.success(results);
		} catch (SQLException e) {
			task.error(e);
		}
	}
	public static void removeDatabase(final ForgeTask task){
		Database.deleteDatabase();
	}

	private static JsonArray executeQuery(String query) throws SQLiteException {
		if (query.length() == 0){
			throw new SQLiteException("Error: Query is 0 characters long");
		}
		Cursor cursor = null;
		try {
			cursor = Database.getDatabase().rawQuery(query, null);

			JsonArray results = cursorToJson(cursor);
			return results;
		} catch (SQLiteException  e) {
			throw e;
		} finally {
			cursor.close();
		}
	}
	private static JsonArray cursorToJson(Cursor cursor){
		JsonArray resultSet = new JsonArray();

		cursor.moveToFirst();
		while (!cursor.isAfterLast()) {
			int totalColumn = cursor.getColumnCount();
			JsonObject rowObject = new JsonObject();

			for( int i=0 ;  i< totalColumn ; i++ ) {
				String columnName = cursor.getColumnName(i);
				if( columnName != null ) {
					JsonElement value;
					switch (cursor.getType(i)){
					case Cursor.FIELD_TYPE_INTEGER:
						value = new JsonPrimitive(cursor.getInt(i));
						break;
					case Cursor.FIELD_TYPE_FLOAT:
						value = new JsonPrimitive(cursor.getFloat(i));
						break;
					case Cursor.FIELD_TYPE_STRING:
						value = new JsonPrimitive(cursor.getString(i));
						break;
					case Cursor.FIELD_TYPE_NULL:
					default:
						value = JsonNull.INSTANCE;
						break;
					}
					rowObject.add(columnName, value);
				}
			}
			resultSet.add(rowObject);
			cursor.moveToNext();
		}
		return resultSet;
	}
	private static int getLastInsertRow() {
		int row;
		Cursor cursor = null;
		try {
			cursor = Database.getDatabase().rawQuery("SELECT last_insert_rowid() AS last_row", null);
			cursor.moveToFirst();
			row = cursor.getInt(cursor.getColumnIndex("last_row"));
		} finally {
			if(cursor != null){
				cursor.close();
			}
		}
		return row;
	}
}
