sqlite
=============
Native persistance for HTML5 iOS apps with [Trigger.IO](https://trigger.io/docs/current/api/native_plugins/index.html). Creates an sqlite3 database, provides abstract CUD methods to be called on the javascript level, and conveniently stores the `device token` for use in push notification registration.

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
Drops the given tables listed in an array of strings.
```js
forge.internal.call('database.dropTables', {
  tables: ['table1', 'table2']
}, success, error);
```

##Device Token usage
iOS push notification registration must be done using the unique `device token` generated after `didRegisterForRemoteNotificationsWithDeviceToken` fires. sqlite grabs the token, cleans out all the `-` dividors, and throws it into a separate database. Since this token is generated every time the app is launched, a separate database instance is required to keep things performant. Every time the app is launched, an existence check is performed on `temp-database`; if it doesn't already exist, the token is parsed and stored. This way, the operation is only performed a single time. Access the device token like so:
```js
forge.internal.call('database.getDeviceToken', success, error);
```

##License

Copyright (c) 2013, Fetchnotes Inc.
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
