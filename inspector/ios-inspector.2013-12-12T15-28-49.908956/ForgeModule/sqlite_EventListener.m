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

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [[ForgeApp sharedApp] event:@"sqlite.pushNotificationReceived" withParam:@"thing"];
}

// The example below passes an event through to JavaScript when the application is resumed.
+ (void)applicationWillEnterForeground:(UIApplication *)application {
	// It is good practise to namespace any events you send to JavaScript with your module name
    application.applicationIconBadgeNumber = 0;
}

@end