#import "sqlite_API.h"
#import "FMDatabase.h"
#import "FMDatabaseQueue.h"

@implementation sqlite_API

// Takes an array of sqlite queries to construct the database schema.
+ (void)createTables:(ForgeTask *)task schema:(NSArray *)schema {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        @try {
            
            // Locate Documents directory and open database.
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
            NSString *docsPath = [paths objectAtIndex:0];
            NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
            FMDatabase *database = [FMDatabase databaseWithPath:path];
            
            if (![database open]) {
                [task error: @"ERROR: createTables() was unable to open or create a database."];
            }
            [database open];
            
            // Iterate through the array and create a table with each name and then run the query
            for (NSDictionary * dataDict in schema) {
                NSString * NAME = [dataDict objectForKey:@"name"];
                NSString * SCHEMA = [dataDict objectForKey:@"schema"];
                NSString * QUERY = [NSString stringWithFormat:@"CREATE TABLE %@ %@", NAME, SCHEMA];
                [database executeUpdate:QUERY];
            }
            
            [database close];
            
            [task success: nil];
        }
        
        @catch (NSException *exception) {
            [task error: exception.reason];
        }
        
        @finally {
            [task error:@"Unknown failure"];
        }
    });
}

// Takes an array of objects. Each object contains a string "query", and array of strings ["args"]. If the write was succesfully executed, this call will return the affected ids within an array.
+ (void)writeAll:(ForgeTask *)task queries:(NSArray *)queryStrings {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        @try {
    
            // Locate Documents directory and open database.
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
            NSString *docsPath = [paths objectAtIndex:0];
            NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
            FMDatabase *database = [FMDatabase databaseWithPath:path];
            
            if (![database open]) {
                [task error: @"ERROR: createTables() was unable to open or create a database."];
            }
            [database open];
            
            NSMutableArray *rowIds = [[NSMutableArray alloc] init];
            int lastInsertRowId = 0;
            
            for (NSDictionary *dataDict in queryStrings) {
                NSMutableArray *args = [dataDict objectForKey:@"args"];
                NSString *query = [dataDict objectForKey:@"query"];
                if ([database executeUpdate:query withArgumentsInArray:args] == NO){
                    [task error: [database lastErrorMessage]];
                }
                else {
                    lastInsertRowId = [database lastInsertRowId];
                    NSNumber *lastInsertRowIdInteger = [[NSNumber alloc] initWithInt:lastInsertRowId];
                    [rowIds addObject:lastInsertRowIdInteger];
                }
            }
            
            [database close];
            [task success: rowIds];
        }
        
        @catch (NSException *exception) {
            [task error: exception.reason];
        }
        
        @finally {
            [task error:@"Unknown failure"];
        }
    });
}

// Takes an array of queries and returns the resulting id's in an array.
+ (void)multiQuery:(ForgeTask *)task queries:(NSArray *)queries {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        // Locate Documents directory and open database.
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *docsPath = [paths objectAtIndex:0];
        NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
        FMDatabase *database = [FMDatabase databaseWithPath:path];
        [database open];
        
        NSMutableArray *multiQueryResultsArray = [NSMutableArray array];
        
        for (id query in queries) {
            FMResultSet *resultsSet = [database executeQuery:query];
            if (resultsSet == nil) {
                [task error:[database lastErrorMessage]];
            }
            else {
                NSMutableArray *queryResultsArray = [NSMutableArray array];
                while ([resultsSet next]) {
                    [queryResultsArray addObject:[resultsSet resultDictionary]];
                }
                [multiQueryResultsArray addObject:queryResultsArray];
            }
        }
        [database close];
        [task success:multiQueryResultsArray];
        
    });
}


// Returns the JSON array of objects that match the passed in sqlite query.
+ (void)query:(ForgeTask *)task query:(NSString *)query {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        // Error handling.
        if ([query length] == 0) {
            [task error: @"Error: Query is 0 characters long"];
            return;
        }
        
        // Locate Documents directory and open database.
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *docsPath = [paths objectAtIndex:0];
        NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
        FMDatabase *database = [FMDatabase databaseWithPath:path];
        [database open];
        
        // Pop all query results into an NSMutableArray & close database.
        NSMutableArray *resultsArray = [NSMutableArray array];
        FMResultSet *resultsSet = [database executeQuery:query];
        if (resultsSet == nil) {
            [task error:[database lastErrorMessage]];
        }
        else {
            while ([resultsSet next]) {
                [resultsArray addObject:[resultsSet resultDictionary]];
            }
            [database close];
            [task success:resultsArray];
        }
    });
}

// Drops the given tables listed in an array of strings.
+ (void)dropTables:(ForgeTask *)task tables:(NSArray *)tables {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        // Locate Documents directory and open database.
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *docsPath = [paths objectAtIndex:0];
        NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
        FMDatabase *database = [FMDatabase databaseWithPath:path];
        
        if (![database open]) {
            [task error: @"ERROR: createTables() was unable to open or create a database."];
        }
        
        [database open];
        
        // Iterate through the array and drop each table
        for (id item in tables) {
            NSString * query = [NSString stringWithFormat:@"DROP TABLE %@", item];
            [database executeUpdate:query];
        }
        
        [database close];
        
        [task success: nil];
    });
}

+ (void)getDeviceToken:(ForgeTask *)task {
    
    #if !(TARGET_IPHONE_SIMULATOR)
    
        dispatch_queue_t queue;
        
        queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
        dispatch_async(queue, ^{
            
            // Locate Documents directory and open database.
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
            NSString *docsPath = [paths objectAtIndex:0];
            NSString *path = [docsPath stringByAppendingPathComponent:@"temp-database.sqlite"];
            FMDatabase *tempDatabase = [FMDatabase databaseWithPath:path];

            [tempDatabase open];
            
            NSMutableArray *results = [NSMutableArray array];
            NSString* query = @"SELECT * from temp";
            FMResultSet *set = [tempDatabase executeQuery:query];
            if (set == nil) {
                [task error:[tempDatabase lastErrorMessage]];
            }
            else {
                while ([set next]) {
                    [results addObject:[set resultDictionary]];
                }
                [tempDatabase close];
                [task success:results];
            }
        });
    
    #else
    
        [task success:nil];
    
    #endif
}

@end
