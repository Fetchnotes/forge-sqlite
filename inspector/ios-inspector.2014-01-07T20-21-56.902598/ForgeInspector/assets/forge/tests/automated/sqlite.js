
var injector = angular.injector(['ng', '$app.services']);

function findTags (str) {
  return (str.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '').match(/#[\w]+/g) || []).map(function (tag) {
    return tag.toLowerCase();
  });
};

function findContacts (str) {
  return (str.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/ig, '').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig).match(/@[\w]+/g) || []).map(function (contact) {
    return contact.toLowerCase();
  });
};

function findEmails (str) {
  return str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/ig) || [];
};

function findUrls (str) {
  return str.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig) || [];
};

function findEntities (text) {
  return {
    hashtags: findTags(text),
    attags: findContacts(text),
    emails:findEmails(text),
    urls: findUrls(text)
  };
};


function generateFakeID () {
  return Math.floor(Math.random() * 1000000000);
};

function getDummyNote (text) {
  text || (text = 'poop');
  return {
    text: text,
    _id: generateFakeID(),
    timestamp: new Date().toISOString(),
    entities: findEntities(text)
  };
};

injector.invoke( function ($db) {

    module("CUD and stuff", {
        setup: function () {
                stop();
                $db.clear().then(function () {
                    return $db.createTables();
                }, function (error) {
                    return $db.createTables();
                }).then(function () {
                    start();
                });
        }
    
    });
  

    asyncTest("gets no notes when it's empty", function(){
        $db.getNotes().then(function(notes){
            equal(notes.length, 0);
            start();
        });
    })
    asyncTest("can create a note", function(){
        var note = getDummyNote();
        $db.create(note).then(function(){
            return $db.getNotes();
        }).then(function (notes) {
            equal(notes.length, 1);
            start();
        });
    });

    asyncTest('can create multiple notes at once', function() {
          var i, noteCount, notes, _i;
          noteCount = 5;
          notes = [];
          for (i = _i = 0; 0 <= noteCount ? _i < noteCount : _i > noteCount; i = 0 <= noteCount ? ++_i : --_i) {
            notes.push(getDummyNote());
          }
          $db.create(notes, {dirty: true}).then(function () {
                return $db.getNotes();
          }).then(function (notesFromDb) {
                equal(notesFromDb.length, noteCount);
                start();
            });
      
        });

    asyncTest('can create a dirty note marked with status:create', function() {
      $db.create(getDummyNote(), {
        dirty: true
      }).then(function () {
        return $db.getNotes();
      }).then(function(notes) {
        equal(notes.length, 1);
        equal(notes[0].status, 'create');
        start();
      });
    });

    asyncTest('can update a note', function() {
      var id, newText, oldText, originalNote;
      originalNote = getDummyNote();
      id = originalNote._id;
      oldText = originalNote.text;
      $db.create(originalNote).then(function (ids) {
            newText = 'no longer poop';
            return $db.update({
                localID: originalNote.localID,
                text: newText
              });
      }).then(function () {
            return $db.getNotes();
      }).then(function(notes) {
            var note = notes[0];
            equal(notes.length, 1);
            notEqual(note.text, oldText);
            equal(note.text, newText);
            equal(note._id, originalNote._id);
            equal(note.timestamp, originalNote.timestamp);
            start();
      });
    });

    asyncTest('can update a dirty note', function() {
      var id, newText, oldText, originalNote;
      originalNote = getDummyNote();
      id = originalNote._id;
      oldText = originalNote.text;
      $db.create(originalNote).then(function () {
          newText = 'ohhhh so dirty';
          return $db.update({
            localID: originalNote.localID,
            text: newText
          }, {
            dirty: true
          });
      }).then(function () {
        return $db.getNotes();
      }).then(function (notes) {
        equal(notes.length, 1);
        notEqual(notes[0].text, oldText);
        equal(notes[0].text, newText);
        equal(notes[0].status, 'update');
        start();
      });
    });

    asyncTest('can delete a note', function() {
      var id, note;
      note = getDummyNote();
      id = note._id;
      $db.create(note).then(function () {
          return $db["delete"]({
            localID: note.localID
          });   
      }).then(function () {
         return $db.getNotes();
      }).then(function(notes) {
         equal(notes.length, 0);
         start();
      });
    });

//     /*
//         FIGURE OUT TESTS FOR .SYNC()
//     */


    asyncTest('can get tags', function() {
      var expectedTags, note1, note2;
      note1 = getDummyNote('what #up #dude');
      note2 = getDummyNote('omg #up #yours');
      expectedTags = ['#up', '#dude', '#yours'];
      $db.create([note1, note2]).then(function () {
        return $db.getTags();
      }).then(function (tags) {
        var tag, _i, _len, _results;
        for (_i = 0, _len = tags.length; _i < _len; _i++) {
          tag = tags[_i];
          notEqual(expectedTags.indexOf(tag.name), -1);
        }
        start();
      });
    });

    asyncTest('can get contacts', function() {
      var expectedContacts, note1, note2;
      note1 = getDummyNote('what up @matt');
      note2 = getDummyNote('@alex omg dude - via @alexh');
      expectedContacts = ['@matt', '@alex', '@alexh'];
      $db.create([note1, note2]).then(function () {
        return $db.getContacts();
      }).then(function (contacts) {
        var contact, _i, _len, _results;
        for (_i = 0, _len = contacts.length; _i < _len; _i++) {
          contact = contacts[_i];
          notEqual(expectedContacts.indexOf(contact.name), -1);
        }
        start();
      });
    });

    module("getting stuff", {
        setup: function () {
            stop();
            $db.clear().then(function () {
                return $db.createTables();
            }, function (error) {
                return $db.createTables();
            }).then(function () {
                var dumbNotes, noteTexts, _i, _len, 
                fakeUserId = generateFakeID(),
                sendToStash = function(note) {
                  note.stashed = {};
                  return note.stashed[fakeUserId] = true;
                };

                $db.queryBuilder.currentUserId = fakeUserId;

                noteTexts = ['#todo some stuff', '@alexh #read a book ok - via @brandly', '@brandly here is some #anime - via @lubibul', '@lubibul just stop ok - via @brandly', '#todo #read a super cool book', 'lame note without hashtags'];

                dumbNotes = [];

                for (_i = 0, _len = noteTexts.length; _i < _len; _i++) {
                  text = noteTexts[_i];
                  dumbNotes.push(getDummyNote(text));
                }

                sendToStash(dumbNotes[1]);

                sendToStash(dumbNotes[2]);

                return $db.create(dumbNotes);
            }).then(function () {
                    var dirtyNoteTexts, _len1, _j, count, text;
                    dirtyNoteTexts = ['oh sooooo dirty', '#butts'];
                    count = 0;
                    for (_j = 0, _len1 = dirtyNoteTexts.length; _j < _len1; _j++) {
                      text = dirtyNoteTexts[_j];
                      $db.create(getDummyNote(text), {
                        dirty: true
                       });//.then(function () {
                      //   //TODO this shit still isn't firing for some reason
                      //       count++;
                      //       alert("count: "+count+" len1: "+len1);
                      //       if(count === len1){
                      //           start();               
                      //       };
                      // });
                    }
                    setTimeout(function(){
                        start();
                    },500);
                });

          }
    });
  

    asyncTest('can filter by #tags', function() {
      var someTag;
      someTag = '#todo';
      $db.getNotes({
        hashtags: [someTag]
       }).then(function (notesFromDb) {
          var note, _i, _len, _results;
          equal(notesFromDb.length, 2);
          _results = [];
          for (_i = 0, _len = notesFromDb.length; _i < _len; _i++) {
            note = notesFromDb[_i];
            notEqual(note.text.indexOf(someTag), -1);
          };
          start();
        });
      });

    asyncTest('can filter by @tags', function() {
      var someTag;
      someTag = '@lubibul';
      return $db.getNotes({
        attags: [someTag]
      }).then(function (notesFromDb) {
          var note, _i, _len, _results;
          equal(notesFromDb.length, 2);
          for (_i = 0, _len = notesFromDb.length; _i < _len; _i++) {
            note = notesFromDb[_i];
            notEqual(note.text.indexOf(someTag), -1);
          }
          start();
        });
    });

    asyncTest('can search for text', function() {
      var search;
      search = 'book';
      return $db.getNotes({
        search: search
      }).then(function (notesFromDb) {
          var note, _i, _len, _results;
          equal(notesFromDb.length, 2);
          for (_i = 0, _len = notesFromDb.length; _i < _len; _i++) {
            note = notesFromDb[_i];
            notEqual(note.text.indexOf(search), -1);
          };
          start();
        });
    });
  

    asyncTest('can set a limit', function() {
      var arbitraryLimit;
      arbitraryLimit = 3;
      $db.getNotes({
        limit: arbitraryLimit
      }).then(function(notesFromDb) {
          equal(notesFromDb.length, arbitraryLimit);
          start();
        })
    });


    asyncTest('can get dirty notes', function() {
      $db.getNotes({
        dirty: true
      }).then(function(notesFromDb) {
        equal(notesFromDb.length, 2);
        start();
      });
    });

    asyncTest('can get stashed notes', function() {
      $db.getNotes({
        stashed: true
      }).then(function(notesFromDb) {
        equal(notesFromDb.length, 2);
        start();
      });
    });

    asyncTest('can get not stashed notes', function() {
      $db.getNotes({
        stashed: false
      }).then(function(notesFromDb) {
        equal(notesFromDb.length, 6);
        start();
      });
    });


});