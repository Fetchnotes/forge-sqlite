package io.trigger.forge.android.modules.sqlite;

import io.trigger.forge.android.core.ForgeApp;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

public class Database extends SQLiteOpenHelper {

	private static final String DB_NAME = "ForgeDB";

	private static Database helper = null;
	private static SQLiteDatabase database = null;

	private static Database getHelper() {
		if (helper == null){
			helper = new Database(ForgeApp.getApp(), DB_NAME, null, 1);
		}
		return helper;
	}

	public static SQLiteDatabase getDatabase(){
		if (database == null){
			database = getHelper().getWritableDatabase();
		}
		return database;
	}

	public static void deleteDatabase(){
		if (database != null){
			database.close();
			database = null;
		}
		ForgeApp.getApp().deleteDatabase(DB_NAME);
	}

	private Database(Context context, String name, CursorFactory factory,
			int version) {
		super(context, name, factory, version);
	}

	@Override
	public void onCreate(SQLiteDatabase arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onUpgrade(SQLiteDatabase arg0, int arg1, int arg2) {
		// TODO Auto-generated method stub

	}

}
