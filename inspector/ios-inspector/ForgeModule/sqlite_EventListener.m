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
    NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"token" message:token delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Say Hello",nil];
    [alert show];

    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docsPath = [paths objectAtIndex:0];
    NSString *path = [docsPath stringByAppendingPathComponent:@"temp-database.sqlite"];
    BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:path];
    
    UIAlertView *alert2 = [[UIAlertView alloc] initWithTitle:@"path" message:path delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Say Hello",nil];
    [alert2 show];

    if (fileExists == NO) {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"it doesn't exist" message:@"nope" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Say Hello",nil];
        [alert show];
        // destroy and recreate
        // NSFileManager *fileManager = [NSFileManager defaultManager];
        // [fileManager removeItemAtPath:path error:NULL];
        FMDatabase *database = [FMDatabase databaseWithPath:path];
        
        [database open];
        [database executeUpdate:@"CREATE TABLE temp(DeviceToken VARCHAR(50))"];
        [database executeUpdate:@"INSERT into temp(DeviceToken) VALUES (?)", token];
    
        [database executeQuery:@"SELECT * from temp"];
        
        [database close];
    } else {
        UIAlertView *alert3 = [[UIAlertView alloc] initWithTitle:@"does exist?" message:token delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Say Hello",nil];
        [alert3 show];
    }
}

+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"failed to register" message:@"ya" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Say Hello",nil];
    [alert show];
}

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {}

// The example below passes an event through to JavaScript when the application is resumed.
+ (void)applicationWillEnterForeground:(UIApplication *)application {
	// It is good practise to namespace any events you send to JavaScript with your module name
    application.applicationIconBadgeNumber = 0;
}

@end
