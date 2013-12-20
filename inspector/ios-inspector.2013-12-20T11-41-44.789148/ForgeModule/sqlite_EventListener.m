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
    // Parse token
    NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];

    // Find temp-database
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"temp-database.sqlite"];
    BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:path];

    // We only want to create it if it doesn't already exist
    if (fileExists == NO) {
        
        // TODO:
        // destroy and recreate
        // NSFileManager *fileManager = [NSFileManager defaultManager];
        // [fileManager removeItemAtPath:path error:NULL];
        
        FMDatabase *database = [FMDatabase databaseWithPath:path];
        
        [database open];
        [database executeUpdate:@"CREATE TABLE temp(DeviceToken VARCHAR(50))"];
        [database executeUpdate:@"INSERT into temp(DeviceToken) VALUES (?)", token];
    
        [database executeQuery:@"SELECT * from temp"];
        
        [database close];
    }
}

+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"failed to register" message:@"ya" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Say Hello",nil];
    [alert show];
}

//nothing
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
//{
//    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"xxx" message:@"hai" delegate:self cancelButtonTitle:@"Done" otherButtonTitles: @"Anzeigen", nil];
//    [alert show];
//    NSLog(@"didReceiveRemoteNotification");
//    NSDictionary *remoteNotif = [launchOptions objectForKey: UIApplicationLaunchOptionsRemoteNotificationKey];
//    //Accept push notification when app is not open
//    if (remoteNotif) {
////        [self handleRemoteNotification:application userInfo:remoteNotif];
//        return YES;
//    }
//    
//    return YES;
//}

// Nothing
//+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
//    [[ForgeApp sharedApp] event:@"sqlite.pushNotificationReceived" withParam:@"thing"];
//    NSLog(@"didReceiveRemoteNotification");
//    [ForgeLog d:@"didReceiveRemoteNotification"];
//    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"xxx" message:@"hai" delegate:self cancelButtonTitle:@"Done" otherButtonTitles: @"Anzeigen", nil];
//    [alert show];
//}

// Nothing
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//{
//    if ( application.applicationState == UIApplicationStateActive ) {
//        // app was already in the foreground
//        NSLog(@"in foreground");
//    } else {
//        // app was just brought from background to foreground
//        NSLog(@"didReceiveRemoteNotification");
//        [ForgeLog d:@"didReceiveRemoteNotification"];
//        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"xxx" message:@"hai" delegate:self cancelButtonTitle:@"Done" otherButtonTitles: @"Anzeigen", nil];
//        [alert show];
//    }
//}

//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
//    
//    UIApplicationState state = [application applicationState];
//    if (state == UIApplicationStateActive)
//    {
//        
//        UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"xxx" message:yourMessage delegate:self cancelButtonTitle:@"Done" otherButtonTitles: @"Anzeigen", nil] autorelease];
//        [alert setTag: 2];
//        [alert show];
//    } else {
//        // Do nothing
//    }
//}

// The example below passes an event through to JavaScript when the application is resumed.
+ (void)applicationWillEnterForeground:(UIApplication *)application {
	// It is good practise to namespace any events you send to JavaScript with your module name
    application.applicationIconBadgeNumber = 0;
}

@end
