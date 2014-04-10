#import "sqlite_API.h"
#import "FMDatabase.h"
#import "FMDatabaseQueue.h"

@implementation sqlite_API

// Takes an array of sqlite queries to construct the database schema.
+ (void)createTables:(ForgeTask *)task schema:(NSArray *)schema {
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
    
    FMDatabaseQueue *queue = [FMDatabaseQueue databaseQueueWithPath:path];
    
    [queue inDatabase:^(FMDatabase *database) {
        for (NSDictionary * dataDict in schema) {
            NSString * NAME = [dataDict objectForKey:@"name"];
            NSString * SCHEMA = [dataDict objectForKey:@"schema"];
            NSString * QUERY = [NSString stringWithFormat:@"CREATE TABLE %@ %@", NAME, SCHEMA];
            [database executeUpdate:QUERY];
        }
        [task success: nil];
    }];
}

// Takes an array of objects. Each object contains a string "query", and array of strings ["args"]. If the write was succesfully executed, this call will return the affected ids within an array.
+ (void)writeAll:(ForgeTask *)task queries:(NSArray *)queryStrings {
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
    
    FMDatabaseQueue *queue = [FMDatabaseQueue databaseQueueWithPath:path];
    
    [queue inDatabase:^(FMDatabase *database) {
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
        [task success: rowIds];
    }];
}

// Takes an array of queries and returns the resulting id's in an array.
+ (void)multiQuery:(ForgeTask *)task queries:(NSArray *)queries {
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
    
    FMDatabaseQueue *queue = [FMDatabaseQueue databaseQueueWithPath:path];
    
    [queue inDatabase:^(FMDatabase *database) {
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
        [task success:multiQueryResultsArray];
    }];
}


// Returns the JSON array of objects that match the passed in sqlite query.
+ (void)query:(ForgeTask *)task query:(NSString *)query {
    
    if ([query length] == 0) {
        [task error: @"Error: Query is 0 characters long"];
        return;
    }
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
    FMDatabaseQueue *queue = [FMDatabaseQueue databaseQueueWithPath:path];
    
    [queue inDatabase:^(FMDatabase *database) {
        
        // Pop all query results into an NSMutableArray
        NSMutableArray *resultsArray = [NSMutableArray array];
        FMResultSet *resultsSet = [database executeQuery:query];
        if (resultsSet == nil) {
            [task error:[database lastErrorMessage]];
        }
        else {
            while ([resultsSet next]) {
                [resultsArray addObject:[resultsSet resultDictionary]];
            }
            [task success:resultsArray];
        }
    }];
}

// Drops the given tables listed in an array of strings.
+ (void)dropTables:(ForgeTask *)task tables:(NSArray *)tables {
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
    
    FMDatabaseQueue *queue = [FMDatabaseQueue databaseQueueWithPath:path];
    
    [queue inDatabase:^(FMDatabase *database) {
        for (NSString*  table in tables){
            NSString *query = [NSString stringWithFormat:@"DROP TABLE %@", table];
            if ([database executeQuery:query] == NO){
                [task error: [database lastErrorMessage]];
            }
        }
        [task success: nil];
    }];
}

// Deletes entire database
+ (void)removeDatabase:(ForgeTask *)task {
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"database.sqlite"];
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath:path error:NULL];
    
    [task success: nil];
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
    [task success: nil];
}

@end
