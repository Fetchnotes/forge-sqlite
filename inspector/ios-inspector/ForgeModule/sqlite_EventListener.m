#import "sqlite_EventListener.h"
#import "FMDatabase.h"
#import "FMDatabaseQueue.h"

@implementation sqlite_EventListener

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [application registerForRemoteNotificationTypes:UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound];
}

+ (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    #if !(TARGET_IPHONE_SIMULATOR)
    
    NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];


    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Device Token"
                                                    message:token
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];

    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"temp-database.sqlite"];
    BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:path];
    
    NSString * booleanString = (fileExists) ? @"True" : @"False";

    UIAlertView *alert2 = [[UIAlertView alloc] initWithTitle:@"temp-database exists?"
                                                    message: booleanString
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert2 show];

    if (fileExists == NO) {
        // destroy and recreate
//            NSFileManager *fileManager = [NSFileManager defaultManager];
//            [fileManager removeItemAtPath:path error:NULL];
        FMDatabase *database = [FMDatabase databaseWithPath:path];
        
        [database open];
        [database executeUpdate:@"CREATE TABLE temp(DeviceToken VARCHAR(50))"];
        [database executeUpdate:@"INSERT into temp(DeviceToken) VALUES (?)", token];
        [database close];
    }
    
    #endif
}

+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [ForgeLog i:@"Failed to register for remote notifications"];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"failed to register for push notifs"
                                                    message:[error description]
                                                   delegate:nil
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];
}

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
}

// The example below passes an event through to JavaScript when the application is resumed.
+ (void)applicationWillEnterForeground:(UIApplication *)application {
	// It is good practise to namespace any events you send to JavaScript with your module name
    application.applicationIconBadgeNumber = 0;
}

@end
