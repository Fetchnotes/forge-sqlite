#import "sqlite_API.h"
#import "FMDatabaseController.h"

@implementation sqlite_API

// Takes an array of sqlite queries to construct the database schema.
+ (void)createTables:(ForgeTask *)task schema:(NSArray *)tableDictionaries {

    // Wrap everything ing controller call
    [[FMDatabaseController controller] queueInDatabase:^(FMDatabase *database) {

        // Loop over each object passed in tableDictionaries (each correlates to a table)
        for (NSDictionary *tableDictionary in tableDictionaries) {

            // Grab table name from object for create query
            NSString *tableName = [tableDictionary objectForKey:@"name"];

            // Grab table schema from object for create query
            NSString *tableSchema = [tableDictionary objectForKey:@"schema"];

            // Build query to create table with name and schema
            NSString *tableQuery = [NSString stringWithFormat:@"CREATE TABLE %@ %@", tableName, tableSchema];

            // Execute update query to create the table
            [database executeUpdate:tableQuery];
        }

        // Call completion on the forge task
        [task success: nil];
    }];

}

// Takes an array of objects. Each object contains a string "query", and array of strings ["args"]. If the write was succesfully executed, this call will return the affected ids within an array.
+ (void)writeAll:(ForgeTask *)task queries:(NSArray *)updateQueries {
    
    [[FMDatabaseController controller] queueInDatabase:^(FMDatabase *database) {

        // Empty mutable array to contain ids of rows affected in given update queries
        NSMutableArray *rowsAffected = [[NSMutableArray alloc] init];

        for (NSDictionary *queryDictionary in updateQueries) {

            // Grab query string for update query
            NSString *queryString = [queryDictionary objectForKey:@"query"];

            // Grab arguments array for update query
            NSMutableArray *queryArguments = [queryDictionary objectForKey:@"args"];

            // Execute update query and set bool depending on its success
            BOOL updateSuccessful = [database executeUpdate:queryString withArgumentsInArray:queryArguments];

            // Check if the update query was successful
            if (updateSuccessful){

                // Update query successful, add last row to rowsAffected
                [rowsAffected addObject:@([database lastInsertRowId])];

            } else {

                // Update query unsuccessful, return to JS via forgetask error: with db's last error
                [task error:[database lastErrorMessage]];

            }
        }

        // Return to JS via forgetask success with array of ids of rows affected
        [task success:rowsAffected];
    }];
}

// Takes an array of queries and returns the resulting id's in an array.
+ (void)multiQuery:(ForgeTask *)task queries:(NSArray *)queries {
    
    [[FMDatabaseController controller] queueInDatabase:^(FMDatabase *database) {

        // Onstantiate empty mutable array to fill with one array per query
        NSMutableArray *queriesRecords = [@[] mutableCopy];

        // Loop through queries to perform each
        for (id query in queries) {

            // Fetch FMResult for given query
            FMResultSet *resultSet = [database executeQuery:query];

            if (resultSet) {

                // We have results, instantiate empty mutable array to fill with records
                NSMutableArray *records = [@[] mutableCopy];

                // Loop through result set
                while ([resultSet next]) {

                    // Add each result/record dictionary to records
                    [records addObject:[resultSet resultDictionary]];

                }

                // Add records for this query to the larger set queriesRecords
                [queriesRecords addObject:records];

            } else {

                // Nothing returned in result set, return to JS via forge task error
                [task error:[database lastErrorMessage]];

            }
        }

        // Return to JS via forge task success with records from queries
        [task success:queriesRecords];
    }];
}


// Returns the JSON array of objects that match the passed in sqlite query.
+ (void)query:(ForgeTask *)task query:(NSString *)query {

    // Check there is actually a query to perform
    if ([query length] == 0) {

        // Query is invalid, return to JS via forge task error
        [task error: @"Error: Query is 0 characters long"];

        return;
    }

    [[FMDatabaseController controller] queueInDatabase:^(FMDatabase *database) {

        // Fetch FMResultSet for given query
        FMResultSet *resultSet = [database executeQuery:query];

        // Make sure something was actually returned in the result set
        if (resultSet) {

            // We have results, instantiate empty mutable array to fill with records
            NSMutableArray *records = [@[] mutableCopy];

            // Loop through result set
            while ([resultSet next]) {

                // Add each result/record dictionary to records
                [records addObject:[resultSet resultDictionary]];

            }

            // Return to JS via forge task success with records
            [task success:records];

        } else {

            // Nothing returned in result set, return to JS via forge task error: with db's last error
            [task error:[database lastErrorMessage]];

        }
    }];
}

// Deletes entire database
+ (void)removeDatabase:(ForgeTask *)task {

    // Fetch database path specified on FMDatabaseController
    NSString *databasePath = [FMDatabaseController controller].databasePath;

    // Instantiate file manager to handle deletion
    NSFileManager *fileManager = [NSFileManager defaultManager];

    // Use file manager to delete database at path
    [fileManager removeItemAtPath:databasePath error:NULL];

    // Return to JS via forge task success
    [task success: nil];
}

@end
