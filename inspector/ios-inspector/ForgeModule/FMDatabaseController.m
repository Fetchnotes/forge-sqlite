//
//  FMDatabaseController.m
//  ForgeModule
//
//  Created by Giles Van Gruisen on 7/8/14.
//  Copyright (c) 2014 Trigger Corp. All rights reserved.
//

#import "FMDatabaseController.h"

@interface FMDatabaseController ()

@property (nonatomic, assign) dispatch_queue_t dispatch_queue;
@property (nonatomic, strong) FMDatabaseQueue *databaseQueue;

@end

@implementation FMDatabaseController

+ (FMDatabaseController *)controller
{
    static FMDatabaseController *controller;
    static dispatch_once_t onceToken;

    if (!controller) {

        // Only instantiate if it doesn't yet exist
        controller = [FMDatabaseController new];

        // Create dispatch queue for database calls
        controller.dispatch_queue = dispatch_queue_create("com.fetchnotes.database_dispatch_queue", NULL);

    }

    // Only set databaseQueue once and ensure it's off main thread
    dispatch_once(&onceToken, ^{

        // Build path to database
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *docsPath = [paths objectAtIndex:0];
        controller.databasePath = [docsPath stringByAppendingPathComponent:@"database.sqlite"];

        // Build and set a databaseQueue with database path
        controller.databaseQueue = [FMDatabaseQueue databaseQueueWithPath:controller.databasePath];

    });

    return controller;
}

- (void)queueInDatabase:(void(^)(FMDatabase *database))operation
{
    // Wrap queue inDatabase with asynchronous dispatch
    dispatch_async(self.dispatch_queue, ^ {

        // Pass operation block to queue inDatabase: to perform off the main thread
        [self.databaseQueue inDatabase:operation];

    });
}

@end
