// Expose the native API to javascript
forge.sqlite = {
    // Events
    'onPushNotificationReceived': {
        'addListener': function (success) {
           forge.internal.addEventListener("sqlite.pushNotificationReceived", success);
        }
    },
    'onPushNotificationReceivedForeground': {
        'addListener': function (success) {
           forge.internal.addEventListener("sqlite.pushNotificationReceivedForeground", success);
        }
    },
    'onPushNotificationReceivedBackground': {
        'addListener': function (success) {
           forge.internal.addEventListener("sqlite.pushNotificationReceivedBackground", success);
        }
    },
    'onDeviceTokenReceived': {
        'addListener': function (success) {
            forge.internal.addEventListener("sqlite.deviceTokenReceived", success);
        }
    }
}
