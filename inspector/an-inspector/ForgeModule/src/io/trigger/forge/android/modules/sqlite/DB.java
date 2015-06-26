package io.trigger.forge.android.modules.sqlite;

import io.trigger.forge.android.core.ForgeApp;
import android.database.sqlite.SQLiteDatabase;

public class DB {

	private static final String DB_NAME = "ForgeDB";

	private SQLiteHelper helper;
	private SQLiteDatabase database = null;

	public DB() {
		helper = new SQLiteHelper(ForgeApp.getApp(), DB_NAME, null, 1);
	}
	
	public SQLiteDatabase getDatabase(){
		if (database == null){
			database  = helper.getWritableDatabase();
		}
		return database;
	}

	public void deleteDatabase(){
		database.close();
		database = null;
		ForgeApp.getApp().deleteDatabase(DB_NAME);
	}
}
