#import "sqlite_EventListener.h"

@implementation sqlite_EventListener

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [ForgeLog d:@"[FETCHNOTES] didFinishLaunchingWithOptions"];
    
    if ([launchOptions objectForKey:@"UIApplicationLaunchOptionsRemoteNotificationKey"]) {
        [ForgeLog d:@"[FETCHNOTES] Received Push Notification while not running"];
        [[ForgeApp sharedApp] event:@"sqlite.pushNotificationReceived" withParam:launchOptions];
    }
}

+ (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [ForgeLog d:@"[FETCHNOTES] didRegisterForRemoteNotificationsWithDeviceToken"];
    
    NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
    token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];

    [[ForgeApp sharedApp] event:@"sqlite.didRegisterWithAPNS" withParam:token];
}

+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [ForgeLog d:@"[FETCHNOTES] didFailToRegisterForRemoteNotificationsWithDeviceToken"];
}

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    UIApplicationState state = [application applicationState];
    
        [ForgeLog d:@"[FETCHNOTES] didReceiveRemoteNotification"];
    
        if (state == UIApplicationStateActive)
        {
            [ForgeLog d:@"[FETCHNOTES] Received Push Notification while in foreground"];
            [[ForgeApp sharedApp] event:@"sqlite.pushNotificationReceivedForeground" withParam:userInfo];
        } else {
            [ForgeLog d:@"[FETCHNOTES] Received Push Notification while in background"];
            [[ForgeApp sharedApp] event:@"sqlite.pushNotificationReceivedBackground" withParam:userInfo];
        }
}

// The example below passes an event through to JavaScript when the application is resumed.
+ (void)applicationWillEnterForeground:(UIApplication *)application {
	// It is good practise to namespace any events you send to JavaScript with your module name
    application.applicationIconBadgeNumber = 0;
}

@end
