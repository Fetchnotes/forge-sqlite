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
    });
}

// Takes an array of queries and returns the resulting id's in an array.
+ (void)multiQuery:(ForgeTask *)task queries:(NSArray *)queries {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        @try {
        
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
        }
        
        @catch (NSException *exception) {
            [task error: exception.reason];
        }
    });
}


// Returns the JSON array of objects that match the passed in sqlite query.
+ (void)query:(ForgeTask *)task query:(NSString *)query {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        @try {
        
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
        }
        
        @catch (NSException *exception) {
            [task error: exception.reason];
        }
    });
}

// Drops the given tables listed in an array of strings.
+ (void)dropTables:(ForgeTask *)task {
    
    dispatch_queue_t queue;
    
    queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        
        @try {
            
            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
            NSString *docsPath = [paths objectAtIndex:0];
            NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
            
            NSFileManager *fileManager = [NSFileManager defaultManager];
            [fileManager removeItemAtPath:path error:NULL];
            
            [task success: nil];
        }
        
        @catch (NSException *exception) {
            [task error: exception.reason];
        }
    });
}

+ (void)checkIfRegisteredWithAPNS:(ForgeTask *)task
{
    [ForgeLog d:@"[FETCHNOTES] checkIfRegisteredWithAPNS"];
    
    if ([[UIApplication sharedApplication] enabledRemoteNotificationTypes] != 0) {
        [task success: nil];
    } else {
        [task error: nil];
    }
}

+ (void)registerWithAPNS:(ForgeTask *)task
{
    [ForgeLog d:@"[FETCHNOTES] registerWithAPNS"];
    
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound];
    if ([[UIApplication sharedApplication] enabledRemoteNotificationTypes] != 0) {
        [task success: nil];
    } else {
        [task error: nil];
    }
}

@end
