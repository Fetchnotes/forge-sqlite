//
//  FMDatabaseController.h
//  ForgeModule
//
//  Created by Giles Van Gruisen on 7/8/14.
//  Copyright (c) 2014 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FMDatabase.h"
#import "FMDatabaseQueue.h"

@interface FMDatabaseController : NSObject

+ (FMDatabaseController *)controller;

- (void)queueInDatabase:(void(^)(FMDatabase *))operation;

@end
