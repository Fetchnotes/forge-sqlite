module("sqlite");

asyncTest("Create-write-read test", 1, function(){
	// Generate a unique table name using the time
	var tableName = "test" + Date.now();

	// Create a new table `tableName` with a primary key and one text field
	forge.internal.call('sqlite.createTables', {schema: [{
		name: tableName,
		schema: "(ID INT PRIMARY KEY, NAME TEXT)"
	}]}, function(){
		// Success

		// The table was successfully created, so let's insert a row
		insertQueries = [{
			query: "INSERT INTO "+tableName+" (NAME) VALUES ('Test row')"
		}];
		forge.internal.call('sqlite.writeAll', {queries: insertQueries}, function(){
			// Success

			// Looks like the insert was successful, let's validate it
			forge.internal.call('sqlite.query', {query: "SELECT * FROM "+tableName}, function(rows){
				//Success
				if (rows.length == 1 && rows[0]['NAME'] == 'Test row') {
					// Our query returned the row that we inserted! It works!
					ok(true, "Data verified!");
				} else {
					ok(false, "Data incorrect, recieved: " + JSON.stringify(rows));
				};
				start();
			}, function(){
				// Failure
				ok(false, "Query failed");
				start();
			});
		}, function(){
			ok(false, "Insert row failed");
			start();
		});
	}, function(){
		// Failure
		ok(false, "Create table " + tableName + "failed");
		start();
	})
});
