forge-sqlite
=============
Native persistance for HTML5 iOS apps with [Trigger.IO](https://trigger.io/docs/current/api/native_plugins/index.html). Creates an sqlite3 database, provides abstract CUD methods to be called via JS, helps capture the `device token` for use in push notification registration, and exposes push notification payloads to the JS.

##Database usage
* Create queries with the structure shown below and they will be performed using [FMDB](https://github.com/ccgus/fmdb) transactions.
* No need to include `;` at the end of your sqlite queries.
* sqlite is dependent upon [FMDB](https://github.com/ccgus/fmdb).
* ARC friendly.
* Uses Grand Central Dispatch.

###createTables
Takes an array of sqlite queries to construct the database schema.
```js
forge.internal.call('database.createTables', {
  schema: "CREATE TABLE sample(x INTEGER PRIMARY KEY ASC, y, z)"
}, success, error);
```

###writeAll
Takes an array of objects. Each object contains a string `"query"`, and array containing a string `["arg"]`. If the write was succesfully executed, this call will return the id's affected within an array.
```js
forge.internal.call('database.writeAll', {
  queries: [
    {
      query: 'UPDATE...',
      args: ['arg']
    },
    {
      query: 'UPDATE...',
      args: ['arg']
    }
  ]
}, success, error);
```

###multiQuery
Takes an array of queries and returns the resulting id's in an array.
```js
forge.internal.call('database.multiQuery', {
  queries: ["SELECT...","SELECT..."]
}, success, error);
```

###query
Returns the JSON array of objects that match the passed in sqlite query.
```js
forge.internal.call('database.query', {
  query: "SELECT..."
}, success, error);
```

###dropTables
Drops all tables.
```js
forge.internal.call('database.dropTables', success, error);
```

##Push Notifications with Urban Airship/Kinvey
The Basics:
1. A "distribution" Apple Push Notification Service (APNS) certificate first needs to be uploaded to Kinvey (or UA directly) . This differs from a development APNS certificate. Apple has two separate APNS servers that DO NOT work together. A device registered on one will not receive push notifications from the other. 
2. Registering a device with a APNS will yield a `deviceToken`. This token must then be stored in the `user._push` array on Kinvey. This associates certain device(s) with a user.
3. The very *first time that a device is registered with an APNS server, an alert prompts the user for access. Successive attempts at registration do not bring up the prompt. Apple docs encourage registration on every app launch.
4. A push notification is just a small JSON payload with details like what noise to make, what to increment the badge to, and custom properties. It's limited in size to 256 bytes in total.

APNS registration is done using the unique `deviceToken` generated after `didRegisterForRemoteNotificationsWithDeviceToken` fires. We grab the token, sanitize it, and expose it to the JS via the following listener you can plop into your JS:
```js
forge.sqlite.addEventListener('onDeviceTokenReceived', success, error);
```

Check if device has been previously registered:
```js
forge.internal.call('sqlite.checkIfRegisteredWithAPNS', success, error);
```

##License

Copyright (c) 2014, Fetchnotes Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies, 
either expressed or implied, of the FreeBSD Project.
