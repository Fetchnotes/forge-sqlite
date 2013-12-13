
!function(a){if("function"==typeof bootstrap)bootstrap("promise",a);else if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=a}else Q=a()}(function(){"use strict";function a(a){var b=Function.call;return function(){return b.apply(a,arguments)}}function b(a){return a===Object(a)}function c(a){return"[object StopIteration]"===sb(a)||a instanceof hb}function d(a,b){if(eb&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(ub)){for(var c=[],d=b;d;d=d.source)d.stack&&c.unshift(d.stack);c.unshift(a.stack);var f=c.join("\n"+ub+"\n");a.stack=e(f)}}function e(a){for(var b=a.split("\n"),c=[],d=0;d<b.length;++d){var e=b[d];h(e)||f(e)||!e||c.push(e)}return c.join("\n")}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function h(a){var b=g(a);if(!b)return!1;var c=b[0],d=b[1];return c===gb&&d>=ib&&Ab>=d}function i(){if(eb)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=g(c);if(!d)return;return gb=d[0],d[1]}}function j(a,b,c){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(b+" is deprecated, use "+c+" instead.",new Error("").stack),a.apply(a,arguments)}}function k(a){return B(a)}function l(){function a(a){b=a,f.source=a,mb(c,function(b,c){kb(function(){a.promiseDispatch.apply(a,c)})},void 0),c=void 0,d=void 0}var b,c=[],d=[],e=pb(l.prototype),f=pb(n.prototype);if(f.promiseDispatch=function(a,e,f){var g=lb(arguments);c?(c.push(g),"when"===e&&f[1]&&d.push(f[1])):kb(function(){b.promiseDispatch.apply(b,g)})},f.valueOf=j(function(){if(c)return f;var a=o(b);return p(a)&&(b=a),a},"valueOf","inspect"),f.inspect=function(){return b?b.inspect():{state:"pending"}},k.longStackSupport&&eb)try{throw new Error}catch(g){f.stack=g.stack.substring(g.stack.indexOf("\n")+1)}return e.promise=f,e.resolve=function(c){b||a(B(c))},e.fulfill=function(c){b||a(A(c))},e.reject=function(c){b||a(z(c))},e.notify=function(a){b||mb(d,function(b,c){kb(function(){c(a)})},void 0)},e}function m(a){if("function"!=typeof a)throw new TypeError("resolver must be a function.");var b=l();return O(a,b.resolve,b.reject,b.notify).fail(b.reject),b.promise}function n(a,b,c){void 0===b&&(b=function(a){return z(new Error("Promise does not support operation: "+a))}),void 0===c&&(c=function(){return{state:"unknown"}});var d=pb(n.prototype);if(d.promiseDispatch=function(c,e,f){var g;try{g=a[e]?a[e].apply(d,f):b.call(d,e,f)}catch(h){g=z(h)}c&&c(g)},d.inspect=c,c){var e=c();"rejected"===e.state&&(d.exception=e.reason),d.valueOf=j(function(){var a=c();return"pending"===a.state||"rejected"===a.state?d:a.value})}return d}function o(a){if(p(a)){var b=a.inspect();if("fulfilled"===b.state)return b.value}return a}function p(a){return b(a)&&"function"==typeof a.promiseDispatch&&"function"==typeof a.inspect}function q(a){return b(a)&&"function"==typeof a.then}function r(a){return p(a)&&"pending"===a.inspect().state}function s(a){return!p(a)||"fulfilled"===a.inspect().state}function t(a){return p(a)&&"rejected"===a.inspect().state}function u(){xb||"undefined"==typeof window||window.Touch||!window.console||console.warn("[Q] Unhandled rejection reasons (should be empty):",vb),xb=!0}function v(){for(var a=0;a<vb.length;a++){var b=vb[a];b&&"undefined"!=typeof b.stack?console.warn("Unhandled rejection reason:",b.stack):console.warn("Unhandled rejection reason (no stack):",b)}}function w(){vb.length=0,wb.length=0,xb=!1,yb||(yb=!0,"undefined"!=typeof process&&process.on&&process.on("exit",v))}function x(a,b){yb&&(wb.push(a),vb.push(b),u())}function y(a){if(yb){var b=nb(wb,a);-1!==b&&(wb.splice(b,1),vb.splice(b,1))}}function z(a){var b=n({when:function(b){return b&&y(this),b?b(a):this}},function(){return this},function(){return{state:"rejected",reason:a}});return x(b,a),b}function A(a){return n({when:function(){return a},get:function(b){return a[b]},set:function(b,c){a[b]=c},"delete":function(b){delete a[b]},post:function(b,c){return null===b||void 0===b?a.apply(void 0,c):a[b].apply(a,c)},apply:function(b,c){return a.apply(b,c)},keys:function(){return rb(a)}},void 0,function(){return{state:"fulfilled",value:a}})}function B(a){return p(a)?a:q(a)?C(a):A(a)}function C(a){var b=l();return kb(function(){try{a.then(b.resolve,b.reject,b.notify)}catch(c){b.reject(c)}}),b.promise}function D(a){return n({isDef:function(){}},function(b,c){return K(a,b,c)},function(){return B(a).inspect()})}function E(a,b,c,d){return k(a).then(b,c,d)}function F(a,b,c){return E(a,function(a){return Q(a).then(function(a){return b.apply(void 0,a)},c)},c)}function G(a){return function(){function b(a,b){var g;if(tb){try{g=d[a](b)}catch(h){return z(h)}return g.done?g.value:E(g.value,e,f)}try{g=d[a](b)}catch(h){return c(h)?h.value:z(h)}return E(g,e,f)}var d=a.apply(this,arguments),e=b.bind(b,"send"),f=b.bind(b,"throw");return e()}}function H(a){k.done(k.async(a)())}function I(a){throw new hb(a)}function J(a){return function(){return F([this,Q(arguments)],function(b,c){return a.apply(b,c)})}}function K(a,b,c){var d=l();return kb(function(){B(a).promiseDispatch(d.resolve,b,c)}),d.promise}function L(a){return function(b){var c=lb(arguments,1);return K(b,a,c)}}function M(a,b){var c=lb(arguments,2);return zb(a,b,c)}function N(a,b){return K(a,"apply",[void 0,b])}function O(a){var b=lb(arguments,1);return N(a,b)}function P(a){var b=lb(arguments,1);return function(){var c=b.concat(lb(arguments));return K(a,"apply",[this,c])}}function Q(a){return E(a,function(a){var b=0,c=l();return mb(a,function(d,e,f){var g;p(e)&&"fulfilled"===(g=e.inspect()).state?a[f]=g.value:(++b,E(e,function(d){a[f]=d,0===--b&&c.resolve(a)},c.reject))},void 0),0===b&&c.resolve(a),c.promise})}function R(a){return E(a,function(a){return a=ob(a,B),E(Q(ob(a,function(a){return E(a,jb,jb)})),function(){return a})})}function S(a){return E(a,function(a){return Q(ob(a,function(b,c){return E(b,function(b){return a[c]={state:"fulfilled",value:b},a[c]},function(b){return a[c]={state:"rejected",reason:b},a[c]})})).thenResolve(a)})}function T(a,b){return E(a,void 0,b)}function U(a,b){return E(a,void 0,void 0,b)}function V(a,b){return E(a,function(a){return E(b(),function(){return a})},function(a){return E(b(),function(){return z(a)})})}function W(a,b,c,e){var f=function(b){kb(function(){if(d(b,a),!k.onerror)throw b;k.onerror(b)})},g=b||c||e?E(a,b,c,e):a;"object"==typeof process&&process&&process.domain&&(f=process.domain.bind(f)),T(g,f)}function X(a,b,c){var d=l(),e=setTimeout(function(){d.reject(new Error(c||"Timed out after "+b+" ms"))},b);return E(a,function(a){clearTimeout(e),d.resolve(a)},function(a){clearTimeout(e),d.reject(a)},d.notify),d.promise}function Y(a,b){return void 0===b&&(b=a,a=void 0),E(a,function(a){var c=l();return setTimeout(function(){c.resolve(a)},b),c.promise})}function Z(a,b){var c=lb(b),d=l();return c.push(d.makeNodeResolver()),N(a,c).fail(d.reject),d.promise}function $(a){var b=lb(arguments,1),c=l();return b.push(c.makeNodeResolver()),N(a,b).fail(c.reject),c.promise}function _(a){var b=lb(arguments,1);return function(){var c=b.concat(lb(arguments)),d=l();return c.push(d.makeNodeResolver()),N(a,c).fail(d.reject),d.promise}}function ab(a,b){var c=lb(arguments,2);return function(){function d(){return a.apply(b,arguments)}var e=c.concat(lb(arguments)),f=l();return e.push(f.makeNodeResolver()),N(d,e).fail(f.reject),f.promise}}function bb(a,b,c){var d=lb(c||[]),e=l();return d.push(e.makeNodeResolver()),zb(a,b,d).fail(e.reject),e.promise}function cb(a,b){var c=lb(arguments,2),d=l();return c.push(d.makeNodeResolver()),zb(a,b,c).fail(d.reject),d.promise}function db(a,b){return b?(a.then(function(a){kb(function(){b(null,a)})},function(a){kb(function(){b(a)})}),void 0):a}var eb=!1;try{throw new Error}catch(fb){eb=!!fb.stack}var gb,hb,ib=i(),jb=function(){},kb=function(){function a(){for(;b.next;){b=b.next;var c=b.task;b.task=void 0;var e=b.domain;e&&(b.domain=void 0,e.enter());try{c()}catch(g){if(f)throw e&&e.exit(),setTimeout(a,0),e&&e.enter(),g;setTimeout(function(){throw g},0)}e&&e.exit()}d=!1}var b={task:void 0,next:null},c=b,d=!1,e=void 0,f=!1;if(kb=function(a){c=c.next={task:a,domain:f&&process.domain,next:null},d||(d=!0,e())},"undefined"!=typeof process&&process.nextTick)f=!0,e=function(){process.nextTick(a)};else if("function"==typeof setImmediate)e="undefined"!=typeof window?setImmediate.bind(window,a):function(){setImmediate(a)};else if("undefined"!=typeof MessageChannel){var g=new MessageChannel;g.port1.onmessage=a,e=function(){g.port2.postMessage(0)}}else e=function(){setTimeout(a,0)};return kb}(),lb=a(Array.prototype.slice),mb=a(Array.prototype.reduce||function(a,b){var c=0,d=this.length;if(1===arguments.length)for(;;){if(c in this){b=this[c++];break}if(++c>=d)throw new TypeError}for(;d>c;c++)c in this&&(b=a(b,this[c],c));return b}),nb=a(Array.prototype.indexOf||function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}),ob=a(Array.prototype.map||function(a,b){var c=this,d=[];return mb(c,function(e,f,g){d.push(a.call(b,f,g,c))},void 0),d}),pb=Object.create||function(a){function b(){}return b.prototype=a,new b},qb=a(Object.prototype.hasOwnProperty),rb=Object.keys||function(a){var b=[];for(var c in a)qb(a,c)&&b.push(c);return b},sb=a(Object.prototype.toString);hb="undefined"!=typeof ReturnValue?ReturnValue:function(a){this.value=a};var tb;try{new Function("(function* (){ yield 1; })"),tb=!0}catch(fb){tb=!1}var ub="From previous event:";k.nextTick=kb,k.longStackSupport=!1,k.defer=l,l.prototype.makeNodeResolver=function(){var a=this;return function(b,c){b?a.reject(b):arguments.length>2?a.resolve(lb(arguments,1)):a.resolve(c)}},k.promise=m,k.makePromise=n,n.prototype.then=function(a,b,c){function e(b){try{return"function"==typeof a?a(b):b}catch(c){return z(c)}}function f(a){if("function"==typeof b){d(a,h);try{return b(a)}catch(c){return z(c)}}return z(a)}function g(a){return"function"==typeof c?c(a):a}var h=this,i=l(),j=!1;return kb(function(){h.promiseDispatch(function(a){j||(j=!0,i.resolve(e(a)))},"when",[function(a){j||(j=!0,i.resolve(f(a)))}])}),h.promiseDispatch(void 0,"when",[void 0,function(a){var b,c=!1;try{b=g(a)}catch(d){if(c=!0,!k.onerror)throw d;k.onerror(d)}c||i.notify(b)}]),i.promise},n.prototype.thenResolve=function(a){return E(this,function(){return a})},n.prototype.thenReject=function(a){return E(this,function(){throw a})},mb(["isFulfilled","isRejected","isPending","dispatch","when","spread","get","set","del","delete","post","send","mapply","invoke","mcall","keys","fapply","fcall","fbind","all","allResolved","timeout","delay","catch","finally","fail","fin","progress","done","nfcall","nfapply","nfbind","denodeify","nbind","npost","nsend","nmapply","ninvoke","nmcall","nodeify"],function(a,b){n.prototype[b]=function(){return k[b].apply(k,[this].concat(lb(arguments)))}},void 0),n.prototype.toSource=function(){return this.toString()},n.prototype.toString=function(){return"[object Promise]"},k.nearer=o,k.isPromise=p,k.isPromiseAlike=q,k.isPending=r,k.isFulfilled=s,k.isRejected=t;var vb=[],wb=[],xb=!1,yb=!0;k.resetUnhandledRejections=w,k.getUnhandledReasons=function(){return vb.slice()},k.stopUnhandledRejectionTracking=function(){w(),"undefined"!=typeof process&&process.on&&process.removeListener("exit",v),yb=!1},w(),k.reject=z,k.fulfill=A,k.resolve=B,k.master=D,k.when=E,k.spread=F,k.async=G,k.spawn=H,k["return"]=I,k.promised=J,k.dispatch=K,k.dispatcher=L,k.get=L("get"),k.set=L("set"),k["delete"]=k.del=L("delete");var zb=k.post=L("post");k.mapply=zb,k.send=M,k.invoke=M,k.mcall=M,k.fapply=N,k["try"]=O,k.fcall=O,k.fbind=P,k.keys=L("keys"),k.all=Q,k.allResolved=j(R,"allResolved","allSettled"),k.allSettled=S,k["catch"]=k.fail=T,k.progress=U,k["finally"]=k.fin=V,k.done=W,k.timeout=X,k.delay=Y,k.nfapply=Z,k.nfcall=$,k.nfbind=_,k.denodeify=k.nfbind,k.nbind=ab,k.npost=bb,k.nmapply=bb,k.nsend=cb,k.ninvoke=k.nsend,k.nmcall=k.nsend,k.nodeify=db;var Ab=i();return k});
(function() {
  var dependencies,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  document.addEventListener("touchstart", (function() {}), false);

  window.addEventListener("load", (function() {
    return FastClick.attach(document.body);
  }), false);

  angular.$debug = true;

  angular.module('$app.services', []);

  angular.module('$app.filters', []);

  angular.module('$app.directives', []);

  dependencies = ['ajoslin.mobile-navigate', 'snap', '$app.services', '$app.filters', '$app.directives', 'txt.utils', 'loadfocus', 'fn.pullToRefresh', 'fn.swipeable', 'fn.fixedFix', 'ngGravatar'];

  angular.module('$app', dependencies).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/welcome/load.html',
      controller: 'LoadCtrl'
    }).when('/signup/email', {
      templateUrl: 'views/welcome/sign-up-email.html',
      controller: 'SignUpEmailCtrl'
    }).when('/signin', {
      templateUrl: 'views/welcome/sign-in.html',
      controller: 'SignInCtrl'
    }).when('/invite', {
      templateUrl: 'views/welcome/invite.html',
      controller: 'InviteCtrl'
    }).when('/notes', {
      templateUrl: 'views/notes/feed.html',
      controller: 'NotesCtrl'
    }).when('/notes/view/:id', {
      templateUrl: 'views/notes/view.html',
      controller: 'ViewNoteCtrl'
    }).when('/notes/edit/:id', {
      templateUrl: 'views/notes/edit.html',
      controller: 'EditNoteCtrl'
    }).when('/notes/new', {
      templateUrl: 'views/notes/new.html',
      controller: 'NewNoteCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

  angular.module('$app').controller('AppCtrl', function($scope) {
    return $scope.nothing = 'here';
  });

  angular.module('$app').controller('EditNoteCtrl', function($scope, $navigate, $utils, $notes, $contacts, $routeParams, $timeout) {
    var getOff;
    $scope.note = {};
    $scope.tags = [];
    $notes.getTagsAndContacts().then(function(list) {
      return $scope.tags = list;
    });
    $scope.save = function() {
      return $notes.save($scope.note).then(function(note) {
        return $navigate.back();
      });
    };
    $scope.back = function() {
      return $navigate.back();
    };
    $scope.loading = false;
    return getOff = $scope.$on('$pageTransitionSuccess', function() {
      $scope.loading = true;
      return $notes.getById($routeParams.id).then(function(note) {
        $scope.note = note;
        $scope.currentTime = note.timestamp;
        $timeout(function() {
          $scope.loading = false;
          $scope.$broadcast('$txt.utils.updateSize');
          return $scope.$broadcast('$txt.utils.scrollToBottom');
        });
        return getOff();
      });
    });
  });

  angular.module('$app').controller('NotesCtrl', function($scope, $notes, $user, $navigate, $timeout, forgeUI, $utils, $rootScope, $notifications) {
    var changeState, current, populateActivityFeed, populateNoteList, populateTagLists, spliceNote;
    $scope.snapOpts = {
      disable: 'right',
      maxPosition: 270
    };
    $scope.rightDrawerExpanded = false;
    current = $user.getCurrent();
    if (current.then != null) {
      current.then(function(active) {
        return $scope.$apply(function() {
          return $scope.user = active;
        });
      });
    } else {
      $scope.user = current;
    }
    if (current.then != null) {
      current.then(function() {
        return $notes.harmonize();
      });
    } else {
      $notes.harmonize();
    }
    $scope.notes = [];
    $scope.hashtags = [];
    $scope.attags = [];
    $scope.stash = false;
    $scope.searching = false;
    $scope.filtered = false;
    $scope.search = {
      query: ''
    };
    $scope.$watch('search.query', function() {
      return populateNoteList();
    });
    $scope.searchFilterQuery = [];
    populateNoteList = function() {
      var attags, hashtags, query;
      attags = $utils.filter($scope.searchFilterQuery, function(filter) {
        return filter.type === "contact";
      });
      hashtags = $utils.filter($scope.searchFilterQuery, function(filter) {
        return filter.type === "hashtag";
      });
      query = {
        limit: 25,
        stashed: $scope.stash,
        attags: $utils.map(attags, function(tag) {
          return tag.name.toLowerCase();
        }),
        hashtags: $utils.map(hashtags, function(tag) {
          return tag.name.toLowerCase();
        }),
        search: $scope.search.query
      };
      return $notes.get(query).then(function(list) {
        return $scope.notes = list;
      });
    };
    $scope.$on("$pageTransitionSuccess", function() {
      return populateNoteList();
    });
    populateTagLists = function() {
      $notes.getTags().then(function(list) {
        var tag, _i, _len, _ref, _results;
        $scope.hashtags = list;
        _ref = $scope.hashtags;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          tag.selected = false;
          _results.push(tag.type = 'hashtag');
        }
        return _results;
      });
      return $notes.getContacts().then(function(list) {
        var tag, _i, _len, _ref, _results;
        $scope.attags = list;
        _ref = $scope.attags;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          tag.selected = false;
          _results.push(tag.type = 'contact');
        }
        return _results;
      });
    };
    $scope.$on("$pageTransitionSuccess", function() {
      return populateTagLists();
    });
    populateActivityFeed = function() {
      $scope.notifications = $notifications.get();
      return $notifications.refresh().then(function() {
        return $scope.$apply(function() {
          return $scope.notifications = $notifications.get();
        });
      });
    };
    if (current.then != null) {
      current.then(function() {
        return populateActivityFeed();
      });
    } else {
      populateActivityFeed();
    }
    $scope.$on('notesUpdated', function() {
      populateNoteList();
      return populateTagLists();
    });
    $scope.refresh = function() {
      if (current.then != null) {
        return current.then(function() {
          return $notes.harmonize().then(function() {
            return $timeout(function() {
              return $rootScope.$broadcast("$pullToRefreshLoadingEnd");
            }, 800);
          });
        });
      } else {
        return $notes.harmonize().then(function() {
          return $timeout(function() {
            return $rootScope.$broadcast("$pullToRefreshLoadingEnd");
          }, 800);
        });
      }
    };
    $scope.onScreen = false;
    $scope.state = "feed";
    $scope.states = {
      feed: {
        left: true,
        right: false,
        colors: {
          left: '114,180,86',
          right: void 0
        },
        actions: {
          left: "stashNote(note, $index)",
          right: void 0
        },
        confirmations: {
          left: void 0,
          right: void 0
        }
      },
      stash: {
        left: true,
        right: true,
        colors: {
          left: '217,74,74',
          right: '65,148,217'
        },
        actions: {
          left: "deleteNote(note, $index)",
          right: "returnNoteToFeed(note, $index)"
        },
        confirmations: {
          left: "Delete?",
          right: void 0
        }
      }
    };
    $scope.startTyping = function() {
      return $scope.typing = true;
    };
    $scope.stopTyping = function() {
      return $scope.typing = false;
    };
    changeState = function(newState, close) {
      $scope.stash = newState === 'stash';
      $scope.state = newState;
      populateNoteList();
      if (close) {
        return $scope.snapper.close();
      }
    };
    $scope.viewFeed = function(close) {
      return changeState('feed', close);
    };
    $scope.viewStash = function(close) {
      return changeState('stash', close);
    };
    $scope.signOut = function() {
      var clear;
      clear = function() {
        $notes.clear();
        return $notifications.clear();
      };
      return $user.signOut().then(clear, clear).then(function() {
        return $scope.$apply(function() {
          $navigate.go('/', 'pop-in');
          return $navigate.eraseHistory();
        });
      });
    };
    $scope.viewNote = function(id) {
      if ($scope.snapper.state().state !== 'closed') {
        $scope.snapper.close();
        return $timeout(function() {
          return $navigate.go("/notes/view/" + id, 'pop-in');
        }, 300);
      } else {
        return $navigate.go("/notes/view/" + id, 'pop-in');
      }
    };
    $scope.newNote = function() {
      return $navigate.go('/notes/new', 'fade-in');
    };
    $scope.deleteNote = function(index) {
      return $scope.notes.splice(index, 1);
    };
    $scope.startSearching = function() {
      return $scope.searching = true;
    };
    $scope.cancelSearch = function() {
      var tag, _i, _len, _ref;
      $scope.searching = false;
      $scope.filtered = false;
      $scope.search.query = '';
      _ref = $scope.searchFilterQuery;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        tag.selected = false;
      }
      $scope.searchFilterQuery = [];
      return populateNoteList();
    };
    spliceNote = function(index) {
      $scope.notes.splice(index, 1);
      return populateNoteList();
    };
    $scope.stashNote = function(note, index) {
      $notes.stash(note);
      return spliceNote(index);
    };
    $scope.deleteNote = function(note, index) {
      $notes["delete"](note);
      return spliceNote(index);
    };
    $scope.returnNoteToFeed = function(note, index) {
      $notes.unstash(note);
      return spliceNote(index);
    };
    $scope.updateQuery = function() {
      $scope.searchFilterQuery = $utils.filter($utils.union($scope.hashtags, $scope.attags), function(tag) {
        return tag.selected === true;
      });
      if ($scope.searchFilterQuery.length > 0) {
        return $scope.filtered = true;
      } else {
        return $scope.filtered = false;
      }
    };
    $scope.viewResults = function() {
      $scope.searching = false;
      return populateNoteList();
    };
    $scope.removeFilter = function(index) {
      $scope.toggleSelected($scope.searchFilterQuery[index]);
      return $scope.updateQuery();
    };
    return $scope.toggleSelected = function(hashtag) {
      if (hashtag.selected) {
        hashtag.selected = false;
      } else {
        hashtag.selected = true;
      }
      $scope.updateQuery();
      return populateNoteList();
    };
  });

  angular.module('$app').controller('NewNoteCtrl', function($scope, $navigate, $utils, $notes, $contacts, $timeout) {
    $scope.noteText = '';
    $scope.state = {
      sendNote: false,
      displayOptions: false
    };
    $scope.currentTime = Date.now();
    $scope.tags = [];
    $notes.getTagsAndContacts().then(function(list) {
      return $scope.tags = list;
    });
    $scope.toggleDisplayOptions = function() {
      return $scope.state.displayOptions = !$scope.state.displayOptions;
    };
    $scope.save = $utils.throttleButton(function() {
      var method;
      method = $scope.state.sendNote ? 'stash' : 'save';
      return $notes[method]({
        text: $scope.noteText
      }).then(function(note) {
        return $navigate.back();
      });
    });
    return $scope.back = $utils.throttleButton(function() {
      return $navigate.back();
    });
  });

  angular.module('$app').controller('ViewNoteCtrl', function($scope, $navigate, $routeParams, $utils, $notes, $user, $recommendation, forgeUI, $timeout) {
    var current;
    $scope.note = {};
    $scope.HTMLize = $utils.HTMLize;
    current = $user.getCurrent();
    if (current.then != null) {
      current.then(function(active) {
        return $scope.$apply(function() {
          return $scope.user = active;
        });
      });
    } else {
      $scope.user = current;
    }
    $scope.back = function() {
      return $navigate.back();
    };
    $scope.goTo = function(url, title) {
      return forgeUI.openUrl(url, title);
    };
    $scope.loading = false;
    $scope.editNote = function(id) {
      return $navigate.go("/notes/edit/" + id, 'fade-in-easy');
    };
    return $notes.getById($routeParams.id).then(function(note) {
      var recommendation;
      $scope.note = note;
      $scope.loading = true;
      recommendation = $recommendation.get(note);
      if ((recommendation != null) && (recommendation.then != null)) {
        return recommendation.then(function(rec) {
          return $timeout(function() {
            if (rec != null) {
              $scope.recommendation = rec;
            }
            return $scope.loading = false;
          }, 800);
        });
      } else {
        return $scope.loading = false;
      }
    });
  });

  angular.module('$app').controller('InviteCtrl', function($scope, $navigate, $invite) {
    $scope.contacts = [
      {
        firstName: 'Matthew',
        lastName: 'Brandly',
        phone: '12316795591'
      }, {
        firstName: 'Giles',
        lastName: 'VG',
        email: 'giles@fetchnotes.com'
      }
    ];
    $scope.toggleSelected = function(person) {
      return person.selected = !person.selected;
    };
    $scope.skip = function() {
      return $navigate.go('/notes', 'slide');
    };
    return $scope.sendInvites = function() {
      var emails, phones;
      emails = _($scope.contacts).filter(function(person) {
        return person.selected && (person.email != null);
      }).pluck('email').value();
      phones = _($scope.contacts).filter(function(person) {
        return person.selected && (person.phone != null);
      }).pluck('phone').value();
      return $invite.send({
        emails: emails,
        phones: phones
      }).then(function() {
        return $scope.$apply(function() {
          return $scope.skip();
        });
      });
    };
  });

  angular.module('$app').controller('LoadCtrl', function($scope, $navigate, forgeUI) {
    $scope.signUpEmail = function() {
      forgeUI.allowFocus();
      return $navigate.go('/signup/email', 'slide');
    };
    return $scope.signIn = function() {
      forgeUI.allowFocus();
      return $navigate.go('/signin', 'slide');
    };
  });

  angular.module('$app').controller('SignUpEmailCtrl', function($scope, $navigate, $user, $timeout) {
    $scope.back = function() {
      return $navigate.back();
    };
    $scope.loading = false;
    return $scope.signUp = function(form) {
      var promise;
      $scope.loading = true;
      promise = $user.signUp({
        username: form.username,
        email: form.email,
        password: form.password
      });
      return promise.then(function() {
        return $scope.$apply(function() {
          $scope.loading = true;
          return $navigate.go('/notes', 'slide');
        });
      }, function(e) {
        return $timeout(function() {
          return $scope.$apply(function() {
            $scope.loading = true;
            return $scope.errorMessage = e.description || "Sign up failed, please try again";
          });
        });
      });
    };
  });

  angular.module('$app').controller('SignInCtrl', function($scope, $navigate, $user, $timeout) {
    $scope.back = function() {
      return $navigate.back();
    };
    $scope.loading = false;
    return $scope.signIn = function(form) {
      var promise;
      $scope.loading = true;
      promise = $user.signIn({
        username: form.username,
        password: form.password
      });
      return promise.then(function() {
        return $scope.$apply(function() {
          $scope.loading = false;
          return $navigate.go('/notes', 'slide');
        });
      }, function(e) {
        return $timeout(function() {
          return $scope.$apply(function() {
            $scope.loading = false;
            return $scope.errorMessage = e.description;
          });
        });
      });
    };
  });

  angular.module('$app.directives').directive('autocomplete', function() {
    return {
      restrict: 'A',
      controller: function($scope) {
        $scope.currentWord = '';
        $scope.typing = false;
        return $scope.selectTag = function(tagName) {
          return $scope.replaceCurrentWord(tagName + ' ');
        };
      }
    };
  }).directive('autocompleteText', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, $log) {
        var easeInOutCubic, getCurrentWord, getCurrentWordIndices, getCursorPosition, getNextWordBreak, position, positioner, scroll, setCursorPosition, updateCurrentWord, whitespace, yPos;
        getCursorPosition = function(element) {
          return element[0].selectionEnd;
        };
        setCursorPosition = function(element, position) {
          return element[0].setSelectionRange(position, position);
        };
        whitespace = /(\s)/;
        positioner = new maxkir.CursorPosition(element[0], 15);
        yPos = 0;
        getNextWordBreak = function(text) {
          return text.search(whitespace);
        };
        getCurrentWordIndices = function(string, index) {
          var afterCursor, beforeCursor, cursor, end, start, stepsBack;
          cursor = getCursorPosition(element);
          beforeCursor = string.substr(0, cursor);
          afterCursor = string.substr(cursor, string.length);
          end = getNextWordBreak(afterCursor);
          stepsBack = getNextWordBreak(beforeCursor.split('').reverse().join(''));
          if (end === -1) {
            end = string.length;
          } else {
            end += beforeCursor.length;
          }
          if (stepsBack === -1) {
            start = 0;
          } else {
            start = cursor - stepsBack;
          }
          return {
            start: start,
            end: end
          };
        };
        getCurrentWord = function(string, index) {
          var i;
          i = getCurrentWordIndices(string, index);
          return string.substr(i.start, i.end - i.start);
        };
        updateCurrentWord = function(insertedText) {
          var _ref;
          if (insertedText == null) {
            insertedText = "";
          }
          scope.currentWord = getCurrentWord(element.val(), getCursorPosition(element));
          if (((_ref = scope.currentWord) != null ? _ref.length : void 0) === 1 && scope.currentWord[0] === '#' || scope.currentWord[0] === '@') {
            yPos = positioner.getPixelCoordinates()[1];
          }
          if (scope.currentWord[0] === '#' || scope.currentWord[0] === '@') {
            element.css('max-height', '42px');
          } else if (scope.currentWord === '') {
            element.css('max-height', '');
            if (insertedText.length > 1) {
              element[0].scrollTop = yPos;
            }
          }
          if ((scope.currentWord != null) && scope.currentWord.length === 1 && (scope.currentWord[0] === '#' || scope.currentWord[0] === '@')) {
            return $timeout(function() {
              return scroll(element, 0, yPos - 30);
            });
          }
        };
        easeInOutCubic = function(t) {
          if (t < .5) {
            return 4 * t * t * t;
          } else {
            return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          }
        };
        position = function(start, end, elapsed, duration) {
          if (elapsed > duration) {
            return end;
          }
          return start + (end - start) * easeInOutCubic(elapsed / duration);
        };
        scroll = function(el, start, end, duration) {
          var clock, requestAnimationFrame, step;
          if (duration == null) {
            duration = 300;
          }
          clock = Date.now();
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
            return window.setTimeout(fn, 15);
          };
          step = function() {
            var elapsed;
            elapsed = Date.now() - clock;
            el[0].scrollTop = position(start, end, elapsed, duration);
            if (elapsed < duration) {
              return requestAnimationFrame(step);
            }
          };
          return step();
        };
        scope.insertText = function(text) {
          var afterCursor, beforeCursor, charBeforeCursor, currentText, cursor, cushion, newCursor;
          currentText = element.val();
          cursor = getCursorPosition(element);
          beforeCursor = currentText.substr(0, cursor);
          afterCursor = currentText.substr(cursor, currentText.length);
          charBeforeCursor = beforeCursor.charAt(beforeCursor.length - 1);
          cushion = whitespace.test(charBeforeCursor) || cursor === 0 ? '' : ' ';
          element.val(beforeCursor + cushion + text + afterCursor);
          newCursor = beforeCursor.length + text.length + cushion.length;
          setCursorPosition(element, newCursor);
          return updateCurrentWord(text);
        };
        scope.replaceCurrentWord = function(text) {
          var afterWord, beforeWord, currentText, indices, newCursor;
          currentText = element.val();
          indices = getCurrentWordIndices(currentText, getCursorPosition(element));
          beforeWord = currentText.substr(0, indices.start);
          afterWord = currentText.substr(indices.end, currentText.length);
          element.val(beforeWord + text + afterWord);
          newCursor = beforeWord.length + text.length;
          setCursorPosition(element, newCursor);
          return updateCurrentWord(text);
        };
        element.bind('keyup', function(event) {
          return scope.$apply(function() {
            return updateCurrentWord();
          });
        });
        element.bind('focus', function() {
          if (!scope.$$phase) {
            return scope.$apply(function() {
              return scope.typing = true;
            });
          } else {
            return scope.typing = true;
          }
        });
        element.bind('blur', function() {
          if (!scope.$$phase) {
            return scope.$apply(function() {
              scope.typing = false;
              scope.currentWord = '';
              return element.css('max-height', '');
            });
          } else {
            scope.typing = false;
            scope.currentWord = '';
            return element.css('max-height', '');
          }
        });
        return scope.$on('$destroy', function() {
          element.unbind('keyup');
          element.unbind('touchend');
          element.unbind('focus');
          return element.unbind('blur');
        });
      }
    };
  }).directive('autocompleteList', function() {
    return {
      restrict: 'E',
      template: '<div class="autocomplete-container" ng-show="currentWord[0] === \'#\' || currentWord[0] === \'@\'">\n    <ul class="autocomplete-list">\n        <li class="autocomplete-list-item" ng-repeat="tag in tags | filter:currentWord | orderBy:\'-count\'" ng-click="selectTag(tag.name)" >\n            <p>{{tag.name}}</p>\n        </li>\n    </ul>\n</div>',
      replace: true
    };
  }).directive('autocompleteButton', function() {
    return {
      restrict: 'E',
      template: '<button class="autocomplete-button"></button>',
      replace: true,
      link: function(scope, element, attrs) {
        element.text(attrs.value);
        element.bind('click', function() {
          scope.insertText(attrs.value);
          return scope.$digest();
        });
        return scope.$on('$destroy', function() {
          return element.unbind('click');
        });
      }
    };
  }).directive('ngFocus', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        return element.bind('focus', function() {
          return $timeout(function() {
            return scope.$apply(attrs.ngFocus);
          });
        });
      }
    };
  }).directive('ngBlur', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        return element.bind('blur', function() {
          return $timeout(function() {
            return scope.$apply(attrs.ngBlur);
          });
        });
      }
    };
  }).directive('focusMe', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        return element[0].focus();
      }
    };
  });

  angular.module('$app.directives').directive('clearBar', function(forgeUI) {
    return {
      link: function(scope, element, attrs) {
        return forgeUI.clearBar();
      }
    };
  });

  angular.module('$app.directives').directive('preventScroll', function(forgeUI, $timeout) {
    return {
      link: function(scope, element, attrs) {
        element.bind('focus touchstart', function() {
          return forgeUI.resetScroll();
        });
        return scope.$on('destroy', function() {
          return element.unbind('focus touchstart');
        });
      }
    };
  });

  angular.module('$app.directives').directive('noScroll', function(forgeUI, $timeout) {
    return {
      link: function(scope, element, attrs) {
        return forgeUI.preventScroll();
      }
    };
  });

  angular.module('$app.services').service('$amazon', function($http, $utils, $xml, Q) {
    return {
      findBooks: function(query, success) {
        return this._find(query, 'Books', success);
      },
      findMusic: function(query, success) {
        return this._find(query, 'Music', success);
      },
      findMovies: function(query, success) {
        return this._find(query, 'DVD', success);
      },
      findGroceries: function(query, success) {
        return this._find(query, 'Grocery', success);
      },
      _find: function(query, index, success) {
        var params;
        params = {
          SearchIndex: index,
          Keywords: this.keywordize(query)
        };
        return this.request(params, success);
      },
      host: 'ecs.amazonaws.com',
      secret: 'eh4gfA7hxrTNBbL3ivDOKH7gCwJCKFFBI8yJA1PH',
      defaults: {
        Service: 'AWSECommerceService',
        Version: '2011-08-01',
        AssociateTag: 'fetchnotes-20',
        Operation: 'ItemSearch',
        AWSAccessKeyId: 'AKIAJAJFQJ2DFMWUJI2Q',
        ResponseGroup: 'Images,Small'
      },
      keywordize: function(query) {
        var words;
        words = _.compact(query.replace($utils.regexp.tags, '').replace($utils.regexp.contacts, '').replace(/- via/g, '').replace($utils.regexp.urls, '').split(' '));
        return words.join('+');
      },
      time: function() {
        var gmt, time;
        time = new Date();
        gmt = new Date(time.getTime() + (time.getTimezoneOffset() * 60000));
        return gmt.toISOString();
      },
      wrapSuccess: function(success, resolve) {
        return function(xml) {
          var doc, result;
          if (success) {
            doc = $xml.parse(xml);
            result = success(angular.element(doc.find('Item')[0]));
            return resolve(result);
          }
        };
      },
      request: function(params, success) {
        var deferred, signedUrl;
        deferred = Q.defer();
        params = _.extend(this.defaults, params);
        signedUrl = this.URL(params);
        $http({
          url: signedUrl,
          method: 'GET'
        }).success(this.wrapSuccess(success, deferred.resolve)).error(function(xhr, ajaxOptions, thrownError) {
          return console.log(xhr);
        });
        return deferred.promise;
      },
      URL: function(params) {
        var canonicalQuery, key, pairs, signature, signedUrl, stringToSign, _i, _len, _ref;
        params.Timestamp = this.time();
        pairs = [];
        _ref = Object.keys(params);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          pairs.push("" + key + "=" + params[key]);
        }
        pairs = this.encodeNameValuePairs(pairs);
        pairs.sort();
        canonicalQuery = pairs.join('&');
        stringToSign = "GET\n" + this.host + "\n/onca/xml\n" + canonicalQuery;
        signature = this.sign(this.secret, stringToSign);
        return signedUrl = "http://" + this.host + "/onca/xml?" + canonicalQuery + "&Signature=" + signature;
      },
      sign: function(secret, message) {
        var b64hash, i, ihash, imsg, ipad, messageBytes, ohash, omsg, opad, secretBytes;
        messageBytes = str2binb(message);
        secretBytes = str2binb(secret);
        if (secretBytes.length > 16) {
          secretBytes = core_sha256(secretBytes, secret.length * chrsz);
        }
        ipad = Array(16);
        opad = Array(16);
        i = 0;
        while (i < 16) {
          ipad[i] = secretBytes[i] ^ 0x36363636;
          opad[i] = secretBytes[i] ^ 0x5C5C5C5C;
          i++;
        }
        imsg = ipad.concat(messageBytes);
        ihash = core_sha256(imsg, 512 + message.length * chrsz);
        omsg = opad.concat(ihash);
        ohash = core_sha256(omsg, 512 + 256);
        b64hash = binb2b64(ohash);
        return encodeURIComponent(b64hash);
      },
      encodeNameValuePairs: function(pairs) {
        var i, index, name, pair, value;
        i = 0;
        while (i < pairs.length) {
          name = "";
          value = "";
          pair = pairs[i];
          index = pair.indexOf("=");
          if (index === -1) {
            name = pair;
          } else if (index === 0) {
            value = pair;
          } else {
            name = pair.substring(0, index);
            if (index < pair.length - 1) {
              value = pair.substring(index + 1);
            }
          }
          name = encodeURIComponent(decodeURIComponent(name));
          value = value.replace(/\+/g, "%20");
          value = encodeURIComponent(decodeURIComponent(value));
          pairs[i] = name + "=" + value;
          i++;
        }
        return pairs;
      }
    };
  });

  angular.module('$app.services').service('$contacts', [
    '$forge', function(forge) {
      var LIMIT, currentName, nativeCall, skip;
      LIMIT = 20;
      skip = 0;
      currentName = '';
      nativeCall = forge.getPluginCall('contacts.get');
      this.search = function(name) {
        skip = 0;
        currentName = name;
        return nativeCall({
          name: name,
          limit: LIMIT,
          skip: skip
        });
      };
      this.getMore = function() {
        skip += LIMIT;
        return nativeCall({
          name: currentName,
          limit: LIMIT,
          skip: skip
        });
      };
      return this.reset = function() {
        skip = 0;
        currentName = '';
        return nativeCall({
          name: currentName,
          limit: LIMIT,
          skip: skip
        });
      };
    }
  ]);

  angular.module('$app.services').service('$embedly', function($http, Q) {
    var baseURL, endpoint, generateURL, image, key, link, typeToHandler, version, video;
    baseURL = 'https://api.embed.ly';
    version = '1';
    endpoint = 'extract';
    key = 'd1e33a72bce84f1eb2f35a68c3d7dd40';
    generateURL = function(urlToExtract) {
      return "" + baseURL + "/" + version + "/" + endpoint + "?key=" + key + "&urls=" + (encodeURIComponent(urlToExtract));
    };
    link = function(data, done) {
      var imgUrl, title, _ref, _ref1;
      console.log(data);
      imgUrl = ((_ref = data.images) != null ? (_ref1 = _ref[0]) != null ? _ref1.url : void 0 : void 0) || data.favicon_url || null;
      title = data.title || data.provider_name || null;
      if (title && data.url) {
        return done({
          title: title,
          subtitle: data.description || data.url || '',
          favicon: data.favicon_url || '',
          image: imgUrl || '',
          url: data.url,
          type: 'link'
        });
      }
    };
    image = function(data, done) {
      console.log('IMAGE');
      if (data.url) {
        return done({
          title: '',
          subtitle: '',
          image: data.url,
          url: data.url,
          type: 'image'
        });
      }
    };
    video = function(data, done) {
      var width;
      console.log('VIDEO');
      width = maxWidth || 100;
      if (data.url && width) {
        return done({
          title: data.title || data.provider_name || '',
          subtitle: '',
          iframe: "<video src='" + data.url + "' width='" + width + "' controls></video>",
          url: data.url,
          type: 'video'
        });
      }
    };
    typeToHandler = {
      html: link,
      text: link,
      link: link,
      pdf: link,
      image: image,
      video: video
    };
    return {
      extract: function(url) {
        var deferred;
        deferred = Q.defer();
        $http({
          method: 'GET',
          url: generateURL(url)
        }).success(function(data) {
          var firstResult, handler;
          firstResult = data.length ? data[0] : {};
          handler = typeToHandler[firstResult.type];
          if (handler) {
            return handler(firstResult, deferred.resolve);
          }
        });
        return deferred.promise;
      }
    };
  });

  angular.module('$app.services').service('$fakeforge', [
    '$rootScope', function($scope) {
      var dropSomeTables, getSomeContacts, getSomeIDs, getSomeQueryResults, getSomeStuff, makeSomeTables, maybeANote, randomEmail, randomName, randomNote, randomPhone, randomString;
      randomString = function(length) {
        return Math.random().toString(36).substring(2, length + 2);
      };
      randomName = function() {
        return randomString(6) + ' ' + randomString(8);
      };
      randomEmail = function() {
        return randomString(6) + '@' + randomString(5) + '.com';
      };
      randomPhone = function() {
        return randomString(10);
      };
      getSomeContacts = function(d, _arg) {
        var firstName, lastName, limit, name, skip, _i, _ref, _results;
        name = _arg.name, limit = _arg.limit, skip = _arg.skip;
        _ref = randomName().split(' '), firstName = _ref[0], lastName = _ref[1];
        return d.resolve((function() {
          _results = [];
          for (var _i = 0; 0 <= limit ? _i < limit : _i > limit; 0 <= limit ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(function() {
          return {
            firstName: firstName,
            lastName: lastName,
            email: randomEmail(),
            phone: randomPhone()
          };
        }));
      };
      getSomeIDs = function(d, args) {
        var id, q;
        return d.resolve((function() {
          var _i, _len, _ref, _results;
          _ref = args['queries'];
          _results = [];
          for (id = _i = 0, _len = _ref.length; _i < _len; id = ++_i) {
            q = _ref[id];
            _results.push(id + 1);
          }
          return _results;
        })());
      };
      randomNote = function() {
        return {
          text: randomString(10),
          timestamp: randomString(10),
          id: randomString(12),
          entities: {}
        };
      };
      maybeANote = function() {
        if ((Math.floor(Math.random() * 10)) > 5) {
          return [randomNote()];
        } else {
          return [];
        }
      };
      getSomeQueryResults = function(d, args) {
        var id, q;
        return d.resolve((function() {
          var _i, _len, _ref, _results;
          _ref = args.queries;
          _results = [];
          for (id = _i = 0, _len = _ref.length; _i < _len; id = ++_i) {
            q = _ref[id];
            _results.push([]);
          }
          return _results;
        })());
      };
      getSomeStuff = function(d, args) {
        var _i, _ref, _results;
        return d.resolve((function() {
          _results = [];
          for (var _i = 0, _ref = Math.random() * 30; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(randomNote));
      };
      makeSomeTables = function(d, args) {
        return d.resolve();
      };
      dropSomeTables = function(d, args) {
        return d.resolve();
      };
      return this.call = function(deferred, method, args) {
        switch (method) {
          case 'contacts.get':
            return getSomeContacts(deferred, args);
          case 'sqlite.writeAll':
            return getSomeIDs(deferred, args);
          case 'sqlite.multiQuery':
            return getSomeQueryResults(deferred, args);
          case 'sqlite.query':
            return getSomeStuff(deferred, args);
          case 'sqlite.createTables':
            return makeSomeTables(deferred, args);
          case 'sqlite.dropTables':
            return dropSomeTables(deferred, args);
        }
      };
    }
  ]);

  angular.module('$app.services').service('$forge', [
     function() {
      var $forge, moduleCall, noForge, pluginCall;
      $forge = {};
      noForge = function(deferred, method, args) {
        return setTimeout(function() {
          return $root.$apply(function() {
            return $fake.call(deferred, method, args);
          });
        }, 100);
      };
      pluginCall = function(method, args) {
        var deferred;
        deferred = Q.defer();
        if (window.forge) {
          forge.internal.call(method, args, function(results) {
            return deferred.resolve(results);
          }, function(err) {
            return deferred.reject(err);
          });
        } else {
          noForge(deferred, method, args);
        }
        return deferred.promise;
      };
      moduleCall = function(name, args) {
        var argsExist, baseForge, deferred, error, method, module0, module1, namespace, success, tripleNamespaced, _ref;
        _ref = namespace = name.split('.'), module0 = _ref[0], module1 = _ref[1], method = _ref[2];
        deferred = Q.defer();
        argsExist = function() {
          return Boolean(args);
        };
        tripleNamespaced = function() {
          return namespace.length === 3;
        };
        success = function(results) {
          return $root.$apply(function() {
            return deferred.resolve(results);
          });
        };
        error = function(err) {
          return deferred.reject(err);
        };
        if (window.forge) {
          baseForge = forge[module0][module1];
          if (argsExist() && tripleNamespaced()) {
            baseForge[method](args, success, error);
          } else if (argsExist() && !tripleNamespaced()) {
            baseForge(args, success, error);
          } else if (!argsExist() && tripleNamespaced()) {
            baseForge[method](success, error);
          } else if (!argsExist() && !tripleNamespaced()) {
            baseForge(success, error);
          }
        } else {
          noForge(deferred, name, args);
        }
        return deferred.promise;
      };
      $forge.getPluginCall = function(method) {
        return function(args) {
          return pluginCall(method, args);
        };
      };
      $forge.getModuleCall = function(namespace) {
        return function(args) {
          return moduleCall(namespace, args);
        };
      };
      return $forge;
    }
  ]);

  angular.module('$app.services').service('forgeUI', [
    '$forge', function($forge) {
      var getModuleCall, getPluginCall;
      getPluginCall = $forge.getPluginCall, getModuleCall = $forge.getModuleCall;
      this.clearBar = getPluginCall('damn_you_form_assist.killBar');
      this.allowFocus = getPluginCall('focus.allowFocus');
      this.preventScroll = getPluginCall('prevent_autoscroll.preventScroll');
      this.enableScroll = getPluginCall('prevent_autoscroll.enableScroll');
      this.resetScroll = getPluginCall('prevent_autoscroll.resetScroll');
      return this.openUrl = function(url, title) {
        return (getModuleCall('tabs.openWithOptions'))({
          url: url,
          title: title,
          tint: [1, 94, 161, 255]
        }, function() {
          return console.log("Success!");
        }, function() {
          return console.log("Failure!");
        });
      };
    }
  ]);

  angular.module('$app.services').service('$invite', function($kinvey) {
    return {
      send: function(params) {
        return $kinvey.DataStore.save('invite-friends', params);
      }
    };
  });

  angular.module('$app.services').factory('$kinvey', function() {
    Kinvey.fnUserPromise = Kinvey.init({
      appKey: 'kid_ePfBz7N8xf',
      appSecret: 'e13392c82e8b4ba597ad8c043c991100'
    });
    return Kinvey;
  });

  angular.module('$app.services').service('$notesServer', function($kinvey, $window) {
    var LAST, getQuery, getSortedQuery, notes, store;
    notes = {};
    getSortedQuery = function() {
      var query;
      query = new $kinvey.Query();
      return query.descending('_kmd.lmt');
    };
    getQuery = function(stashed) {
      var query;
      query = getSortedQuery();
      query.notEqualTo('state', 'deleted');
      if (stashed) {
        query.equalTo('stashed', true);
      } else {
        query.notEqualTo('stashed', true);
      }
      return query.limit(25);
    };
    notes.find = function(query) {
      return $kinvey.DataStore.find('notes', query);
    };
    notes.getSome = function(stashed) {
      return this.find(getQuery(stashed));
    };
    notes.get = function(options) {
      var query;
      options || (options = {});
      query = getSortedQuery();
      if (options.excludeDeleted) {
        query.notEqualTo('state', 'deleted');
      }
      if (options.after) {
        query.greaterThan('_kmd.lmt', options.after);
      }
      return this.find(query);
    };
    notes.save = function(note) {
      return $kinvey.DataStore.save('notes', note);
    };
    notes["delete"] = function(note) {
      return $kinvey.DataStore.destroy('notes', note._id);
    };
    notes.getById = function(id) {
      return $kinvey.DataStore.get('notes', id);
    };
    LAST = 'dachshund-last-update';
    store = $window.localStorage;
    notes.resetLastUpdateTime = function() {
      return store.removeItem(LAST);
    };
    notes.lastSync = function(time) {
      if ((time != null) && !angular.isString(time)) {
        throw "time must be a string!";
      }
      if (time != null) {
        return store[LAST] = time;
      } else {
        return store[LAST];
      }
    };
    return notes;
  });

  angular.module('$app.services').service('$notes', function($notesServer, $db, $utils, $rootScope, $user, Q) {
    var changeStashStatus, notes, sendDirtyNotes, serverMethodMap, stripNoteForServer;
    notes = {};
    notes.clear = function() {
      $notesServer.resetLastUpdateTime();
      return $db.clear();
    };
    notes.getTags = function() {
      return $db.getTags();
    };
    notes.getContacts = function() {
      return $db.getContacts();
    };
    notes.getTagsAndContacts = function() {
      var deferred, developingList,
        _this = this;
      deferred = Q.defer();
      developingList = null;
      this.getTags().then(function(tagList) {
        developingList = tagList;
        return _this.getContacts();
      }).then(function(contactList) {
        return deferred.resolve(developingList.concat(contactList));
      });
      return deferred.promise;
    };
    notes.get = function(options) {
      options || (options = {});
      return $db.getNotes({
        skip: options.skip,
        limit: options.limit,
        stashed: options.stashed,
        attags: options.attags,
        hashtags: options.hashtags,
        search: options.search
      });
    };
    notes.getById = function(id) {
      return $db.getNote(id);
    };
    notes.save = function(note) {
      var deferred, method;
      deferred = Q.defer();
      method = note._id ? 'update' : 'create';
      note.timestamp = $utils.newTimestamp();
      note.entities = $utils.findEntities(note.text);
      $db[method](note, {
        dirty: true
      }).then(function() {
        var strippedNote;
        deferred.resolve(note);
        strippedNote = stripNoteForServer(note);
        return $notesServer.save(strippedNote);
      }).then(function(noteFromServer) {
        noteFromServer.localID = note.localID;
        /*
            MIXPANEL SHIT
        */

        return $db.clean(noteFromServer);
      });
      return deferred.promise;
    };
    notes["delete"] = function(note) {
      var noteToClean;
      if (!note._id) {
        $db["delete"](note);
        return;
      }
      noteToClean = null;
      return $db["delete"](note, {
        dirty: true
      }).then(function(dirtyNote) {
        noteToClean = dirtyNote;
        return $notesServer["delete"](dirtyNote);
      }).then(function() {
        return $db.clean(noteToClean);
      });
    };
    changeStashStatus = function(note, newStatus) {
      note.stashed || (note.stashed = {});
      note.stashed[$user.getId()] = newStatus;
      return notes.save(note);
    };
    notes.stash = function(note) {
      return changeStashStatus(note, true);
    };
    notes.unstash = function(note) {
      return changeStashStatus(note, false);
    };
    serverMethodMap = {
      create: 'save',
      update: 'save',
      "delete": 'delete'
    };
    stripNoteForServer = function(note) {
      var clone;
      clone = angular.copy(note);
      delete clone.status;
      delete clone.localID;
      return clone;
    };
    sendDirtyNotes = function() {
      return $db.getNotes({
        dirty: true
      }).then(function(notesFromDb) {
        return angular.forEach(notesFromDb, function(note, index) {
          var method, strippedNote;
          method = serverMethodMap[note.status];
          strippedNote = stripNoteForServer(note);
          return $notesServer[method](strippedNote).then(function(noteFromServer) {
            /*
                MIXPANEL SHIT
            */

            noteFromServer.localID = note.localID;
            return $db.clean(noteFromServer);
          });
        });
      });
    };
    notes.harmonize = function() {
      var dbOptions, firstLogin, latestModifiedTime, noteServerOptions;
      latestModifiedTime = $notesServer.lastSync();
      firstLogin = latestModifiedTime == null;
      noteServerOptions = {};
      dbOptions = {};
      if (firstLogin) {
        noteServerOptions.excludeDeleted = true;
        dbOptions.resetTables = true;
      } else {
        noteServerOptions.after = latestModifiedTime;
      }
      return $notesServer.get(noteServerOptions).then(function(notesFromServer) {
        if (notesFromServer.length === 0) {
          return;
        }
        latestModifiedTime = notesFromServer[0]._kmd.lmt;
        return $db.sync(notesFromServer, dbOptions);
      }).then(function() {
        if (latestModifiedTime) {
          $notesServer.lastSync(latestModifiedTime);
        }
        $rootScope.$broadcast('notesUpdated');
        if (!firstLogin) {
          return sendDirtyNotes();
        }
      });
    };
    return notes;
  });

  angular.module('$app.services').service('$notifications', function($kinvey, $window) {
    return {
      location: 'fn-local-notifications',
      store: $window.localStorage,
      getFromServer: function(options) {
        var query;
        query = new $kinvey.Query();
        query.limit(25);
        return this.find(query);
      },
      find: function(query) {
        return $kinvey.DataStore.find('notifications', query);
      },
      refresh: function() {
        var _this = this;
        return this.getFromServer().then(function(notifs) {
          return _this.store[_this.location] = JSON.stringify(notifs);
        });
      },
      get: function() {
        return JSON.parse(this.store[this.location] || '{}');
      },
      clear: function() {
        return delete this.store[this.location];
      }
    };
  });

  angular.module('$app.services').service('$recommendation', function($amazon, $embedly, Q) {
    var bookTags, createAmazonSuccess, findRelevantTags, getActors, getArtists, getAuthors, getFirst, groceryTags, moviesTags, musicTags;
    bookTags = ['#books', '#book', '#read', '#toread', '#2read'];
    musicTags = ['#music', '#listen', '#songs'];
    moviesTags = ['#watch', '#movie', '#movies'];
    groceryTags = ['#groceries', '#grocery', '#food'];
    findRelevantTags = function(masterList, noteTags) {
      return _.any(masterList, function(tag) {
        return _.contains(noteTags, tag);
      });
    };
    getFirst = function(xml) {
      return angular.element(xml[0]);
    };
    createAmazonSuccess = function(type, getSubtitle) {
      return function(xml) {
        var result, subtitle;
        subtitle = getSubtitle != null ? getSubtitle(xml) : '';
        result = {
          subtitle: subtitle,
          image: getFirst(xml.find('LargeImage').find('URL')).text(),
          title: xml.find('Title').text() || '',
          url: xml.find('DetailPageURL').text() || '',
          amazon: true,
          type: type
        };
        if (result.title && result.url) {
          return result;
        }
      };
    };
    getAuthors = function(xml) {
      var author, authors, _i, _len, _ref;
      authors = [];
      _ref = xml.find('Author');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        author = _ref[_i];
        authors.push(angular.element(author).text());
      }
      if (authors.length > 0) {
        return "<span class='first-word'>by</span> " + (authors.join(' & '));
      } else {
        return '';
      }
    };
    getArtists = function(xml) {
      var artist, artists, _i, _len, _ref;
      artists = [];
      _ref = xml.find('Artist');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        artist = _ref[_i];
        artists.push(angular.element(artist).text());
      }
      if (artists.length > 0) {
        return "<span class='first-word'>by</span> " + (artists.join(' & '));
      } else {
        return '';
      }
    };
    getActors = function(xml) {
      var actor, actors, director, string, _i, _len, _ref;
      actors = [];
      director = angular.element(xml.find('Director')).text();
      string = "";
      _ref = xml.find('Actor');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        actor = _ref[_i];
        actors.push(angular.element(actor).text());
      }
      if (actors.length > 0) {
        string += "<span class='first-word'>starring</span> " + (actors.join(', '));
      }
      if ((director != null ? director.length : void 0) > 0) {
        string += " <span class='first-word'>and directed by </span> " + director;
      }
      return string;
    };
    return {
      get: function(note) {
        var tagsFromText, text, urlsFromText;
        text = note.text;
        tagsFromText = note.entities.hashtags;
        urlsFromText = note.entities.urls;
        if (urlsFromText.length > 0) {
          console.log('FOUND URL');
          return $embedly.extract(urlsFromText[0]);
        }
        if (findRelevantTags(bookTags, tagsFromText)) {
          return $amazon.findBooks(text, createAmazonSuccess('book', getAuthors));
        }
        if (findRelevantTags(musicTags, tagsFromText)) {
          return $amazon.findMusic(text, createAmazonSuccess('music', getArtists));
        }
        if (findRelevantTags(moviesTags, tagsFromText)) {
          return $amazon.findMovies(text, createAmazonSuccess('movie', getActors));
        }
        if (findRelevantTags(groceryTags, tagsFromText)) {
          return $amazon.findGroceries(text, createAmazonSuccess('groceries'));
        }
        return Q.defer();
      }
    };
  });

  angular.module('$app.services').service('$user', function($kinvey) {
    var User, activeUser, formatData, setActiveUser, user;
    user = {};
    User = $kinvey.User;
    formatData = function(user) {
      user.username = user.username.toLowerCase();
      return user.password = CryptoJS.SHA1(user.password).toString();
    };
    activeUser = null;
    setActiveUser = function() {
      var _ref;
      return (_ref = $kinvey.fnUserPromise) != null ? _ref.then(function(u) {
        return activeUser = u;
      }) : void 0;
    };
    user.signUp = function(user) {
      formatData(user);
      return User.signup(user).then(setActiveUser);
    };
    user.signIn = function(user) {
      formatData(user);
      return User.login(user).then(setActiveUser);
    };
    user.signOut = function() {
      return User.logout();
    };
    user.getCurrent = function() {
      if (activeUser != null) {
        return activeUser;
      }
      return $kinvey.fnUserPromise;
    };
    user.getId = function() {
      user = typeof $kinvey.getActiveUser === "function" ? $kinvey.getActiveUser() : void 0;
      return (user != null ? user._id : void 0) || '';
    };
    return user;
  });

  angular.module('$app.services').service('$utils', function() {
    var _this = this;
    this.regexp = {
      tags: /#[\w]+/g,
      contacts: /@[\w]+/g,
      urls: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
      emails: /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/ig,
      usernames: /^[a-zA-Z0-9_]*$/i,
      html: {
        tags: /(^|\s)(#[\w]+)/g,
        contacts: /(^|\s)(@[\w]+)/g
      }
    };
    this.HTMLize = function(text, notClickable) {
      var i, line, lines, _i, _len;
      if (notClickable == null) {
        notClickable = false;
      }
      if ((text === void 0) || (text.trim() === '')) {
        return '<p>&nbsp;</p>';
      }
      text = text.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;');
      text = text.replace(_this.regexp.html.tags, "$1<span class=\"hashtag\">$2</span>");
      text = text.replace(_this.regexp.html.contacts, "$1<span class=\"contact\">$2</span>");
      text = text.replace(/bitches/gi, '<span class="bitches">$&</span>');
      if (notClickable) {
        text = text.replace(_this.regexp.urls, "<span class='link'>$1</span>");
        text = text.replace(_this.regexp.emails, "<span class='email'>$1</span>");
      } else {
        text = text.replace(_this.regexp.urls, "<a href='$1' target='_blank'>$1</a>");
        text = text.replace(_this.regexp.emails, "<a href='mailto:$1' target='_blank'>$1</a>");
      }
      text = text.replace(/\ \ /g, '&nbsp;&nbsp;');
      lines = text.split(/\n/);
      for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
        line = lines[i];
        if (line.trim() === '') {
          line = '&nbsp;';
        }
        line = "<p>" + line + "</p>";
        lines[i] = line;
      }
      return lines.join('');
    };
    _.extend(this, _);
    this.findTags = function(str) {
      return this.map(str.replace(this.regexp.urls, '').match(this.regexp.tags) || [], function(tag) {
        return tag.toLowerCase();
      });
    };
    this.findContacts = function(str) {
      return this.map(str.replace(this.regexp.emails, '').replace(this.regexp.urls).match(this.regexp.contacts) || [], function(contact) {
        return contact.toLowerCase();
      });
    };
    this.findEmails = function(str) {
      return str.match(this.regexp.emails) || [];
    };
    this.findUrls = function(str) {
      return str.match(this.regexp.urls) || [];
    };
    this.findEntities = function(text) {
      return {
        hashtags: this.findTags(text),
        attags: this.findContacts(text),
        emails: this.findEmails(text),
        urls: this.findUrls(text)
      };
    };
    this.throttleButton = function(method, time) {
      if (time == null) {
        time = 2000;
      }
      return this.throttle(method, time, {
        leading: true,
        trailing: false
      });
    };
    return this.newTimestamp = function() {
      return new Date().toISOString();
    };
  });

  angular.module('$app.services').service('$xml', function($window) {
    return {
      parse: function(string) {
        var parser, xmlDoc;
        if ($window.DOMParser) {
          parser = new $window.DOMParser();
          xmlDoc = parser.parseFromString(string, 'text/xml');
          return angular.element(xmlDoc);
        } else {
          return angular.element();
        }
      }
    };
  });

  angular.module('$app.services').service('$db', [
    'nativeInterface', function(nativeInterface) {
      if (window.forge) {
        return nativeInterface;
      } else {
        return nativeInterface;
      }
    }
  ]);

  angular.module('$app.services').service('$fakedb', function($window, Q, $timeout, $user) {
    var FakeDatabase, Set;
    FakeDatabase = (function() {
      FakeDatabase.prototype.data = {};

      FakeDatabase.prototype.url = 'fetch-notes-fake-db';

      FakeDatabase.prototype.last = 'fetch-last-update';

      FakeDatabase.prototype.store = $window.localStorage;

      FakeDatabase.prototype.currentUserId = null;

      FakeDatabase.prototype.userIdUrl = 'fetch-current-user-id';

      FakeDatabase.prototype.TEXT = "text";

      FakeDatabase.prototype.LOCAL_ID = "localID";

      FakeDatabase.prototype.SERVER_ID = "_id";

      FakeDatabase.prototype.TIMESTAMP = "timestamp";

      FakeDatabase.prototype.STATUS = "status";

      function FakeDatabase() {
        this._load();
        this._loadUserId();
      }

      FakeDatabase.prototype._loadUserId = function() {
        var current, id,
          _this = this;
        id = this.store[this.userIdUrl];
        if (id) {
          return this.currentUserId = id;
        } else {
          current = $user.getCurrent();
          if ((current != null ? current.then : void 0) != null) {
            return current.then(function(active) {
              return _this._setUserId($user.getId());
            }, function(active) {
              return _this._setUserId($user.getId());
            });
          } else {
            return this._setUserId($user.getId());
          }
        }
      };

      FakeDatabase.prototype._setUserId = function(id) {
        this.currentUserId = id;
        return this.store[this.userIdUrl] = id;
      };

      FakeDatabase.prototype._load = function() {
        return this.data = this._getStore() || {};
      };

      FakeDatabase.prototype._getStore = function() {
        return JSON.parse(this.store[this.url] || '{}');
      };

      FakeDatabase.prototype.clear = function(options) {
        delete this.store[this.url];
        delete this.store[this.last];
        delete this.store[this.userIdUrl];
        this.data = {};
        return this.callSuccess(null, options);
      };

      FakeDatabase.prototype.lastSync = function(time) {
        if ((time != null) && !angular.isString(time)) {
          throw "time must be a string!";
        }
        if (time != null) {
          return this.store[this.last] = time;
        } else {
          return this.store[this.last];
        }
      };

      /*
          NOTE RELATED STUFF
      */


      FakeDatabase.prototype._save = function() {
        return this.store[this.url] = JSON.stringify(this.data);
      };

      FakeDatabase.prototype.create = function(model, options) {
        var i, id, item, obj, optionsWithoutSuccess, _i, _len;
        if (angular.isArray(model)) {
          optionsWithoutSuccess = angular.copy(options || {});
          delete optionsWithoutSuccess.success;
          for (i = _i = 0, _len = model.length; _i < _len; i = ++_i) {
            item = model[i];
            if (i === model.length - 1) {
              return this.create(item, options);
            } else {
              this.create(item, optionsWithoutSuccess);
            }
          }
        }
        options = options ? angular.copy(options) : {};
        obj = this.clone(model);
        id = obj[this.SERVER_ID];
        if (!id) {
          if (obj[this.LOCAL_ID]) {
            id = obj[this.LOCAL_ID];
          } else {
            id = Date.now() + Math.floor(Math.random() * 1000);
            model[this.LOCAL_ID] = id;
            obj[this.LOCAL_ID] = id;
          }
        }
        obj[this.STATUS] = options.dirty ? 'create' : 'synced';
        this.data[id] = obj;
        return this._finish(model, options);
      };

      FakeDatabase.prototype._containsEvery = function(a, b) {
        return _.every(b, function(el) {
          return _.contains(a, el);
        });
      };

      FakeDatabase.prototype._notesWithEntities = function(selector, options) {
        var lowercase,
          _this = this;
        lowercase = function(str) {
          return str.toLowerCase();
        };
        return _.filter(this.data, function(n) {
          return _this._containsEvery(_.map(n.entities[selector], lowercase), _.map(options[selector], lowercase));
        });
      };

      FakeDatabase.prototype.getNote = function(id) {
        var existingId, fakeNote;
        fakeNote = {};
        fakeNote[this.SERVER_ID] = id;
        existingId = this._idAlreadyInDB(fakeNote);
        if (existingId) {
          return this.callSuccess(this.data[existingId]);
        } else {
          return this.callSuccess(fakeNote);
        }
      };

      FakeDatabase.prototype.getNotes = function(options) {
        var filters, limit, poopSearch, query, results, skip, _i, _len, _ref,
          _this = this;
        options = options ? angular.copy(options) : {};
        filters = [];
        if (options.hashtags && options.hashtags.length) {
          filters.push(this._notesWithEntities('hashtags', options));
        }
        if (options.attags && options.attags.length) {
          filters.push(this._notesWithEntities('attags', options));
        }
        if (options.search && options.search.length) {
          poopSearch = function(filtersArray, query) {
            return filters.push(_.filter(_this.data, function(n) {
              return n[_this.TEXT].toLowerCase().indexOf(query) !== -1;
            }));
          };
          if (angular.isArray(options.search)) {
            _ref = options.search;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              query = _ref[_i];
              poopSearch(filters, query);
            }
          } else {
            poopSearch(filters, options.search);
          }
        }
        if (options.dirty) {
          filters.push(_.filter(this.data, function(n) {
            return n[_this.STATUS] !== 'synced';
          }));
        }
        if (options.stashed != null) {
          filters.push(_.filter(this.data, function(n) {
            if ((n.stashed != null) && (n.stashed[_this.currentUserId] != null)) {
              return n.stashed[_this.currentUserId] === options.stashed;
            } else {
              return !options.stashed;
            }
          }));
        }
        if (filters.length) {
          results = _.intersection.apply(_, filters);
        } else {
          results = [];
          _.each(this.data, function(n) {
            return results.push(n);
          });
        }
        skip = options.skip || 0;
        limit = options.limit || results.length;
        results = _.sortBy(results, function(n) {
          return -Date.parse(n[_this.TIMESTAMP]);
        });
        return this._finish(_.cloneDeep(results.slice(skip, skip + limit)), options);
      };

      FakeDatabase.prototype.countNotes = function(options) {
        return this.getNotes(options).then(function(notes) {
          return notes.length;
        });
      };

      FakeDatabase.prototype.update = function(model, options) {
        var existingId, id, obj;
        options = options ? angular.copy(options) : {};
        obj = this.clone(model);
        obj[this.STATUS] = options.dirty ? 'update' : 'synced';
        existingId = this._idAlreadyInDB(model);
        if (existingId) {
          delete this.data[existingId];
        }
        id = obj[this.SERVER_ID] || obj[this.LOCAL_ID];
        if (!id) {
          throw "Updating note without id OR localID. COME ON";
        }
        this.data[id] = obj;
        return this._finish(model, options);
      };

      FakeDatabase.prototype["delete"] = function(model, options) {
        var existingId, id, obj;
        options = options ? angular.copy(options) : {};
        obj = this.clone(model);
        obj[this.STATUS] = options.dirty ? 'delete' : 'synced';
        existingId = this._idAlreadyInDB(model);
        id = obj[this.SERVER_ID] || obj[this.LOCAL_ID];
        if (!id) {
          throw "deleting note without id OR localID. COME ON";
        }
        if (options.dirty) {
          this.data[id] = obj;
        } else {
          delete this.data[id];
        }
        return this._finish(obj, options);
      };

      FakeDatabase.prototype.clean = function(model, options) {
        var existingId, id, obj;
        obj = this.clone(model);
        existingId = this._idAlreadyInDB(model);
        id = obj[this.SERVER_ID] || obj[this.LOCAL_ID];
        if (!id) {
          throw "cleaning note without id OR localID. COME ON";
        }
        delete this.data[existingId];
        if (obj[this.STATUS] !== 'delete') {
          obj[this.STATUS] = 'synced';
          this.data[id] = obj;
        }
        return this._finish(model, options);
      };

      FakeDatabase.prototype._finish = function(resp, options) {
        this._save();
        return this.callSuccess(resp, options);
      };

      FakeDatabase.prototype.clone = function(model) {
        var clone;
        clone = angular.copy(model);
        delete clone.$$hashKey;
        return clone;
      };

      FakeDatabase.prototype.sync = function(list, options) {
        var note, obj, _i, _len;
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          note = list[_i];
          obj = this.clone(note);
          if (obj.state === 'deleted') {
            this["delete"](obj);
          } else {
            this.update(obj);
          }
        }
        return this._finish(list, options);
      };

      FakeDatabase.prototype._idAlreadyInDB = function(model) {
        var id, local;
        local = model[this.LOCAL_ID];
        id = model[this.SERVER_ID];
        if (local && this.data.hasOwnProperty(local)) {
          return local;
        }
        if (id && this.data.hasOwnProperty(id)) {
          return id;
        }
        return null;
      };

      /*
      
          END OF NOTES STUFF
      */


      FakeDatabase.prototype.callSuccess = function(resp, options) {
        var deferred;
        deferred = Q.defer();
        $timeout(function() {
          return deferred.resolve(resp);
        }, 10);
        if (options && options.success) {
          options.success(resp);
        }
        return deferred.promise;
      };

      FakeDatabase.prototype.getTags = function(options) {
        var stuff;
        stuff = new Set;
        _.each(this.data, function(model) {
          var tag, _i, _len, _ref, _results;
          _ref = model.entities.hashtags;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tag = _ref[_i];
            _results.push(stuff.add(tag.toLowerCase()));
          }
          return _results;
        });
        return this.callSuccess(stuff.get(), options);
      };

      FakeDatabase.prototype.getContacts = function(options) {
        var stuff;
        stuff = new Set;
        _.each(this.data, function(model) {
          var tag, _i, _len, _ref, _results;
          _ref = model.entities.attags;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tag = _ref[_i];
            _results.push(stuff.add(tag.toLowerCase()));
          }
          return _results;
        });
        return this.callSuccess(stuff.get(), options);
      };

      return FakeDatabase;

    })();
    Set = (function() {
      function Set() {
        this.data = {};
      }

      Set.prototype.add = function(item) {
        if (this.data.hasOwnProperty(item)) {
          return this.data[item] += 1;
        } else {
          return this.data[item] = 1;
        }
      };

      Set.prototype.get = function() {
        var item, results, _i, _len, _ref;
        results = [];
        _ref = Object.keys(this.data);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          results.push({
            name: item,
            count: this.data[item]
          });
        }
        return results;
      };

      return Set;

    })();
    return new FakeDatabase;
  });

  angular.module('$app.services').service('fakeDB', [
    'testingUtilities', function(utils) {
      var $fake, NUMBER_OF_ARGS, NUMBER_OF_TABLES, checkArgs, getArgsCheckWithFinish;
      $fake = {};
      NUMBER_OF_ARGS = 3;
      NUMBER_OF_TABLES = 5;
      checkArgs = function(singleArgName, args) {
        if (Object.keys(args).length !== NUMBER_OF_ARGS) {
          return "wrong number of args in:\n " + (JSON.stringify(args, null, 2));
        } else if (!args[singleArgName]) {
          return "no 'queries' argument!";
        } else {
          return null;
        }
      };
      getArgsCheckWithFinish = function(argName, finish) {
        return function(args) {
          var error, problem, success;
          success = args.success, error = args.error;
          problem = checkArgs(argName, args);
          if (problem) {
            if (error) {
              return error(problem);
            }
          } else {
            return finish(success, args);
          }
        };
      };
      $fake.dbWriteAll = getArgsCheckWithFinish('queries', function(success, args) {
        var id, q;
        return success((function() {
          var _i, _len, _ref, _results;
          _ref = args['queries'];
          _results = [];
          for (id = _i = 0, _len = _ref.length; _i < _len; id = ++_i) {
            q = _ref[id];
            _results.push(id + 1);
          }
          return _results;
        })());
      });
      $fake.dbMultiQuery = getArgsCheckWithFinish('queries', function(success, args) {
        var id, q;
        return success((function() {
          var _i, _len, _ref, _results;
          _ref = args['queries'];
          _results = [];
          for (id = _i = 0, _len = _ref.length; _i < _len; id = ++_i) {
            q = _ref[id];
            _results.push([]);
          }
          return _results;
        })());
      });
      $fake.dbDropTables = getArgsCheckWithFinish('tables', function(success) {
        return success();
      });
      $fake.dbQuery = getArgsCheckWithFinish('query', function(success, args) {
        return success(utils.notes);
      });
      $fake.dbCreateTables = getArgsCheckWithFinish('schema', function(success, _arg) {
        var error, schema;
        schema = _arg.schema, error = _arg.error;
        if (Object.keys(schema).length !== NUMBER_OF_TABLES) {
          return error("Not enough schema to make tables!");
        } else {
          return success();
        }
      });
      return $fake;
    }
  ]);

  angular.module('$app.services').service('forgeDB', [
    '$forge', function($forge) {
      var getPluginCall;
      getPluginCall = $forge.getPluginCall;
      this.dbWriteAll = getPluginCall('sqlite.writeAll');
      this.dbMultiQuery = getPluginCall('sqlite.multiQuery');
      this.dbDropTables = getPluginCall('sqlite.dropTables');
      this.dbQuery = getPluginCall('sqlite.query');
      return this.dbCreateTables = getPluginCall('sqlite.createTables');
    }
  ]);

  angular.module('$app.services').service('dbLiterals', function() {
    return {
      TEXT_COL: "text",
      LOC_COL: "localID",
      SERV_COL: "_id",
      TIME_COL: "timestamp",
      STATUS_COL: "status",
      STASH_COL: "stashed",
      STASH_BOOL_COL: "stash_bool",
      RECOMMENDATION_COL: "recommendation",
      CREATED_AT_COL: "created_at",
      CREATOR_COL: "creator",
      TABLE_NAMES: {
        notes: "Notes",
        hashtags: "NoteTag",
        attags: "NoteContact",
        emails: "NoteEmail",
        urls: "NoteURL"
      }
    };
  });

  angular.module('$app.services').service('nativeInterface', [
    'queryBuilder', '$utils', 'forgeDB', '$user', function(qb, $utils, $forge, $user) {
      var NativeInterface;
      NativeInterface = (function() {
        function NativeInterface(queryBuilder) {
          var LOC_COL, SERV_COL, STASH_BOOL_COL, STASH_COL, STATUS_COL, TEXT_COL, TIME_COL, _ref;
          this.queryBuilder = queryBuilder;
          this._fetchifyNote = __bind(this._fetchifyNote, this);
          this.database = this.queryBuilder.database;
          _ref = this.database, TEXT_COL = _ref.TEXT_COL, LOC_COL = _ref.LOC_COL, SERV_COL = _ref.SERV_COL, TIME_COL = _ref.TIME_COL, STATUS_COL = _ref.STATUS_COL, STASH_COL = _ref.STASH_COL, STASH_BOOL_COL = _ref.STASH_BOOL_COL;
          this.TEXT = TEXT_COL;
          this.ID = SERV_COL;
          this.LOCAL_ID = LOC_COL;
          this.TIMESTAMP = TIME_COL;
          this.STATUS = STATUS_COL;
          this.STASH = STASH_COL;
          this.STASH_BOOL = STASH_BOOL_COL;
        }

        NativeInterface.prototype.createTables = function() {
          return $forge.dbCreateTables({
            schema: this.queryBuilder.getCreateTablesQueries()
          });
        };

        NativeInterface.prototype.create = function(model, options) {
          var _this = this;
          if (options == null) {
            options = {};
          }
          if (!this._rerouteUnsyncedToUpdate(model, options)) {
            return this._makeAndCallQuery(model, options, angular.bind(this.queryBuilder, this.queryBuilder.addNote), 'create').then(function(ids) {
              var i, models, note, _i, _len;
              if (angular.isArray(model)) {
                models = model;
                for (i = _i = 0, _len = models.length; _i < _len; i = ++_i) {
                  note = models[i];
                  note[_this.LOCAL_ID] = ids[i];
                }
              } else {
                model[_this.LOCAL_ID] = ids[0];
              }
              return _this._writeAllQueries(_this.queryBuilder.addNotesEntities(_this._arrayCheck(model)));
            });
          } else {
            return this.update(model);
          }
        };

        NativeInterface.prototype.update = function(model, options) {
          var _this = this;
          if (options == null) {
            options = {};
          }
          return this._makeAndCallQuery(model, options, angular.bind(this.queryBuilder, this.queryBuilder.updateNote), 'update').then(function() {
            var bigArray;
            bigArray = [_this.queryBuilder.removeNotesEntities(_this._arrayCheck(model)), _this.queryBuilder.addNotesEntities(_this._arrayCheck(model))];
            return _this._writeAllQueries($utils.flatten(bigArray));
          });
        };

        NativeInterface.prototype["delete"] = function(model, options) {
          var dirty,
            _this = this;
          if (options == null) {
            options = {};
          }
          dirty = options.dirty;
          return this._makeAndCallQuery(model, options, angular.bind(this.queryBuilder, this.queryBuilder[!!dirty ? 'updateNote' : 'deleteNote']), 'delete').then(function() {
            return _this._writeAllQueries(_this.queryBuilder.removeNotesEntities(_this._arrayCheck(model)));
          });
        };

        NativeInterface.prototype.clean = function(model, options) {
          if (options == null) {
            options = {};
          }
          options.dirty = false;
          if (!angular.isArray(model)) {
            if (model[this.STATUS] === 'delete' || model['state'] === 'deleted') {
              return this["delete"](model, options);
            } else {
              options.cleaning = true;
              return this.update(model, options);
            }
          } else {
            if (options.error) {
              options.error();
            }
            throw new Error("clean takes only a single object");
          }
        };

        NativeInterface.prototype.sync = function(models, options) {
          var startSync,
            _this = this;
          if (options == null) {
            options = {};
          }
          startSync = function() {
            return $forge.dbMultiQuery({
              queries: $utils.map(models, angular.bind(_this.queryBuilder, _this.queryBuilder.fetchSingleNote))
            }).then(function(results) {
              return _this._writeFromServer({
                models: models,
                results: results
              });
            });
          };
          if (options.resetTables) {
            return this.clear().then(function() {
              return _this.createTables();
            }, function() {
              return _this.createTables();
            }).then(function() {
              return startSync();
            });
          } else {
            return startSync();
          }
        };

        NativeInterface.prototype.clear = function(options) {
          var key, value;
          if (options == null) {
            options = {};
          }
          this.queryBuilder.clearUserId();
          return $forge.dbDropTables({
            tables: (function() {
              var _ref, _results;
              _ref = this.database.TABLE_NAMES;
              _results = [];
              for (key in _ref) {
                value = _ref[key];
                _results.push(value);
              }
              return _results;
            }).call(this)
          });
        };

        NativeInterface.prototype.getNote = function(_id) {
          var args, q;
          q = Q.defer();
          args = {
            query: this.queryBuilder.fetchSingleNote({
              _id: _id
            })
          };
          this._getStuff(args).then(function(_arg) {
            var note;
            note = _arg[0];
            return q.resolve(note);
          }, function(error) {
            return q.reject(error);
          });
          return q.promise;
        };

        NativeInterface.prototype.getNotes = function(args) {
          if (args == null) {
            args = {};
          }
          args.query = this.queryBuilder.fetchNotes(args);
          return this._getStuff(args);
        };

        NativeInterface.prototype.countNotes = function(args) {
          if (args == null) {
            args = {};
          }
          args.query = this.queryBuilder.countNotes(args);
          return this._getStuff(args).then(function(_arg) {
            var count;
            count = _arg[0].count;
            return count;
          });
        };

        NativeInterface.prototype.getTags = function(args) {
          if (args == null) {
            args = {};
          }
          args.builder = angular.bind(this.queryBuilder, this.queryBuilder.fetchTags);
          return this._getEntities(args);
        };

        NativeInterface.prototype.getContacts = function(args) {
          if (args == null) {
            args = {};
          }
          args.builder = angular.bind(this.queryBuilder, this.queryBuilder.fetchContacts);
          return this._getEntities(args);
        };

        NativeInterface.prototype._getCurrentUserId = function() {
          return this.queryBuilder.currentUserId;
        };

        NativeInterface.prototype._getEntities = function(args) {
          var attags, builder, hashtags;
          args || (args = {});
          attags = args.attags, hashtags = args.hashtags, builder = args.builder;
          args = {
            attags: attags,
            hashtags: hashtags
          };
          args.hashtags || (args.hashtags = []);
          args.attags || (args.attags = []);
          args.query = builder(args);
          return this._getStuff(args);
        };

        NativeInterface.prototype._fetchifyNote = function(note) {
          if (note[this.ID] === 'undefined') {
            delete note[this.ID];
          }
          if (note[this.STASH]) {
            note[this.STASH] = JSON.parse(note[this.STASH]);
          }
          delete note[this.STASH_BOOL];
          note.entities = $utils.findEntities(note.text);
          note.shared = note.entities.attags.length >= 2;
          return note;
        };

        NativeInterface.prototype._getStuff = function(args) {
          var isNote, query,
            _this = this;
          query = args.query;
          isNote = function(model) {
            return Boolean(model && model.text);
          };
          return $forge.dbQuery({
            query: query
          }).then(function(dbData) {
            if (isNote(dbData[0])) {
              return dbData.map(_this._fetchifyNote);
            } else {
              return dbData;
            }
          });
        };

        NativeInterface.prototype._writeFromServer = function(options) {
          var compactSorted, dbError, isNew, models, obj, results, sorted,
            _this = this;
          models = options.models, results = options.results;
          dbError = function(e) {
            if (error) {
              return error(e);
            }
          };
          isNew = function(object) {
            return !object.result.length && !(object.model['state'] === 'deleted');
          };
          sorted = $utils.sortBy(this._arraysToObjects('model', models, 'result', results), function(object) {
            if (isNew(object)) {
              return 0;
            } else {
              return 42;
            }
          });
          compactSorted = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = sorted.length; _i < _len; _i++) {
              obj = sorted[_i];
              if (obj.result.length || obj.model['text']) {
                _results.push(obj);
              }
            }
            return _results;
          })();
          return this._writeAllQueries($utils.flatten((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = compactSorted.length; _i < _len; _i++) {
              obj = compactSorted[_i];
              _results.push(this._buildCUDMethod(obj.model, obj.result));
            }
            return _results;
          }).call(this))).then(function(ids) {
            var entityQueries, i, _i, _len;
            entityQueries = [];
            for (i = _i = 0, _len = compactSorted.length; _i < _len; i = ++_i) {
              obj = compactSorted[i];
              if (isNew(obj)) {
                obj.model[_this.LOCAL_ID] = ids[i];
                entityQueries.push(_this.queryBuilder.addNotesEntities([obj.model]));
              }
            }
            return _this._writeAllQueries($utils.flatten(entityQueries));
          }, dbError);
        };

        NativeInterface.prototype._getStashBool = function(model, userID) {
          if (model[this.STASH]) {
            return !!model[this.STASH][userID];
          } else {
            return false;
          }
        };

        NativeInterface.prototype._arraysToObjects = function(key0, array0, key1, array1) {
          var i, makeObject, thing;
          makeObject = function(thing0, thing1) {
            var result;
            result = {};
            result[key0] = thing0;
            result[key1] = thing1;
            return result;
          };
          return (function() {
            var _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = array0.length; _i < _len; i = ++_i) {
              thing = array0[i];
              _results.push(makeObject(thing, array1[i]));
            }
            return _results;
          })();
        };

        NativeInterface.prototype._buildCUDMethod = function(noteFromServer, localNoteInArray) {
          var localNote, localTime, serverTime;
          noteFromServer[this.STATUS] = 'synced';
          localNote = localNoteInArray[0];
          if (localNote) {
            localTime = localNote[this.timestamp];
          }
          serverTime = noteFromServer[this.timestamp];
          if (noteFromServer['state'] === 'deleted') {
            if (localNote) {
              return [
                {
                  query: this.queryBuilder.deleteNote(noteFromServer),
                  args: []
                }, this.queryBuilder.removeNotesEntities(localNote[this.LOCAL_ID])
              ];
            } else {
              return [];
            }
          } else if (localNote && serverTime > localTime) {
            noteFromServer[this.LOCAL_ID] = localNote[this.LOCAL_ID];
            return [
              {
                query: this.queryBuilder.updateNote(noteFromServer),
                args: [noteFromServer[this.TEXT]]
              }, this.queryBuilder.removeNotesEntities(localNote[this.LOCAL_ID]), this.queryBuilder.addNotesEntities[noteFromServer]
            ];
          } else if (!localNote) {
            return {
              args: [noteFromServer[this.TEXT]],
              query: this.queryBuilder.addNote(noteFromServer)
            };
          } else {
            return [];
          }
        };

        NativeInterface.prototype._makeAndCallQuery = function(model, options, queryFunction, ifDirty) {
          var addQuery, cleaning, dirty, note, queries, _i, _len,
            _this = this;
          options || (options = {});
          cleaning = options.cleaning, dirty = options.dirty;
          queries = [];
          addQuery = function(note) {
            note = $utils.clone(note);
            note[_this.STATUS] = dirty ? ifDirty : 'synced';
            return queries.push({
              query: queryFunction(note, cleaning),
              args: !dirty && ifDirty === 'delete' ? [] : [note[_this.TEXT]]
            });
          };
          if (angular.isArray(model)) {
            for (_i = 0, _len = model.length; _i < _len; _i++) {
              note = model[_i];
              addQuery(note);
            }
          } else {
            addQuery(model);
          }
          return this._writeAllQueries(queries);
        };

        NativeInterface.prototype._writeAllQueries = function(queries, options) {
          return $forge.dbWriteAll({
            queries: queries
          });
        };

        NativeInterface.prototype._arrayCheck = function(model) {
          if (angular.isArray(model)) {
            return model;
          } else {
            return [model];
          }
        };

        NativeInterface.prototype._rerouteUnsyncedToUpdate = function(model, options) {
          if (!angular.isArray(model) && model[this.LOCAL_ID] && !model[this.ID]) {
            return true;
          }
          return false;
        };

        return NativeInterface;

      })();
      return new NativeInterface(qb);
    }
  ]);

  angular.module('$app.services').service('queryBuilder', [
    'dbLiterals', '$utils', '$user', '$window', function(dbLiterals, utils, $user, $window) {
      var QueryBuilder;
      QueryBuilder = (function() {
        function QueryBuilder(database, userID) {
          var LOC_COL, SERV_COL, TIME_COL, field, oneToOnes, _i, _len;
          this.database = database;
          LOC_COL = database.LOC_COL, SERV_COL = database.SERV_COL, TIME_COL = database.TIME_COL;
          this.ID = SERV_COL;
          this.LOCAL_ID = LOC_COL;
          this.TIMESTAMP = TIME_COL;
          oneToOnes = ['TEXT', 'STATUS', 'STASH', 'STASH_BOOL', 'CREATOR', 'RECOMMENDATION', 'CREATED_AT'];
          for (_i = 0, _len = oneToOnes.length; _i < _len; _i++) {
            field = oneToOnes[_i];
            this[field] = database[field + '_COL'];
          }
          this._loadUserId();
        }

        QueryBuilder.prototype.getCreateTablesQueries = function() {
          var COLUMN, ENTITY_COL_NAMES, LOC_ID, SCHEMA, TABLE_NAMES, i, key, schema, value;
          TABLE_NAMES = (function() {
            var _ref, _results;
            _ref = this.database.TABLE_NAMES;
            _results = [];
            for (key in _ref) {
              value = _ref[key];
              _results.push(value);
            }
            return _results;
          }).call(this);
          ENTITY_COL_NAMES = ["hashtags", "attags", "emails", "urls"];
          LOC_ID = "" + this.database.LOC_COL + " INTEGER PRIMARY KEY ";
          SCHEMA = [("(" + this.database.TEXT_COL + " TEXT, " + LOC_ID + ", " + this.database.SERV_COL + " TEXT,") + (" " + this.database.TIME_COL + " TEXT, " + this.database.STATUS_COL + " TEXT, ") + ("" + this.database.STASH_COL + " TEXT, " + this.database.STASH_BOOL_COL + " TEXT, ") + ("" + this.database.CREATOR_COL + " TEXT, " + this.database.CREATED_AT_COL + " TEXT,") + ("" + this.database.RECOMMENDATION_COL + " TEXT)")].concat((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = ENTITY_COL_NAMES.length; _i < _len; _i++) {
              COLUMN = ENTITY_COL_NAMES[_i];
              _results.push(("(" + this.database.LOC_COL + " INTEGER, " + COLUMN + " TEXT, ") + ("UNIQUE(" + this.database.LOC_COL + ", " + COLUMN + ") ") + "ON CONFLICT REPLACE)");
            }
            return _results;
          }).call(this));
          return (function() {
            var _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = SCHEMA.length; _i < _len; i = ++_i) {
              schema = SCHEMA[i];
              _results.push({
                name: TABLE_NAMES[i],
                schema: schema
              });
            }
            return _results;
          })();
        };

        QueryBuilder.prototype.currentUserId = null;

        QueryBuilder.prototype.userIdUrl = 'fetch-current-user-id';

        QueryBuilder.prototype.store = $window.localStorage;

        QueryBuilder.prototype._loadUserId = function() {
          var current, id,
            _this = this;
          id = this.store[this.userIdUrl];
          if (id) {
            return this.currentUserId = id;
          } else {
            current = $user.getCurrent();
            if ((current != null ? current.then : void 0) != null) {
              return current.then(function(active) {
                return _this._setUserId($user.getId());
              }, function(active) {
                return _this._setUserId($user.getId());
              });
            } else {
              return this._setUserId($user.getId());
            }
          }
        };

        QueryBuilder.prototype._setUserId = function(id) {
          this.currentUserId = id;
          return this.store[this.userIdUrl] = id;
        };

        QueryBuilder.prototype.clearUserId = function() {
          return delete this.store[this.userIdUrl];
        };

        QueryBuilder.prototype.addNote = function(model) {
          return ("insert into Notes (" + this.TEXT + "," + this.ID + ",") + ("" + this.TIMESTAMP + "," + this.STATUS + ", " + this.STASH + ", " + this.STASH_BOOL + ", ") + ("" + this.CREATOR + ", " + this.CREATED_AT + ", " + this.RECOMMENDATION + ")") + (" values (?,'" + (this._getID(model)) + "',") + ("'" + (this._get(model, this.TIMESTAMP)) + "',") + (" '" + (this._get(model, this.STATUS)) + "',") + ("'" + (JSON.stringify(this._getStashField(model))) + "',") + ("'" + (this._getStashBool(model)) + "',") + ("'" + model[this.CREATOR] + "',") + ("'" + (this._getCreatedAt(model)) + "',") + ("'" + (this._getRecommendation(model)) + "')");
        };

        QueryBuilder.prototype._getCreatedAt = function(model) {
          var _this = this;
          return model[this.CREATED_AT] || (function() {
            if (model._kmd) {
              return model._kmd.ect;
            } else {
              return model[_this.TIMESTAMP];
            }
          })();
        };

        QueryBuilder.prototype._getRecommendation = function(model) {
          return model[this.RECOMMENDATION] || 'none';
        };

        QueryBuilder.prototype._getStashField = function(model) {
          var _this = this;
          return model[this.STASH] || (function() {
            var stashObject;
            stashObject = {};
            stashObject[_this.currentUserId] = false;
            return stashObject;
          })();
        };

        QueryBuilder.prototype._getStashBool = function(model) {
          return Boolean(model[this.STASH] && model[this.STASH][this.currentUserId]);
        };

        QueryBuilder.prototype.updateNote = function(model, cleaning) {
          if (cleaning == null) {
            cleaning = false;
          }
          return this._baseUpdateQuery(model, cleaning);
        };

        QueryBuilder.prototype.cleanUpdatedNote = function(model) {
          return this._baseUpdateQuery(model, true);
        };

        QueryBuilder.prototype.deleteNote = function(model) {
          return "delete from Notes where " + this._determineProperIdQuery(model);
        };

        QueryBuilder.prototype.fetchSingleNote = function(model) {
          return "select * from notes where " + this.ID + "='" + (this._getID(model)) + "'";
        };

        QueryBuilder.prototype.fetchNotes = function(args) {
          var limit, skip;
          if (args == null) {
            args = {};
          }
          utils.defaults(args, {
            hashtags: [],
            attags: [],
            skip: 0,
            limit: 25,
            dirty: false
          });
          skip = args.skip, limit = args.limit;
          return "select * from Notes " + this._whereClause(args) + (" order by " + this.TIMESTAMP + " desc ") + (" limit " + skip + "," + (skip + limit) + ";");
        };

        QueryBuilder.prototype.countNotes = function(args) {
          if (args == null) {
            args = {};
          }
          utils.defaults(args, {
            hashtags: [],
            attags: []
          });
          return ("select count(" + this.ID + ") as count ") + "from Notes " + this._whereClause(args);
        };

        QueryBuilder.prototype.fetchTags = function(args) {
          if (args == null) {
            args = {};
          }
          args.type = 'hashtags';
          return this._getEntities(args);
        };

        QueryBuilder.prototype.fetchContacts = function(args) {
          if (args == null) {
            args = {};
          }
          args.type = 'attags';
          return this._getEntities(args);
        };

        QueryBuilder.prototype.removeNotesEntities = function(models) {
          var note, queryArrays;
          queryArrays = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = models.length; _i < _len; _i++) {
              note = models[_i];
              _results.push(this._buildRemoveEntitiesArray(note[this.LOCAL_ID]));
            }
            return _results;
          }).call(this);
          return utils.flatten(queryArrays);
        };

        QueryBuilder.prototype._buildRemoveEntitiesArray = function(id) {
          var tableName, _i, _len, _ref, _results;
          _ref = utils.values(this.database.TABLE_NAMES).slice(1);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tableName = _ref[_i];
            _results.push(this._makeCrudObject("delete from " + tableName + " where " + this.LOCAL_ID + "=" + id));
          }
          return _results;
        };

        QueryBuilder.prototype._makeCrudObject = function(query) {
          return {
            query: query,
            args: []
          };
        };

        QueryBuilder.prototype.addNotesEntities = function(models) {
          var note, queryArrays;
          queryArrays = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = models.length; _i < _len; _i++) {
              note = models[_i];
              _results.push(this._buildAddEntitiesArray(utils.findEntities(note[this.TEXT]), note[this.LOCAL_ID]));
            }
            return _results;
          }).call(this);
          return utils.flatten(queryArrays);
        };

        QueryBuilder.prototype._buildAddEntitiesArray = function(entities, id) {
          var entName, entity, queryArrays;
          queryArrays = (function() {
            var _i, _len, _ref, _results;
            _ref = Object.keys(entities);
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entName = _ref[_i];
              _results.push((function() {
                var _j, _len1, _ref1, _results1;
                _ref1 = entities[entName];
                _results1 = [];
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  entity = _ref1[_j];
                  _results1.push({
                    query: ("insert into " + this.database.TABLE_NAMES[entName] + " ") + ("(" + this.LOCAL_ID + " , " + entName + ") values (" + id + ",'" + (entName !== 'urls' ? entity.toLowerCase() : entity) + "')"),
                    args: []
                  });
                }
                return _results1;
              }).call(this));
            }
            return _results;
          }).call(this);
          return queryArrays;
        };

        QueryBuilder.prototype._getEntities = function(args) {
          if (args == null) {
            args = {};
          }
          args = utils.clone(args);
          args = this._sanitizeTagQueryArgs(args);
          utils.defaults(args, {
            hashtags: [],
            attags: [],
            type: 'hashtags'
          });
          return this._buildTagsQuery(args);
        };

        QueryBuilder.prototype._buildTagsQuery = function(args) {
          return ("select distinct " + args.type + " as name, count(" + args.type + ") as count") + (" from " + this.database.TABLE_NAMES[args.type] + " ") + this._whereClause(args) + (" group by " + args.type + ";");
        };

        QueryBuilder.prototype._sanitizeTagQueryArgs = function(args) {
          var attags, error, hashtags, success, type;
          attags = args.attags, hashtags = args.hashtags, type = args.type, success = args.success, error = args.error;
          return {
            attags: attags,
            hashtags: hashtags,
            type: type,
            success: success,
            error: error
          };
        };

        QueryBuilder.prototype._sanitizeModel = function(model) {
          var property, results, safe, _i, _len;
          safe = [this.TEXT, this.TIMESTAMP, this.ID, this.STATUS, this.STASH, this.LOCAL_ID, this.CREATOR, this.CREATED_AT, this.RECOMMENDATION];
          results = {};
          for (_i = 0, _len = safe.length; _i < _len; _i++) {
            property = safe[_i];
            if (model[property]) {
              results[property] = model[property];
            }
          }
          return results;
        };

        QueryBuilder.prototype._baseUpdateQuery = function(model, cleaning) {
          var key, pairStrings, result, value;
          model = this._sanitizeModel(model);
          pairStrings = (function() {
            var _results;
            _results = [];
            for (key in model) {
              value = model[key];
              if (key === this.TEXT) {
                _results.push("" + this.TEXT + "=?, ");
              } else if (key === this.STASH) {
                _results.push(("" + key + "='" + (JSON.stringify(value)) + "', ") + ("" + this.STASH_BOOL + "='" + (this._getStashBool(model)) + "', "));
              } else if (key === this.RECOMMENDATION) {
                _results.push("" + key + "='" + (this._getRecommendation(model)) + "', ");
              } else if (key === this.CREATED_AT) {
                _results.push("" + key + "='" + (this._getCreatedAt(model)) + "', ");
              } else if (key !== this.LOCAL_ID) {
                _results.push("" + key + "='" + value + "', ");
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }).call(this);
          result = "update Notes set " + pairStrings.join(' ').slice(0, -3) + " where " + (cleaning ? " " + this.LOCAL_ID + "='" + (this._get(model, this.LOCAL_ID)) + "'" : this._determineProperIdQuery(model));
          return result;
        };

        QueryBuilder.prototype._determineProperIdQuery = function(model) {
          if (!model[this.ID]) {
            return " " + this.LOCAL_ID + "='" + (this._get(model, this.LOCAL_ID)) + "'";
          } else {
            return " " + this.ID + "='" + (this._get(model, this.ID)) + "'";
          }
        };

        QueryBuilder.prototype._getID = function(model) {
          return model[this.ID] || model['_id'];
        };

        QueryBuilder.prototype._get = function(model, field) {
          if (model.get) {
            return model.get(field);
          } else if (field === this.STASH_BOOL) {
            return Boolean(model[this.STASH] && model[this.STASH][this.currentUserId]);
          } else {
            return model[field];
          }
        };

        QueryBuilder.prototype._whereClause = function(args) {
          var attags, clauses, dirty, hashtags, search, stashed;
          hashtags = args.hashtags, attags = args.attags, search = args.search, dirty = args.dirty, stashed = args.stashed;
          clauses = utils.compact([(hashtags.length || attags.length ? " " + this.database.LOC_COL + " in (" + (this._buildFilterQuery(hashtags, attags)) + ")" : ''), (search ? this._searchStatement(search) : ''), (dirty === true ? " " + this.database.STATUS_COL + " != 'synced' " : ''), (dirty === false ? " " + this.database.STATUS_COL + " != 'delete' " : ''), (stashed != null ? "" + this.STASH_BOOL + " == '" + stashed + "'" : '')]);
          if (!!clauses.length) {
            return 'where ' + clauses.join(' and ');
          } else {
            return '';
          }
        };

        QueryBuilder.prototype._searchStatement = function(search) {
          var term;
          if (!angular.isArray(search)) {
            search = [search];
          }
          return ((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = search.length; _i < _len; _i++) {
              term = search[_i];
              _results.push(" " + this.database.TEXT_COL + " like '%" + term + "%' collate nocase ");
            }
            return _results;
          }).call(this)).join(' and ');
        };

        QueryBuilder.prototype._buildFilterQuery = function(hashtags, attags) {
          var item, name, queries, tags, _i, _len, _ref;
          tags = {
            hashtags: this._prependCharacter(hashtags, '#'),
            attags: this._prependCharacter(attags, '@')
          };
          queries = {};
          _ref = Object.keys(tags);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            name = _ref[_i];
            queries[name] = (function() {
              var _j, _len1, _ref1, _results;
              _ref1 = tags[name];
              _results = [];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                item = _ref1[_j];
                _results.push("select distinct " + this.database.LOC_COL + " from " + this.database.TABLE_NAMES[name] + " where " + name + " == '" + item + "'");
              }
              return _results;
            }).call(this);
          }
          return utils.compact([queries.hashtags.join(' intersect '), queries.attags.join(' intersect ')]).join(' intersect ');
        };

        QueryBuilder.prototype._prependCharacter = function(array, character) {
          return array.map(function(str) {
            if (str[0] === character) {
              return str;
            } else {
              return character + str;
            }
          });
        };

        return QueryBuilder;

      })();
      return new QueryBuilder(dbLiterals);
    }
  ]);

  angular.module('$app.services').service('testingUtilities', [
    '$utils', function(utils) {
      var badFindOneWhere, badFindWhere, checkContains, curriedFindWhere, fakeID, newLocalID, notes, pickRandom, randomStashStuff;
      newLocalID = (function() {
        var i;
        i = 0;
        return function() {
          return ++i;
        };
      })();
      badFindWhere = function(array, key, value) {
        var item, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          item = array[_i];
          if (item[key] === value) {
            _results.push(item);
          }
        }
        return _results;
      };
      badFindOneWhere = function(array, key, value) {
        return pickRandom(badFindWhere(array, key, value));
      };
      pickRandom = function(list, howMany) {
        var length;
        if (howMany) {
          return utils.shuffle(list).slice(0, howMany);
        } else {
          length = list.length;
          return list[Math.floor(Math.random() * length)];
        }
      };
      curriedFindWhere = function(value) {
        return badFindWhere(notes, 'status', value);
      };
      checkContains = function(query, toCheck) {
        var substring, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = toCheck.length; _i < _len; _i++) {
          substring = toCheck[_i];
          _results.push(expect(query).toContain(substring));
        }
        return _results;
      };
      fakeID = "theFakestID";
      randomStashStuff = function() {
        var i, result, sharedWith, _i;
        result = {};
        sharedWith = pickRandom([1, 2]);
        for (i = _i = 0; 0 <= sharedWith ? _i <= sharedWith : _i >= sharedWith; i = 0 <= sharedWith ? ++_i : --_i) {
          result[Math.random().toString(36).substring(2)] = pickRandom([true, false]);
        }
        result[fakeID] = pickRandom([true, false]);
        return result;
      };
      notes = [
        {
          "text": "#read",
          "timestamp": "2013-06-26T16:34:43.411Z",
          "id": "51cb180fa44abded6100b4f6",
          "status": "update",
          "localID": 1
        }, {
          "text": "#fetchnotes #personal @foobar matt fjdfg #todo #personal #personal - via @foo #todo #personal #personal #personalized #personal #todo hello #todo #personal Hello #thwre #fetchnotes",
          "timestamp": "2013-06-26T16:19:38.623Z",
          "unsubscribed": ["5142155ae457085304022fd8"],
          "id": "51c38694d2e4b4ff6801ad2a",
          "status": "update",
          "localID": 2
        }, {
          "text": "#fetchnotes Hello thee \n\n\n\n\n\nShaken #personal hello there \n\nDhaka\nSkalds\nD #personal",
          "timestamp": "2013-06-20T22:39:46.218Z",
          "id": "51c38474d2e4b4ff6801acc6",
          "status": "update",
          "localID": 3
        }, {
          "text": "#personal Hsia\nD\nD\nD\nSds\nDd\n\nD #personal Shelly",
          "timestamp": "2013-06-20T22:38:53.402Z",
          "id": "51c3847ed2e4b4ff6801acc7",
          "status": "synced",
          "localID": 4
        }, {
          "text": "#todo #personal #fetchnotes #read @boobs - via @foo",
          "timestamp": "2013-06-20T22:38:17.898Z",
          "id": "51c3845ad2e4b4ff6801acb3",
          "status": "synced",
          "localID": 5
        }, {
          "text": "#fetchnotes #personal #todo  http://iam.bradleymanning.org/",
          "timestamp": "2013-06-20T22:37:41.819Z",
          "id": "51c38436d2e4b4ff6801aca6",
          "status": "update",
          "localID": 6
        }, {
          "text": "#fetchnotes #personal #todo #fetchnotes",
          "timestamp": "2013-06-20T22:37:34.508Z",
          "id": "51c3842fd2e4b4ff6801aca5",
          "status": "update",
          "localID": 7
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-20T22:37:24.487Z",
          "id": "51c38425d2e4b4ff6801aca4",
          "status": "delete",
          "localID": 8
        }, {
          "text": "#todo #",
          "timestamp": "2013-06-20T22:37:15.745Z",
          "id": "51c3841cd2e4b4ff6801aca3",
          "status": "update",
          "localID": 9
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-20T22:37:12.433Z",
          "id": "51c38419d2e4b4ff6801aca2",
          "status": "synced",
          "localID": 10
        }, {
          "text": "#UVB #fetchnotes @foobar #fetchnotes #fetchnotes #personal @boobs - via @foo",
          "timestamp": "2013-06-20T22:37:07.122Z",
          "id": "51c38414d2e4b4ff6801aca1",
          "status": "update",
          "localID": 11
        }, {
          "text": "#todo @boobs @boobs @matt @foobar @foobar #personal Tuf - via @foo",
          "timestamp": "2013-06-20T22:36:54.241Z",
          "id": "51c38407d2e4b4ff6801aca0",
          "status": "update",
          "localID": 12
        }, {
          "text": "#personal Hello ther @hsjsksksksk disks disks sis diss\nD\nS\nD\nS\nAssisi #personal #hello #personal hello skids #fetchnotes Hsia\nDhaka\n#todo Isis\nDisk #todo",
          "timestamp": "2013-06-20T22:36:36.530Z",
          "id": "51c383f5d2e4b4ff6801ac9f",
          "status": "update",
          "localID": 13
        }, {
          "text": "@boobs hello @matt @boobs @foobar @boobs #personal #todo #personal #fetchnotes #todo #personal #personal hhsldlkss disks js\n\n\nShsksj #hotdogs hello there #fetchnotes #todo hello there #fetchnotes hell - via @foo",
          "timestamp": "2013-06-20T22:34:26.575Z",
          "id": "51c38374d2e4b4ff6801ac9c",
          "status": "create",
          "localID": 14
        }, {
          "text": "#personal Hello ther e @matt #todo #personal #fetchnotes #read #todo #personal #fetchnotes #todo hello ther - via @foo\n\n\nHejskss #personalized hello #personal\nHello there #personal #personal #todo",
          "timestamp": "2013-06-20T22:25:52.525Z",
          "id": "51c3814ad2e4b4ff6801ac88",
          "status": "create",
          "localID": 15
        }, {
          "text": "#fetchnotes #todo #todo cash #todo",
          "timestamp": "2013-06-20T22:16:23.014Z",
          "id": "51c37f38d2e4b4ff6801ac6f",
          "status": "synced",
          "localID": 16
        }, {
          "text": "#personal #todo @matt @boobs @matt @foobar @matt #personal #personal #fetchnotes - via @foo",
          "timestamp": "2013-06-20T22:01:35.054Z",
          "id": "51c37bbbd2e4b4ff6801ac2c",
          "status": "synced",
          "localID": 17
        }, {
          "text": "#personal #personal #personal #todo #todo",
          "timestamp": "2013-06-20T21:51:21.346Z",
          "id": "51c3795ad2e4b4ff6801abf7",
          "status": "create",
          "localID": 18
        }, {
          "text": "#personal @boobs #todo @matt #personal #personal #personal #personal #personal #personal #fetchnotes #p #ersonal #personal # #personalized #fetchnotes #personal #personal #personal #personal #personal - via @foo",
          "timestamp": "2013-06-20T21:51:14.087Z",
          "id": "51c37953d2e4b4ff6801abf6",
          "status": "update",
          "localID": 19
        }, {
          "text": "@foobar @boobs @matt - via @foo",
          "timestamp": "2013-06-20T21:50:28.544Z",
          "id": "51c37925d2e4b4ff6801abf5",
          "status": "synced",
          "localID": 20
        }, {
          "text": "@boobs @matt @foobar #personal @matt - via @foo",
          "timestamp": "2013-06-20T21:50:21.778Z",
          "id": "51c3791ed2e4b4ff6801abf4",
          "status": "create",
          "localID": 21
        }, {
          "text": "#personal #todo #fetchnotes #personal @boobs @foobar - via @foo",
          "timestamp": "2013-06-20T21:50:08.009Z",
          "id": "51c37911d2e4b4ff6801abf0",
          "status": "create",
          "localID": 22
        }, {
          "text": "#personal",
          "timestamp": "2013-06-20T21:49:40.722Z",
          "id": "51c378f5d2e4b4ff6801abef",
          "status": "update",
          "localID": 23
        }, {
          "text": "#todo",
          "timestamp": "2013-06-20T21:49:31.979Z",
          "id": "51c378edd2e4b4ff6801abee",
          "status": "synced",
          "localID": 24
        }, {
          "text": "#todo #personal #fetchnotes #todo #read",
          "timestamp": "2013-06-20T21:49:16.628Z",
          "id": "51c378cbd2e4b4ff6801abec",
          "status": "delete",
          "localID": 25
        }, {
          "text": "#fetchnotes #todo #personal",
          "timestamp": "2013-06-20T21:47:27.319Z",
          "id": "51c37870d2e4b4ff6801abe3",
          "status": "synced",
          "localID": 26
        }, {
          "text": "#personal",
          "timestamp": "2013-06-20T21:47:14.636Z",
          "id": "51c37863d2e4b4ff6801abe0",
          "status": "delete",
          "localID": 27
        }, {
          "text": "@boobs #personal - via @foo",
          "timestamp": "2013-06-20T21:32:06.360Z",
          "id": "51c374d7d2e4b4ff6801ab9e",
          "status": "update",
          "localID": 28
        }, {
          "text": "#personal #todo #todo #fetchnotes #personal @boobs @boobs @matt @foobar - via @foo",
          "timestamp": "2013-06-20T21:31:59.793Z",
          "id": "51c374d0d2e4b4ff6801ab9d",
          "status": "update",
          "localID": 29
        }, {
          "text": "#personal #todo #personal",
          "timestamp": "2013-06-20T21:31:26.549Z",
          "id": "51c374afd2e4b4ff6801ab9c",
          "status": "synced",
          "localID": 30
        }, {
          "text": "#personal #todo #fetchnotes #personal #fetchnotes #read #personal #personal #todo #todo #personal #personal",
          "timestamp": "2013-06-20T21:31:16.663Z",
          "id": "51c374a6d2e4b4ff6801ab9b",
          "status": "create",
          "localID": 31
        }, {
          "text": "Ass butts",
          "timestamp": "2013-06-19T23:53:55.228Z",
          "id": "51c2445debbcd3881e007109",
          "status": "synced",
          "localID": 32
        }, {
          "text": "more butts",
          "timestamp": "2013-06-19T21:52:57.894Z",
          "id": "51c2286bd2e4b4ff68000170",
          "status": "delete",
          "localID": 33
        }, {
          "text": "more butts",
          "timestamp": "2013-06-19T21:52:57.894Z",
          "id": "51c2283ad2e4b4ff6800016f",
          "status": "update",
          "localID": 34
        }, {
          "text": "a note",
          "timestamp": "2013-06-19T21:52:34.080Z",
          "id": "51c22822d2e4b4ff6800016e",
          "status": "update",
          "localID": 35
        }, {
          "text": "butts",
          "timestamp": "2013-06-19T21:51:07.274Z",
          "id": "51c227cbebbcd3881e000172",
          "status": "delete",
          "localID": 36
        }, {
          "text": "What",
          "timestamp": "2013-06-19T16:11:30.050Z",
          "id": "51c1d8359c1f610117055ff4",
          "status": "create",
          "localID": 37
        }, {
          "text": "#plate alexh save needs to mirror - via @foo",
          "timestamp": "2013-06-19T16:09:27.963Z",
          "unsubscribed": ["517a0567c489853505049546"],
          "id": "51bf3aa19c1f61011700d0de",
          "status": "update",
          "localID": 38
        }, {
          "text": "#pics http://i.imgur.com/KQUV3S0.jpg",
          "timestamp": "2013-06-18T23:20:41.548Z",
          "id": "51c0eb4ae13c22157500f68c",
          "status": "synced",
          "localID": 39
        }, {
          "text": "#iwant to go the takes. Hello my friend. Hel",
          "timestamp": "2013-06-18T22:44:51.054Z",
          "id": "51c0e2e49c1f61011701b771",
          "status": "update",
          "localID": 40
        }, {
          "text": "#goodby",
          "timestamp": "2013-06-18T22:44:16.679Z",
          "id": "51c0e2c19c1f61011701b770",
          "status": "update",
          "localID": 41
        }, {
          "text": "#todonow todonow I have so many friends right now I want to grab #milkfr #fromthe milk store",
          "timestamp": "2013-06-18T22:44:05.785Z",
          "id": "51c0e2b69c1f61011701b76f",
          "status": "update",
          "localID": 42
        }, {
          "text": "#T",
          "timestamp": "2013-06-18T22:43:18.188Z",
          "id": "51c0e2869c1f61011701b76d",
          "status": "create",
          "localID": 43
        }, {
          "text": "#",
          "timestamp": "2013-06-18T22:43:12.768Z",
          "id": "51c0e2819c1f61011701b76c",
          "status": "create",
          "localID": 44
        }, {
          "text": "#",
          "timestamp": "2013-06-18T22:41:29.978Z",
          "id": "51c0e21a9c1f61011701b76a",
          "status": "delete",
          "localID": 45
        }, {
          "text": "#goodbyenow #hellothere hellothere what's up #whatsup",
          "timestamp": "2013-06-18T22:41:22.388Z",
          "id": "51c0e2139c1f61011701b769",
          "status": "synced",
          "localID": 46
        }, {
          "text": "##",
          "timestamp": "2013-06-18T22:40:48.110Z",
          "id": "51c0e1f09c1f61011701b768",
          "status": "update",
          "localID": 47
        }, {
          "text": "#Todo #hellomother why hellomother  hit here #hit here #hithere #hellothe",
          "timestamp": "2013-06-18T22:40:41.428Z",
          "id": "51c0e1ea9c1f61011701b767",
          "status": "delete",
          "localID": 48
        }, {
          "text": "#blastea blastea",
          "timestamp": "2013-06-18T22:39:41.926Z",
          "id": "51c0e1ae9c1f61011701b764",
          "status": "create",
          "localID": 49
        }, {
          "text": "#",
          "timestamp": "2013-06-18T22:39:18.675Z",
          "id": "51c0e1979c1f61011701b762",
          "status": "create",
          "localID": 50
        }, {
          "text": "#motherf mothers mothers #mothera mothera",
          "timestamp": "2013-06-18T22:39:06.297Z",
          "id": "51c0e18b9c1f61011701b761",
          "status": "create",
          "localID": 51
        }, {
          "text": "#",
          "timestamp": "2013-06-18T22:36:39.579Z",
          "id": "51c0e0f89c1f61011701b75d",
          "status": "create",
          "localID": 52
        }, {
          "text": "#",
          "timestamp": "2013-06-18T22:29:25.532Z",
          "id": "51c0df469c1f61011701b751",
          "status": "synced",
          "localID": 53
        }, {
          "text": "Hello. #helli. Hello #Yogo #peoplr",
          "timestamp": "2013-06-18T22:23:34.442Z",
          "id": "51c0dde79c1f61011701b74b",
          "status": "create",
          "localID": 54
        }, {
          "text": "#",
          "timestamp": "2013-06-18T00:44:15.899Z",
          "id": "51bfad5f9c1f61011700db24",
          "status": "update",
          "localID": 55
        }, {
          "text": "Hello. Roger. #personal #todo",
          "timestamp": "2013-06-18T00:44:06.583Z",
          "id": "51bfad579c1f61011700db23",
          "status": "create",
          "localID": 56
        }, {
          "text": "The what. Hello hell",
          "timestamp": "2013-06-18T00:40:39.269Z",
          "id": "51bfac869c1f61011700db21",
          "status": "create",
          "localID": 57
        }, {
          "text": "#personal",
          "timestamp": "2013-06-18T00:38:54.554Z",
          "id": "51bfac1e9c1f61011700db1f",
          "status": "update",
          "localID": 58
        }, {
          "text": "the . the",
          "timestamp": "2013-06-18T00:22:42.515Z",
          "id": "51bfa8419c1f61011700da8d",
          "status": "update",
          "localID": 59
        }, {
          "text": "hello this is what i want helli #. please work. what the hell",
          "timestamp": "2013-06-18T00:21:59.711Z",
          "id": "51bfa8179c1f61011700da8b",
          "status": "synced",
          "localID": 60
        }, {
          "text": "#personal Ryan",
          "timestamp": "2013-06-17T23:36:21.561Z",
          "id": "51bf9d759c1f61011700d9c1",
          "status": "create",
          "localID": 61
        }, {
          "text": "#hello",
          "timestamp": "2013-06-17T23:23:29.057Z",
          "id": "51bf9a609c1f61011700d9ae",
          "status": "synced",
          "localID": 62
        }, {
          "text": "#tod help #tod",
          "timestamp": "2013-06-17T23:22:48.306Z",
          "id": "51bf9a379c1f61011700d9ac",
          "status": "update",
          "localID": 63
        }, {
          "text": "#todo help type #here #here",
          "timestamp": "2013-06-17T23:21:36.311Z",
          "id": "51bf99f09476845565010333",
          "status": "synced",
          "localID": 64
        }, {
          "text": "#todo hello",
          "timestamp": "2013-06-17T21:22:39.259Z",
          "id": "51bf7e0e9c1f61011700d8b9",
          "status": "synced",
          "localID": 65
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T21:22:18.120Z",
          "id": "51bf7dfa9476845565010239",
          "status": "synced",
          "localID": 66
        }, {
          "text": "#personal c help # #dopesauce",
          "timestamp": "2013-06-17T21:04:44.682Z",
          "id": "51bf79ed9c1f61011700d82d",
          "status": "delete",
          "localID": 67
        }, {
          "text": "# @todo",
          "timestamp": "2013-06-17T21:04:29.295Z",
          "id": "51bf79de9c1f61011700d82c",
          "status": "synced",
          "localID": 68
        }, {
          "text": "#personal",
          "timestamp": "2013-06-17T21:00:41.258Z",
          "id": "51bf78fa9c1f61011700d7fc",
          "status": "delete",
          "localID": 69
        }, {
          "text": "#todo grab milk from #store with John and mike k  jok @ @ey.",
          "timestamp": "2013-06-17T21:00:38.160Z",
          "id": "51bf78f79c1f61011700d7fb",
          "status": "update",
          "localID": 70
        }, {
          "text": "#todo gra",
          "timestamp": "2013-06-17T20:59:36.429Z",
          "id": "51bf78b99c1f61011700d7f7",
          "status": "create",
          "localID": 71
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:58:09.662Z",
          "id": "51bf78639c1f61011700d7e9",
          "status": "update",
          "localID": 72
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-17T20:56:25.269Z",
          "id": "51bf77fa9c1f61011700d7d6",
          "status": "update",
          "localID": 73
        }, {
          "text": "#personal",
          "timestamp": "2013-06-17T20:56:20.161Z",
          "id": "51bf77f59c1f61011700d7d5",
          "status": "create",
          "localID": 74
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:56:16.258Z",
          "id": "51bf77f19c1f61011700d7d4",
          "status": "delete",
          "localID": 75
        }, {
          "text": "#personal",
          "timestamp": "2013-06-17T20:56:12.816Z",
          "id": "51bf77ee9c1f61011700d7d3",
          "status": "update",
          "localID": 76
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:56:08.353Z",
          "id": "51bf77e99c1f61011700d7d2",
          "status": "create",
          "localID": 77
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-17T20:56:01.770Z",
          "id": "51bf77e39c1f61011700d7d1",
          "status": "delete",
          "localID": 78
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:55:57.690Z",
          "id": "51bf77de9c1f61011700d7d0",
          "status": "create",
          "localID": 79
        }, {
          "text": "#personal",
          "timestamp": "2013-06-17T20:55:50.491Z",
          "id": "51bf77d79c1f61011700d7cf",
          "status": "synced",
          "localID": 80
        }, {
          "text": "#type hero #perso",
          "timestamp": "2013-06-17T20:55:35.276Z",
          "id": "51bf77c89c1f61011700d7ce",
          "status": "create",
          "localID": 81
        }, {
          "text": "ds",
          "timestamp": "2013-06-17T20:55:46.089Z",
          "id": "51bf77c1947684556501020c",
          "status": "delete",
          "localID": 82
        }, {
          "text": "#",
          "timestamp": "2013-06-17T20:54:53.237Z",
          "id": "51bf778d9476845565010208",
          "status": "synced",
          "localID": 83
        }, {
          "text": "#",
          "timestamp": "2013-06-17T20:53:36.715Z",
          "id": "51bf77409476845565010205",
          "status": "synced",
          "localID": 84
        }, {
          "text": "#",
          "timestamp": "2013-06-17T20:51:30.989Z",
          "id": "51bf76d49c1f61011700d7c6",
          "status": "create",
          "localID": 85
        }, {
          "text": "#per help #fetchnotes",
          "timestamp": "2013-06-17T20:51:12.466Z",
          "id": "51bf76c29c1f61011700d7c5",
          "status": "create",
          "localID": 86
        }, {
          "text": "#fetchnotes #fetchnotes #fetchnotesghetto",
          "timestamp": "2013-06-17T20:48:25.726Z",
          "id": "51bf760894768455650101f7",
          "status": "synced",
          "localID": 87
        }, {
          "text": "#read hello #read #read #personal #completed yesc",
          "timestamp": "2013-06-17T20:46:57.445Z",
          "id": "51bf75b094768455650101d0",
          "status": "synced",
          "localID": 88
        }, {
          "text": "#read todo whaaa #fetchnotes",
          "timestamp": "2013-06-17T20:46:01.707Z",
          "id": "51bf757894768455650101cd",
          "status": "synced",
          "localID": 89
        }, {
          "text": "#todo asdfasdf #fetchnotes",
          "timestamp": "2013-06-17T20:24:47.953Z",
          "id": "51bf707f947684556500fd27",
          "status": "synced",
          "localID": 90
        }, {
          "text": "#fetchnotes je;;p asldjfkjasldk #read alksjdlfjsdl #fetchnotesghetto dfg #",
          "timestamp": "2013-06-17T20:22:12.065Z",
          "id": "51bf6fe3947684556500fd0c",
          "status": "delete",
          "localID": 91
        }, {
          "text": "#personalized",
          "timestamp": "2013-06-17T20:20:21.731Z",
          "id": "51bf6f75947684556500fd07",
          "status": "synced",
          "localID": 92
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:12:00.643Z",
          "id": "51bf6d7f947684556500fcf7",
          "status": "delete",
          "localID": 93
        }, {
          "text": "#personal",
          "timestamp": "2013-06-17T20:11:50.506Z",
          "id": "51bf6d75947684556500fcf6",
          "status": "delete",
          "localID": 94
        }, {
          "text": "#todo hello #persona #personalized",
          "timestamp": "2013-06-17T20:11:34.982Z",
          "id": "51bf6d66947684556500fcf5",
          "status": "delete",
          "localID": 95
        }, {
          "text": "#fetchnotesghetto",
          "timestamp": "2013-06-17T20:07:00.540Z",
          "id": "51bf6c53947684556500fb89",
          "status": "synced",
          "localID": 96
        }, {
          "text": "#todo #fetchnotesghetto #",
          "timestamp": "2013-06-17T20:06:50.527Z",
          "id": "51bf6c49947684556500fb80",
          "status": "update",
          "localID": 97
        }, {
          "text": "# #fetchnotes",
          "timestamp": "2013-06-17T20:05:33.085Z",
          "id": "51bf6bfc947684556500fb79",
          "status": "create",
          "localID": 98
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:02:36.160Z",
          "id": "51bf6b4b947684556500fb74",
          "status": "create",
          "localID": 99
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:01:28.185Z",
          "id": "51bf6b07947684556500fb72",
          "status": "create",
          "localID": 100
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T20:01:13.661Z",
          "id": "51bf6af8947684556500fb71",
          "status": "update",
          "localID": 101
        }, {
          "text": "hello thete",
          "timestamp": "2013-06-17T19:52:45.881Z",
          "id": "51bf690f9c1f61011700d221",
          "status": "synced",
          "localID": 102
        }, {
          "text": "#todo",
          "timestamp": "2013-06-17T19:52:39.460Z",
          "id": "51bf69089c1f61011700d220",
          "status": "synced",
          "localID": 103
        }, {
          "text": "#todo hello hi there buddy @boobs - via @foo",
          "timestamp": "2013-06-17T19:52:22.082Z",
          "id": "51bf68f79c1f61011700d21f",
          "status": "synced",
          "localID": 104
        }, {
          "text": "#plate change height autocomplete shrinkage on text area 2",
          "timestamp": "2013-06-17T19:43:09.711Z",
          "id": "51bf61e99c1f61011700d1f2",
          "status": "synced",
          "localID": 105
        }, {
          "text": "#",
          "timestamp": "2013-06-17T19:41:13.129Z",
          "id": "51bf6648947684556500fb50",
          "status": "update",
          "localID": 106
        }, {
          "text": "asfasdf",
          "timestamp": "2013-06-17T19:41:09.882Z",
          "id": "51bf6644947684556500fb4f",
          "status": "synced",
          "localID": 107
        }, {
          "text": "#todo asdfa",
          "timestamp": "2013-06-17T19:41:08.009Z",
          "id": "51bf607e9c1f61011700d1e2",
          "status": "update",
          "localID": 108
        }, {
          "text": "#personal",
          "timestamp": "2013-06-17T19:39:43.778Z",
          "id": "51bf65ee947684556500fb4e",
          "status": "synced",
          "localID": 109
        }, {
          "text": "#plate editing a tag applies that change to the end of the notr",
          "timestamp": "2013-06-17T19:20:30.851Z",
          "id": "51bf61809c1f61011700d1ee",
          "status": "update",
          "localID": 110
        }, {
          "text": "#plate hash and at buttons don't show until letter and space after tag",
          "timestamp": "2013-06-17T19:19:44.077Z",
          "id": "51bf61519c1f61011700d1e8",
          "status": "synced",
          "localID": 111
        }, {
          "text": "#plate remove the form assist",
          "timestamp": "2013-06-17T19:18:29.334Z",
          "id": "51bf61069c1f61011700d1e5",
          "status": "synced",
          "localID": 112
        }, {
          "text": "#tod hello hi there #personalized",
          "timestamp": "2013-06-17T19:18:17.575Z",
          "id": "51bf60fb9c1f61011700d1e4",
          "status": "create",
          "localID": 113
        }, {
          "text": "#personalized hello hi there.",
          "timestamp": "2013-06-17T19:05:12.859Z",
          "id": "51bf5dea9c1f61011700d1c6",
          "status": "delete",
          "localID": 114
        }, {
          "text": "#hello #todo hello whatcha doing",
          "timestamp": "2013-06-17T18:46:28.584Z",
          "id": "51bf5974947684556500faa6",
          "status": "create",
          "localID": 115
        }, {
          "text": "@alex @alexh\n1. mentorship - 5-10 ppl Bob Mason - transitions -\n2. vesting schedule transperancy\n3. technical level - how, goals, what do you want to learn - technical goals - send you to class etc. - via @foo\n4. meetup with codeship\n5. google doc on what you want to learn",
          "timestamp": "2013-06-17T16:36:08.299Z",
          "id": "51bf38ca947684556500f97b",
          "status": "delete",
          "localID": 116
        }, {
          "text": "hj #grocery geh #personal g h",
          "timestamp": "2013-06-17T14:48:49.969Z",
          "id": "51bf20d39c1f61011700cfce",
          "status": "synced",
          "localID": 117
        }, {
          "text": "#read hello #fetchnotes hello whattt",
          "timestamp": "2013-06-17T14:38:33.730Z",
          "id": "51bf1f6c9c1f61011700cfc8",
          "status": "delete",
          "localID": 118
        }, {
          "text": "#todo hello this is dope #oh yeah this will work #todo at this #read my shit",
          "timestamp": "2013-06-14T23:59:04.603Z",
          "id": "51bbae399476845565001f44",
          "status": "update",
          "localID": 119
        }, {
          "text": "#todo",
          "timestamp": "2013-06-14T23:58:34.332Z",
          "id": "51bbae1b9476845565001f43",
          "status": "create",
          "localID": 120
        }, {
          "text": "#t",
          "timestamp": "2013-06-14T23:58:13.063Z",
          "id": "51bbae069476845565001f42",
          "status": "create",
          "localID": 121
        }, {
          "text": "#",
          "timestamp": "2013-06-14T23:52:10.870Z",
          "id": "51bbac9c9c1f610117001ea3",
          "status": "create",
          "localID": 122
        }, {
          "text": "#todo",
          "timestamp": "2013-06-14T23:45:04.994Z",
          "id": "51bba74b9476845565001ee3",
          "status": "delete",
          "localID": 123
        }, {
          "text": "#",
          "timestamp": "2013-06-14T23:26:07.787Z",
          "id": "51bba6809c1f610117001e2b",
          "status": "delete",
          "localID": 124
        }, {
          "text": "#",
          "timestamp": "2013-06-14T23:25:52.468Z",
          "id": "51bba6729476845565001ed7",
          "status": "delete",
          "localID": 125
        }, {
          "text": "#",
          "timestamp": "2013-06-14T23:25:46.523Z",
          "id": "51bba6719c1f610117001e2a",
          "status": "delete",
          "localID": 126
        }, {
          "text": "#",
          "timestamp": "2013-06-14T23:11:05.786Z",
          "id": "51bba2fa9c1f610117001db3",
          "status": "create",
          "localID": 127
        }, {
          "text": "#t",
          "timestamp": "2013-06-14T23:10:59.624Z",
          "id": "51bba2f49c1f610117001db0",
          "status": "synced",
          "localID": 128
        }, {
          "text": "#",
          "timestamp": "2013-06-14T23:06:14.867Z",
          "id": "51bba1d79c1f610117001d7e",
          "status": "delete",
          "localID": 129
        }, {
          "text": "@boobs #todo @ - via @foo",
          "timestamp": "2013-06-14T23:04:05.077Z",
          "id": "51bba1559476845565001e71",
          "status": "update",
          "localID": 130
        }, {
          "text": "#",
          "timestamp": "2013-06-14T22:53:30.553Z",
          "id": "51bb9edb9c1f610117001d3f",
          "status": "synced",
          "localID": 131
        }, {
          "text": "#todo",
          "timestamp": "2013-06-14T22:51:09.764Z",
          "id": "51bb9e4f9c1f610117001d30",
          "status": "update",
          "localID": 132
        }, {
          "text": "#todo",
          "timestamp": "2013-06-14T22:46:25.970Z",
          "id": "51bb9d329c1f610117001d0e",
          "status": "delete",
          "localID": 133
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-14T22:43:45.454Z",
          "id": "51bb9c929c1f610117001d05",
          "status": "update",
          "localID": 134
        }, {
          "text": "#",
          "timestamp": "2013-06-14T22:26:34.031Z",
          "id": "51bb98fa9476845565001d79",
          "status": "create",
          "localID": 135
        }, {
          "text": "#read todo #fetchnotes #fet",
          "timestamp": "2013-06-14T22:28:02.342Z",
          "id": "51bb98e39476845565001d78",
          "status": "synced",
          "localID": 136
        }, {
          "text": "hmmm #hmm",
          "timestamp": "2013-06-14T19:07:42.603Z",
          "id": "51bb69ef9476845565001a78",
          "status": "delete",
          "localID": 137
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-14T19:06:47.044Z",
          "id": "51bb69b89476845565001a63",
          "status": "delete",
          "localID": 138
        }, {
          "text": "#",
          "timestamp": "2013-06-14T18:57:34.260Z",
          "id": "51bb678e9476845565001a4a",
          "status": "update",
          "localID": 139
        }, {
          "text": "#",
          "timestamp": "2013-06-14T18:53:09.229Z",
          "id": "51bb66859c1f610117001b27",
          "status": "update",
          "localID": 140
        }, {
          "text": "#fetchn",
          "timestamp": "2013-06-14T18:25:31.367Z",
          "id": "51bb600c9c1f610117001aa2",
          "status": "update",
          "localID": 141
        }, {
          "text": "#",
          "timestamp": "2013-06-14T18:00:15.292Z",
          "id": "51bb5a2094768455650019b3",
          "status": "create",
          "localID": 142
        }, {
          "text": "#",
          "timestamp": "2013-06-14T17:25:38.613Z",
          "id": "51bb5203947684556500195e",
          "status": "update",
          "localID": 143
        }, {
          "text": "#",
          "timestamp": "2013-06-14T16:34:26.269Z",
          "id": "51bb46029c1f610117001916",
          "status": "create",
          "localID": 144
        }, {
          "text": "#",
          "timestamp": "2013-06-14T16:34:11.155Z",
          "id": "51bb45f39c1f610117001914",
          "status": "synced",
          "localID": 145
        }, {
          "text": "#",
          "timestamp": "2013-06-14T16:34:02.212Z",
          "id": "51bb45ea9c1f610117001913",
          "status": "delete",
          "localID": 146
        }, {
          "text": "#t",
          "timestamp": "2013-06-14T16:18:43.998Z",
          "id": "51bb42549c1f6101170018d0",
          "status": "create",
          "localID": 147
        }, {
          "text": "#test",
          "timestamp": "2013-06-14T16:17:28.451Z",
          "id": "51bb42089c1f6101170018c4",
          "status": "update",
          "localID": 148
        }, {
          "text": "#fetchnotes hmm the problem is #to",
          "timestamp": "2013-06-14T16:17:12.412Z",
          "id": "51bb41f99c1f6101170018c3",
          "status": "update",
          "localID": 149
        }, {
          "text": "#todo hi there #test",
          "timestamp": "2013-06-14T16:10:56.079Z",
          "id": "51bb40809c1f610117001898",
          "status": "create",
          "localID": 150
        }, {
          "text": "#todo hmm ok that works now #read",
          "timestamp": "2013-06-14T16:09:19.734Z",
          "id": "51bb40209c1f610117001883",
          "status": "delete",
          "localID": 151
        }, {
          "text": "#personal",
          "timestamp": "2013-06-14T16:09:00.491Z",
          "id": "51bb400d9c1f610117001881",
          "status": "synced",
          "localID": 152
        }, {
          "text": "#todo sadfahmm #todo hi there buddy",
          "timestamp": "2013-06-14T16:08:13.852Z",
          "id": "51bb3fde9c1f61011700187b",
          "status": "update",
          "localID": 153
        }, {
          "text": "#",
          "timestamp": "2013-06-14T15:53:38.578Z",
          "id": "51bb3c749c1f610117001863",
          "status": "delete",
          "localID": 154
        }, {
          "text": "#todo hmm #todo oh yeah this will do i hope",
          "timestamp": "2013-06-14T15:45:43.260Z",
          "id": "51ba6fb39c1f6101170011ef",
          "status": "create",
          "localID": 155
        }, {
          "text": "hello baby#todo #rightnow you know there baby #",
          "timestamp": "2013-06-14T01:19:51.653Z",
          "id": "51ba6faa9c1f6101170011ee",
          "status": "synced",
          "localID": 156
        }, {
          "text": "#",
          "timestamp": "2013-06-14T01:04:54.945Z",
          "id": "51ba6c289c1f6101170011dc",
          "status": "synced",
          "localID": 157
        }, {
          "text": "#",
          "timestamp": "2013-06-14T01:04:50.034Z",
          "id": "51ba6c239c1f6101170011db",
          "status": "delete",
          "localID": 158
        }, {
          "text": "dslkalskdjf;lskadjf;lkljlkjlkjkj #sdddfsdf asdfsdfsd\n#todo high there",
          "timestamp": "2013-06-14T01:04:41.347Z",
          "id": "51ba58549c1f610117001047",
          "status": "update",
          "localID": 159
        }, {
          "text": "#personal heyo",
          "timestamp": "2013-06-13T22:11:56.365Z",
          "id": "51ba439e9c1f610117000cd2",
          "status": "synced",
          "localID": 160
        }, {
          "text": "#h This actually works",
          "timestamp": "2013-06-13T22:11:46.968Z",
          "id": "51ba43959c1f610117000cd1",
          "status": "synced",
          "localID": 161
        }, {
          "text": "#he",
          "timestamp": "2013-06-13T22:09:43.705Z",
          "id": "51ba43189476845565000c32",
          "status": "update",
          "localID": 162
        }, {
          "text": "#read",
          "timestamp": "2013-06-13T22:04:03.011Z",
          "id": "51ba41c49c1f610117000cb2",
          "status": "update",
          "localID": 163
        }, {
          "text": "#personal #read #",
          "timestamp": "2013-06-13T22:02:44.537Z",
          "id": "51ba3f6e9476845565000bfc",
          "status": "update",
          "localID": 164
        }, {
          "text": "#read Very cool and all but this is weird #",
          "timestamp": "2013-06-13T21:54:27.157Z",
          "id": "51ba3f849476845565000bfd",
          "status": "update",
          "localID": 165
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:53:53.710Z",
          "id": "51ba3f629476845565000bf3",
          "status": "synced",
          "localID": 166
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:53:50.767Z",
          "id": "51ba3f609476845565000bf2",
          "status": "synced",
          "localID": 167
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:52:17.918Z",
          "id": "51ba3f039476845565000bef",
          "status": "synced",
          "localID": 168
        }, {
          "text": "#todo",
          "timestamp": "2013-06-13T21:52:03.643Z",
          "id": "51ba3ef49476845565000bee",
          "status": "delete",
          "localID": 169
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:50:45.003Z",
          "id": "51ba3ea69476845565000bec",
          "status": "update",
          "localID": 170
        }, {
          "text": "#todo hello #td",
          "timestamp": "2013-06-13T21:50:39.917Z",
          "id": "51ba3ea19476845565000beb",
          "status": "synced",
          "localID": 171
        }, {
          "text": "#personal",
          "timestamp": "2013-06-13T21:49:29.566Z",
          "id": "51ba3e5a9c1f610117000c6c",
          "status": "update",
          "localID": 172
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:41:31.503Z",
          "id": "51ba3c7c9476845565000bdf",
          "status": "create",
          "localID": 173
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:41:28.741Z",
          "id": "51ba3c799476845565000bde",
          "status": "create",
          "localID": 174
        }, {
          "text": "#todo",
          "timestamp": "2013-06-13T21:41:25.121Z",
          "id": "51ba3c769476845565000bdd",
          "status": "delete",
          "localID": 175
        }, {
          "text": "#read Hi there",
          "timestamp": "2013-06-13T21:39:54.181Z",
          "id": "51ba3c1b9476845565000bdb",
          "status": "create",
          "localID": 176
        }, {
          "text": "#todo",
          "timestamp": "2013-06-13T21:39:32.082Z",
          "id": "51ba3c059476845565000bda",
          "status": "update",
          "localID": 177
        }, {
          "text": "#todo",
          "timestamp": "2013-06-13T21:34:04.486Z",
          "id": "51ba3abd9476845565000bd0",
          "status": "create",
          "localID": 178
        }, {
          "text": "#read This is cool",
          "timestamp": "2013-06-13T21:33:56.274Z",
          "id": "51ba3a169476845565000bb9",
          "status": "update",
          "localID": 179
        }, {
          "text": "#v",
          "timestamp": "2013-06-13T21:32:40.257Z",
          "id": "51ba3a699476845565000bbe",
          "status": "create",
          "localID": 180
        }, {
          "text": "#read Hi",
          "timestamp": "2013-06-13T21:31:03.818Z",
          "id": "51ba3a099476845565000bb6",
          "status": "update",
          "localID": 181
        }, {
          "text": "#ti Is my note #personal",
          "timestamp": "2013-06-13T21:29:08.469Z",
          "id": "51ba39959476845565000ba1",
          "status": "create",
          "localID": 182
        }, {
          "text": "#htm This is kinda hi there great news # Wow",
          "timestamp": "2013-06-13T21:19:21.519Z",
          "id": "51ba36d39c1f610117000b8d",
          "status": "update",
          "localID": 183
        }, {
          "text": "#fetchnotes Hi there this works as well",
          "timestamp": "2013-06-13T21:18:57.759Z",
          "id": "51ba37329476845565000b9b",
          "status": "update",
          "localID": 184
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:18:47.336Z",
          "id": "51ba37289476845565000b9a",
          "status": "delete",
          "localID": 185
        }, {
          "text": "#",
          "timestamp": "2013-06-13T21:18:34.847Z",
          "id": "51ba371c9476845565000b99",
          "status": "update",
          "localID": 186
        }, {
          "text": "#personal This is odd is just works",
          "timestamp": "2013-06-13T21:16:51.570Z",
          "id": "51ba36b49c1f610117000b8c",
          "status": "create",
          "localID": 187
        }, {
          "text": "#h",
          "timestamp": "2013-06-13T21:16:41.125Z",
          "id": "51ba36aa9c1f610117000b8b",
          "status": "synced",
          "localID": 188
        }, {
          "text": "#h",
          "timestamp": "2013-06-13T21:16:23.885Z",
          "id": "51ba36999c1f610117000b8a",
          "status": "delete",
          "localID": 189
        }, {
          "text": "#personal",
          "timestamp": "2013-06-11T23:48:05.060Z",
          "id": "51b7b7277af54fd5590271e0",
          "status": "create",
          "localID": 190
        }, {
          "text": "#personal",
          "timestamp": "2013-06-11T23:47:59.645Z",
          "id": "51b7b7227af54fd5590271df",
          "status": "update",
          "localID": 191
        }, {
          "text": "#fetchnotes",
          "timestamp": "2013-06-11T23:47:55.332Z",
          "id": "51b7b71d7af54fd5590271de",
          "status": "synced",
          "localID": 192
        }, {
          "text": "#personal dasdf",
          "timestamp": "2013-06-11T23:47:48.973Z",
          "id": "51b7b7177af54fd5590271dd",
          "status": "synced",
          "localID": 193
        }, {
          "text": "#personal",
          "timestamp": "2013-06-11T23:47:43.742Z",
          "id": "51b7b7127af54fd5590271dc",
          "status": "delete",
          "localID": 194
        }, {
          "text": "#",
          "timestamp": "2013-06-11T23:46:54.913Z",
          "id": "51b7b6e1eaedb8aa5d025ddd",
          "status": "synced",
          "localID": 195
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T23:46:49.694Z",
          "id": "51b7b6dceaedb8aa5d025ddb",
          "status": "synced",
          "localID": 196
        }, {
          "text": "D\nD\nD\nD\ndD\ndD\nD\nD\nD\nD\n#todo dddddddd",
          "timestamp": "2013-06-11T23:30:24.642Z",
          "id": "51b7b3037af54fd55902719e",
          "status": "delete",
          "localID": 197
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T23:22:36.274Z",
          "id": "51b7b12feaedb8aa5d025d76",
          "status": "create",
          "localID": 198
        }, {
          "text": "#todo #personal",
          "timestamp": "2013-06-11T23:02:05.155Z",
          "id": "51b7ac5feaedb8aa5d025d5c",
          "status": "update",
          "localID": 199
        }, {
          "text": "#todo #todo #todo #todo",
          "timestamp": "2013-06-11T22:42:25.855Z",
          "id": "51b7a7c4eaedb8aa5d025cd2",
          "status": "delete",
          "localID": 200
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T22:19:22.474Z",
          "id": "51b7a25d7af54fd559027045",
          "status": "delete",
          "localID": 201
        }, {
          "text": "#",
          "timestamp": "2013-06-11T22:17:08.906Z",
          "id": "51b7a1d77af54fd559027036",
          "status": "update",
          "localID": 202
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T20:28:54.600Z",
          "id": "51b788787af54fd559026e42",
          "status": "synced",
          "localID": 203
        }, {
          "text": "#personal",
          "timestamp": "2013-06-11T20:19:48.008Z",
          "id": "51b78656eaedb8aa5d025a4b",
          "status": "synced",
          "localID": 204
        }, {
          "text": "#",
          "timestamp": "2013-06-11T20:19:13.111Z",
          "id": "51b786337af54fd559026e21",
          "status": "synced",
          "localID": 205
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T20:04:02.621Z",
          "id": "51b782a57af54fd559026dc6",
          "status": "create",
          "localID": 206
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T19:58:21.179Z",
          "id": "51b7814f7af54fd559026dbb",
          "status": "synced",
          "localID": 207
        }, {
          "text": "#dope",
          "timestamp": "2013-06-11T19:57:23.718Z",
          "id": "51b78116eaedb8aa5d0259f7",
          "status": "create",
          "localID": 208
        }, {
          "text": "#todo #personal",
          "timestamp": "2013-06-11T19:41:05.370Z",
          "id": "51b77d43eaedb8aa5d0259b3",
          "status": "synced",
          "localID": 209
        }, {
          "text": "#personal",
          "timestamp": "2013-06-11T19:38:08.251Z",
          "id": "51b77c92eaedb8aa5d0259ad",
          "status": "delete",
          "localID": 210
        }, {
          "text": "#todo",
          "timestamp": "2013-06-11T19:38:02.827Z",
          "id": "51b77c8deaedb8aa5d0259ac",
          "status": "synced",
          "localID": 211
        }, {
          "text": "#",
          "timestamp": "2013-06-11T19:09:00.370Z",
          "id": "51b775be7af54fd559026d17",
          "status": "update",
          "localID": 212
        }, {
          "text": "#",
          "timestamp": "2013-06-10T22:48:51.684Z",
          "id": "51b657c6eaedb8aa5d024e93",
          "status": "synced",
          "localID": 213
        }, {
          "text": "alsjflsajlk  #  fjdlksf #",
          "timestamp": "2013-06-07T00:32:28.149Z",
          "id": "51b12a107af54fd559001205",
          "status": "update",
          "localID": 214
        }, {
          "text": "#",
          "timestamp": "2013-06-07T00:31:54.247Z",
          "id": "51b129ee7af54fd559001204",
          "status": "update",
          "localID": 215
        }, {
          "text": "asdfasdf #",
          "timestamp": "2013-06-07T00:31:24.716Z",
          "id": "51b129d17af54fd559001203",
          "status": "delete",
          "localID": 216
        }, {
          "text": "#",
          "timestamp": "2013-06-07T00:02:48.686Z",
          "id": "51b1231d7af54fd559001178",
          "status": "delete",
          "localID": 217
        }, {
          "text": "hello #",
          "timestamp": "2013-06-07T00:02:44.264Z",
          "id": "51b123187af54fd559001177",
          "status": "create",
          "localID": 218
        }, {
          "text": "asdfsadf #",
          "timestamp": "2013-06-06T23:59:29.348Z",
          "id": "51b122567af54fd559001166",
          "status": "synced",
          "localID": 219
        }, {
          "text": "fsdf",
          "timestamp": "2013-06-06T22:51:58.709Z",
          "id": "51b11283eaedb8aa5d000f97",
          "status": "update",
          "localID": 220
        }, {
          "text": "#",
          "timestamp": "2013-06-06T22:51:35.984Z",
          "id": "51b1126ceaedb8aa5d000f96",
          "status": "delete",
          "localID": 221
        }, {
          "text": "#",
          "timestamp": "2013-06-06T22:51:17.216Z",
          "id": "51b1125aeaedb8aa5d000f91",
          "status": "delete",
          "localID": 222
        }, {
          "text": "#",
          "timestamp": "2013-06-06T22:31:03.119Z",
          "id": "51b10d9beaedb8aa5d000f50",
          "status": "create",
          "localID": 223
        }, {
          "text": "#",
          "timestamp": "2013-06-06T22:30:58.288Z",
          "id": "51b10d96eaedb8aa5d000f4f",
          "status": "delete",
          "localID": 224
        }, {
          "text": "#fetchnotes  #tdodo Lulz #",
          "timestamp": "2013-06-06T22:26:13.364Z",
          "id": "51b1070a7af54fd5590010a3",
          "status": "create",
          "localID": 225
        }, {
          "text": "hello this eird  #personal hmm #read wasd",
          "timestamp": "2013-06-06T00:47:16.589Z",
          "id": "51afdc0a7af54fd5590005a2",
          "status": "create",
          "localID": 226
        }, {
          "text": "asdfasd asdfaf",
          "timestamp": "2013-06-05T22:24:50.988Z",
          "id": "51afbaa27af54fd5590003b0",
          "status": "update",
          "localID": 227
        }, {
          "text": "#todo add some todos #Asdf asdf #asdf #",
          "timestamp": "2013-06-05T19:08:39.866Z",
          "id": "51a687eff26381b70800002b",
          "status": "synced",
          "localID": 228
        }, {
          "text": "#todo what",
          "timestamp": "2013-05-29T19:53:27.675Z",
          "id": "51a65cb79e848cb9450159c6",
          "status": "synced",
          "localID": 229
        }, {
          "text": "#todo 25 more things",
          "timestamp": "2013-05-29T19:53:19.594Z",
          "id": "51a65caf9e848cb9450159c5",
          "status": "update",
          "localID": 230
        }, {
          "text": "#todo all the things",
          "timestamp": "2013-05-29T19:53:13.024Z",
          "id": "51a65ca99e848cb9450159c4",
          "status": "update",
          "localID": 231
        }, {
          "text": "#todo that",
          "timestamp": "2013-05-29T19:53:08.737Z",
          "id": "51a65ca49e848cb9450159c3",
          "status": "delete",
          "localID": 232
        }, {
          "text": "#todo this",
          "timestamp": "2013-05-29T19:53:06.111Z",
          "id": "51a65ca29e848cb9450159c2",
          "status": "delete",
          "localID": 233
        }, {
          "text": "#todo o",
          "timestamp": "2013-05-29T19:53:01.443Z",
          "id": "51a65c9d9e848cb9450159c1",
          "status": "create",
          "localID": 234
        }, {
          "text": "#todo d",
          "timestamp": "2013-05-29T19:52:55.132Z",
          "id": "51a65c979e848cb9450159c0",
          "status": "delete",
          "localID": 235
        }, {
          "text": "#todo 0",
          "timestamp": "2013-05-29T19:52:51.420Z",
          "id": "51a65c939e848cb9450159be",
          "status": "update",
          "localID": 236
        }, {
          "text": "#todo o",
          "timestamp": "2013-05-29T19:52:47.031Z",
          "id": "51a65c8f9e848cb9450159bd",
          "status": "create",
          "localID": 237
        }, {
          "text": "#todo t",
          "timestamp": "2013-05-29T19:52:43.777Z",
          "id": "51a65c8b9e848cb9450159bc",
          "status": "create",
          "localID": 238
        }, {
          "text": "#todo buy a house",
          "timestamp": "2013-05-29T19:52:38.797Z",
          "id": "51a65c869e848cb9450159bb",
          "status": "create",
          "localID": 239
        }, {
          "text": "#todo lulz",
          "timestamp": "2013-05-29T19:52:32.790Z",
          "id": "51a65c819e848cb9450159ba",
          "status": "update",
          "localID": 240
        }, {
          "astrid_id": 9145883470935521000,
          "text": "#Personal Heyo #completed",
          "timestamp": "2013-05-22T21:30:02.000Z",
          "id": "51a63a645d00a1562301235a",
          "status": "delete",
          "localID": 241
        }, {
          "astrid_id": 594658904759184900,
          "text": "Doing stuff\n\nchanging the description #completed",
          "timestamp": "2013-05-22T21:27:39.000Z",
          "id": "51a63a649e848cb94501584e",
          "status": "update",
          "localID": 242
        }, {
          "astrid_id": 7580772657307057000,
          "text": "#Personal Weep",
          "timestamp": "2013-05-14T20:36:00.000Z",
          "id": "51a63a649e848cb94501584d",
          "status": "synced",
          "localID": 243
        }, {
          "astrid_id": 5640455718216254000,
          "text": "#Personal Is",
          "timestamp": "2013-05-24T23:30:07.000Z",
          "id": "51a63a649e848cb94501584c",
          "status": "create",
          "localID": 244
        }, {
          "astrid_id": 3222548342354767000,
          "text": "#Personal Personal",
          "timestamp": "2013-05-15T00:03:58.000Z",
          "id": "51a63a645d00a15623012359",
          "status": "update",
          "localID": 245
        }, {
          "astrid_id": 2947115321091042300,
          "text": "#Personal This",
          "timestamp": "2013-05-15T00:03:56.000Z",
          "id": "51a63a645d00a15623012358",
          "status": "synced",
          "localID": 246
        }, {
          "astrid_id": 594658904759184900,
          "text": "Doing stuff\n\nchanging the description #completed",
          "timestamp": "2013-05-22T21:27:39.000Z",
          "id": "51a63a4d5d00a15623012357",
          "status": "create",
          "localID": 247
        }, {
          "astrid_id": 9145883470935521000,
          "text": "#Personal Heyo #completed",
          "timestamp": "2013-05-22T21:30:02.000Z",
          "id": "51a63a4d9e848cb94501584b",
          "status": "delete",
          "localID": 248
        }, {
          "astrid_id": 2947115321091042300,
          "text": "#Personal This",
          "timestamp": "2013-05-15T00:03:56.000Z",
          "id": "51a63a4d5d00a15623012356",
          "status": "create",
          "localID": 249
        }, {
          "astrid_id": 7580772657307057000,
          "text": "#Personal Weep",
          "timestamp": "2013-05-14T20:36:00.000Z",
          "id": "51a63a4d5d00a15623012355",
          "status": "update",
          "localID": 250
        }, {
          "astrid_id": 3222548342354767000,
          "text": "#Personal Personal",
          "timestamp": "2013-05-15T00:03:58.000Z",
          "id": "51a63a4d9e848cb94501584a",
          "status": "delete",
          "localID": 251
        }, {
          "astrid_id": 5640455718216254000,
          "text": "#Personal Is",
          "timestamp": "2013-05-24T23:30:07.000Z",
          "id": "51a63a4d9e848cb945015849",
          "status": "create",
          "localID": 252
        }, {
          "text": "Food #groceries",
          "timestamp": "2013-05-28T23:08:02.195Z",
          "id": "51a538d45d00a15623002286",
          "status": "update",
          "localID": 253
        }, {
          "text": "Spinach #groceries",
          "timestamp": "2013-05-28T23:07:55.184Z",
          "id": "51a538ce5d00a15623002285",
          "status": "create",
          "localID": 254
        }, {
          "text": "#groceries stomach",
          "timestamp": "2013-05-28T23:07:41.994Z",
          "id": "51a538c05d00a15623002284",
          "status": "create",
          "localID": 255
        }, {
          "text": "#groceries eggplant",
          "timestamp": "2013-05-28T23:07:15.837Z",
          "id": "51a538a65d00a1562300224e",
          "status": "create",
          "localID": 256
        }, {
          "text": "#groceries duck",
          "timestamp": "2013-05-28T23:07:07.084Z",
          "id": "51a5389d5d00a15623002226",
          "status": "update",
          "localID": 257
        }, {
          "text": "Pork #groceries",
          "timestamp": "2013-05-28T23:07:00.723Z",
          "id": "51a538975d00a15623002213",
          "status": "synced",
          "localID": 258
        }, {
          "text": "#groceries oatmeal",
          "timestamp": "2013-05-28T23:06:54.236Z",
          "id": "51a538905d00a156230021f7",
          "status": "synced",
          "localID": 259
        }, {
          "text": "5@195lbs #squats #workout",
          "timestamp": "2013-05-27T20:39:08.576Z",
          "id": "51a3c14d9e848cb945003771",
          "status": "update",
          "localID": 260
        }, {
          "astrid_id": 9145883470935521000,
          "text": "#Personal Heyo #completed",
          "timestamp": "2013-05-22T21:30:02.000Z",
          "id": "51a508039e848cb94500451f",
          "status": "create",
          "localID": 261
        }, {
          "astrid_id": 594658904759184900,
          "text": "Doing stuff\n\nchanging the description #completed",
          "timestamp": "2013-05-22T21:27:39.000Z",
          "id": "51a508035d00a15623001eed",
          "status": "synced",
          "localID": 262
        }, {
          "astrid_id": 7580772657307057000,
          "text": "#Personal Weep",
          "timestamp": "2013-05-14T20:36:00.000Z",
          "id": "51a508035d00a15623001eec",
          "status": "synced",
          "localID": 263
        }, {
          "astrid_id": 5640455718216254000,
          "text": "#Personal Is",
          "timestamp": "2013-05-24T23:30:07.000Z",
          "id": "51a508039e848cb94500451e",
          "status": "create",
          "localID": 264
        }, {
          "astrid_id": 2947115321091042300,
          "text": "#Personal This",
          "timestamp": "2013-05-15T00:03:56.000Z",
          "id": "51a508039e848cb94500451d",
          "status": "create",
          "localID": 265
        }, {
          "astrid_id": 3222548342354767000,
          "text": "#Personal Personal",
          "timestamp": "2013-05-15T00:03:58.000Z",
          "id": "51a508035d00a15623001eeb",
          "status": "delete",
          "localID": 266
        }, {
          "text": "5@175lbs #squats #workout",
          "timestamp": "2013-05-27T20:38:51.620Z",
          "id": "51a3c09d5d00a156230011ab",
          "status": "delete",
          "localID": 267
        }, {
          "text": "5@135lbs #squat #workout",
          "timestamp": "2013-05-27T20:38:24.391Z",
          "id": "51a3befd9e848cb945003754",
          "status": "update",
          "localID": 268
        }, {
          "text": "3@215lbs #squats #workout",
          "timestamp": "2013-05-27T20:39:21.985Z",
          "id": "51a3c2709e848cb94500377a",
          "status": "create",
          "localID": 269
        }, {
          "text": "3.02miles @ 31 minutes #run #workout",
          "timestamp": "2013-05-27T20:38:41.564Z",
          "id": "51a3bf1b5d00a1562300118a",
          "status": "create",
          "localID": 270
        }, {
          "text": "5@155lbs #squat #workout",
          "timestamp": "2013-05-27T20:38:14.035Z",
          "id": "51a3bf7d5d00a15623001191",
          "status": "update",
          "localID": 271
        }, {
          "astrid_id": 9145883470935521000,
          "text": "#Personal Heyo #completed",
          "timestamp": "2013-05-22T21:30:02.000Z",
          "id": "51a003f29e848cb945000f97",
          "status": "create",
          "localID": 272
        }, {
          "astrid_id": 7580772657307057000,
          "text": "#Personal Weep",
          "timestamp": "2013-05-14T20:36:00.000Z",
          "id": "51a003f26ad76f2b47001038",
          "status": "update",
          "localID": 273
        }, {
          "astrid_id": 5640455718216254000,
          "text": "#Personal Is",
          "timestamp": "2013-05-24T23:30:07.000Z",
          "id": "51a003f26ad76f2b47001037",
          "status": "create",
          "localID": 274
        }, {
          "astrid_id": 594658904759184900,
          "text": "Doing stuff\n\nchanging the description #completed",
          "timestamp": "2013-05-22T21:27:39.000Z",
          "id": "51a003f29e848cb945000f96",
          "status": "update",
          "localID": 275
        }, {
          "astrid_id": 2947115321091042300,
          "text": "#Personal This",
          "timestamp": "2013-05-15T00:03:56.000Z",
          "id": "51a003f29e848cb945000f95",
          "status": "create",
          "localID": 276
        }, {
          "astrid_id": 3222548342354767000,
          "text": "#Personal Personal",
          "timestamp": "2013-05-15T00:03:58.000Z",
          "id": "51a003f26ad76f2b47001036",
          "status": "update",
          "localID": 277
        }, {
          "text": "Fry pans\nCups\nCutlery\nFlashlights\nPlates\nmike @foo - via @lubibul",
          "timestamp": "2013-05-24T22:57:14.017Z",
          "unsubscribed": ["51787e854cf112060700dfca"],
          "id": "5192527c92ee433b2d0066ae",
          "status": "synced",
          "localID": 278
        }, {
          "text": "#fetchnotesghetto matt is da best mike - via @foo @foobar mike @foobar",
          "timestamp": "2013-05-24T18:47:00.717Z",
          "fetchnotes_id": "5081f40029d369479b0008f0",
          "unsubscribed": ["51787e854cf112060700dfca"],
          "id": "5181bdf0a267c9d81006514c",
          "status": "synced",
          "localID": 279
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "5081f40029d369479b0008f0",
          "ids": [null, null, null],
          "text": "#fetchnotesghetto matt is da best mike - via @foo @foobar mike @foobar",
          "timestamp": "2013-05-24T18:46:58.209Z",
          "unsubscribed": ["51787e854cf112060700dfca"],
          "id": "51798c1fc489853505016b5e",
          "status": "synced",
          "localID": 280
        }, {
          "text": "#todo celebrate this #android fix\n\n:thumbsup",
          "timestamp": "2013-05-19T22:36:54.184Z",
          "id": "5196c88ddc11a0d5070019d8",
          "status": "delete",
          "localID": 281
        }, {
          "text": "#read mencken",
          "timestamp": "2013-05-17T23:53:31.653Z",
          "id": "5196c2feb1de9d450a0016d6",
          "status": "delete",
          "localID": 282
        }, {
          "text": "#json https://raw.github.com/embedly/embedly-jquery/master/package.json",
          "timestamp": "2013-05-17T22:42:36.978Z",
          "id": "5196b25db1de9d450a001512",
          "status": "synced",
          "localID": 283
        }, {
          "text": "#horse http://www.w3schools.com/html/horse.ogg",
          "timestamp": "2013-05-17T22:08:48.277Z",
          "id": "5196aa69dc11a0d507001670",
          "status": "delete",
          "localID": 284
        }, {
          "text": "http://www.w3schools.com/html/mov_bbb.mp4",
          "timestamp": "2013-05-17T21:41:05.143Z",
          "id": "5196a3f1b1de9d450a00128d",
          "status": "synced",
          "localID": 285
        }, {
          "text": "https://soundcloud.com/chrome-sparks/marijuana",
          "timestamp": "2013-05-17T21:35:02.988Z",
          "id": "5196a287b1de9d450a00127f",
          "status": "synced",
          "localID": 286
        }, {
          "text": "https://rd.io/i/QUDCZSJVKMQ/",
          "timestamp": "2013-05-17T21:34:10.404Z",
          "id": "5196a252dc11a0d507001549",
          "status": "update",
          "localID": 287
        }, {
          "text": "#music https://rd.io/i/QUDCZSJVKMQ/",
          "timestamp": "2013-05-17T21:33:59.972Z",
          "id": "5196a248b1de9d450a00127d",
          "status": "synced",
          "localID": 288
        }, {
          "text": "https://www.dropbox.com/s/lbtpjhgpopd1b96/I%20love%20it-THE%20STORE%20ISN%27T%20THERE%20ANYMORE%21%21%21.jpg",
          "timestamp": "2013-05-17T21:32:38.516Z",
          "id": "5196a1f6dc11a0d50700153e",
          "status": "delete",
          "localID": 289
        }, {
          "text": "#cat http://vimeo.com/36820781",
          "timestamp": "2013-05-17T21:26:28.971Z",
          "id": "5196a085dc11a0d507001519",
          "status": "synced",
          "localID": 290
        }, {
          "text": "#cat http://www.youtube.com/watch?v=R5K3km8Fbs8",
          "timestamp": "2013-05-17T21:25:25.535Z",
          "id": "5196a04adc11a0d507001511",
          "status": "synced",
          "localID": 291
        }, {
          "text": "#dog http://imgur.com/l6PKEMf",
          "timestamp": "2013-05-17T21:22:13.448Z",
          "id": "51969f85b1de9d450a001251",
          "status": "synced",
          "localID": 292
        }, {
          "text": "#dog http://i.imgur.com/l6PKEMf.jpg",
          "timestamp": "2013-05-17T21:21:07.509Z",
          "id": "51969f43dc11a0d5070014bd",
          "status": "delete",
          "localID": 293
        }, {
          "text": "text https://raw.github.com/Fetchnotes/Fetchbone/a02ddddfcae6ce842582ad8643018b5e80193629/coffee/views/index.coffee?login=brandly&token=7d4bf8d2948f6060218c06b0d7ffb7d1",
          "timestamp": "2013-05-17T21:13:35.212Z",
          "id": "51969d7fdc11a0d5070013e4",
          "status": "delete",
          "localID": 294
        }, {
          "text": "#books Disciplined Dreaming http://amzn.to/PkHQjn",
          "timestamp": "2013-05-17T21:10:47.277Z",
          "id": "51969cd7b1de9d450a001201",
          "status": "create",
          "localID": 295
        }, {
          "text": "there's a really sweet note down there \\\\// asdf",
          "timestamp": "2013-05-12T15:49:39.707Z",
          "id": "518d6649a6b1878c34000ec4",
          "status": "delete",
          "localID": 296
        }, {
          "text": "Whhhhhhaaaat",
          "timestamp": "2013-05-12T02:25:42.540Z",
          "id": "518efda692ee433b2d004002",
          "status": "delete",
          "localID": 297
        }, {
          "text": "what up",
          "timestamp": "2013-05-12T00:55:09.773Z",
          "id": "518ee86da6b1878c340035bf",
          "status": "update",
          "localID": 298
        }, {
          "_text": "what up",
          "text": "fooo",
          "timestamp": "2013-05-12T00:42:25.861Z",
          "id": "518ee571a6b1878c34003538",
          "status": "update",
          "localID": 299
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo asdf",
          "timestamp": "2013-05-10T22:55:48.428Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "5186fafc41cec47f0e0e01f4",
          "status": "synced",
          "localID": 300
        }, {
          "text": "Asdfasdfasdfasdfffsdaasdfas",
          "timestamp": "2013-05-10T22:40:13.594Z",
          "id": "518bf16579bae25208000d3c",
          "status": "update",
          "localID": 301
        }, {
          "text": "this is a sweet note",
          "timestamp": "2013-05-09T19:21:12.421Z",
          "id": "51898509a267c9d810121d26",
          "status": "synced",
          "localID": 302
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo",
          "timestamp": "2013-05-06T14:13:36.422Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "5186ec8ca267c9d8100f380c",
          "status": "update",
          "localID": 303
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo",
          "timestamp": "2013-05-06T14:13:34.439Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "51872cb3a267c9d8100f399a",
          "status": "create",
          "localID": 304
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo",
          "timestamp": "2013-05-06T14:13:33.120Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "51872b6741cec47f0e0e0300",
          "status": "create",
          "localID": 305
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo",
          "timestamp": "2013-05-06T14:13:31.658Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "51875db2a267c9d810113a91",
          "status": "delete",
          "localID": 306
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo",
          "timestamp": "2013-05-06T14:13:19.109Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "5186ec7c41cec47f0e0e00dc",
          "status": "create",
          "localID": 307
        }, {
          "text": "#TODO some stuff matt mike alexh - via @foo",
          "timestamp": "2013-05-06T14:13:13.640Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "5142155ae457085304022fd8"],
          "id": "51875e20a267c9d810113a96",
          "status": "synced",
          "localID": 308
        }, {
          "text": "alex whaaaat up - via @foo",
          "timestamp": "2013-05-06T09:18:46.349Z",
          "unsubscribed": ["517a05c66f516b500403de65"],
          "id": "51877054a267c9d810113ad3",
          "status": "create",
          "localID": 309
        }, {
          "text": "#TODO some stuff @matt mike alexh - via @foo",
          "timestamp": "2013-05-06T08:20:34.676Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "51787e854cf112060700dfca"],
          "id": "5186dd8ba267c9d8100f375d",
          "status": "synced",
          "localID": 310
        }, {
          "text": "#TODO some stuff @matt mike alexh - via @foo",
          "timestamp": "2013-05-06T08:20:30.251Z",
          "unsubscribed": ["517a0567c489853505049546", "51787e854cf112060700dfca", "51787e854cf112060700dfca"],
          "id": "5186e914a267c9d8100f37c6",
          "status": "delete",
          "localID": 311
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-06T03:39:12.406Z",
          "id": "51875e20a267c9d810113a97",
          "status": "update",
          "localID": 312
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T03:39:11.567Z",
          "id": "51875e1fa267c9d810113a95",
          "status": "delete",
          "localID": 313
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T03:39:11.026Z",
          "id": "51875e1fa267c9d810113a94",
          "status": "delete",
          "localID": 314
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-06T03:37:23.166Z",
          "id": "51875db3a267c9d810113a92",
          "status": "delete",
          "localID": 315
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T03:37:22.161Z",
          "id": "51875db241cec47f0e0fe669",
          "status": "synced",
          "localID": 316
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T03:37:21.002Z",
          "id": "51875db1a267c9d810113a90",
          "status": "update",
          "localID": 317
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-06T03:35:04.782Z",
          "id": "51875d2841cec47f0e0fe666",
          "status": "delete",
          "localID": 318
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T03:35:03.467Z",
          "id": "51875d2741cec47f0e0fe665",
          "status": "delete",
          "localID": 319
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T03:35:02.586Z",
          "id": "51875d26a267c9d810113a89",
          "status": "update",
          "localID": 320
        }, {
          "text": "Woooooot force logout android",
          "timestamp": "2013-04-23T19:52:14.299Z",
          "fetchnotes_id": "5176b10429d3697f4401d3d4",
          "id": "5187516441cec47f0e0fc828",
          "status": "delete",
          "localID": 321
        }, {
          "text": "#read 50 shades of Grey",
          "timestamp": "2013-04-23T16:04:47.347Z",
          "fetchnotes_id": "511039e329d3697f23012022",
          "id": "5187516041cec47f0e0fc785",
          "status": "create",
          "localID": 322
        }, {
          "text": "asdfasdf",
          "timestamp": "2013-02-25T17:33:42.383Z",
          "fetchnotes_id": "512ba07629d3697f44016753",
          "id": "5187494341cec47f0e0f0669",
          "status": "synced",
          "localID": 323
        }, {
          "text": "Hello @Horak this is #Matt - via @foo",
          "timestamp": "2013-01-21T19:04:37.746Z",
          "fetchnotes_id": "5080cb9829d369479b000805",
          "id": "51874580a267c9d8100fdbf6",
          "status": "delete",
          "localID": 324
        }, {
          "text": "@Horak #todo add Gangnam Style into our #project on Korea. - via @foo",
          "timestamp": "2013-01-21T19:04:39.074Z",
          "fetchnotes_id": "5081e06929d36947880008a3",
          "id": "5187458041cec47f0e0e9cc9",
          "status": "create",
          "localID": 325
        }, {
          "text": "test1",
          "timestamp": "2013-01-10T23:17:59.200Z",
          "fetchnotes_id": "50ef4c2729d3697f2e004718",
          "id": "5187451441cec47f0e0e8e1e",
          "status": "update",
          "localID": 326
        }, {
          "text": "#test3 asdf",
          "timestamp": "2013-01-10T23:18:03.648Z",
          "fetchnotes_id": "50ef4c2b29d3697f2e004719",
          "id": "51874514a267c9d8100fcc44",
          "status": "synced",
          "localID": 327
        }, {
          "text": "test2",
          "timestamp": "2013-01-10T23:19:21.962Z",
          "fetchnotes_id": "50ef4c7929d3697f39004838",
          "id": "51874514a267c9d8100fcc43",
          "status": "synced",
          "localID": 328
        }, {
          "text": "sdfasdf",
          "timestamp": "2013-01-10T23:17:52.649Z",
          "fetchnotes_id": "50ef4c2029d3697f4400490a",
          "id": "51874513a267c9d8100fcc1d",
          "status": "create",
          "localID": 329
        }, {
          "text": "#Asdfas asdf",
          "timestamp": "2013-01-10T23:16:41.700Z",
          "fetchnotes_id": "50ef4bd929d3697f2e004717",
          "id": "5187451341cec47f0e0e8de6",
          "status": "synced",
          "localID": 330
        }, {
          "text": "Hello",
          "timestamp": "2013-01-10T21:26:43.166Z",
          "fetchnotes_id": "50ef321329d3697f4400488d",
          "id": "5187451341cec47f0e0e8dd9",
          "status": "create",
          "localID": 331
        }, {
          "text": "#Ratty hello",
          "timestamp": "2013-01-10T21:27:33.168Z",
          "fetchnotes_id": "50ef324529d3697f4400488f",
          "id": "5187451341cec47f0e0e8dd8",
          "status": "update",
          "localID": 332
        }, {
          "text": "#Ratty yo",
          "timestamp": "2013-01-10T21:27:59.205Z",
          "fetchnotes_id": "50ef325f29d3697f2300464e",
          "id": "5187451341cec47f0e0e8dd7",
          "status": "update",
          "localID": 333
        }, {
          "text": "#Todo yo",
          "timestamp": "2013-01-10T21:29:58.424Z",
          "fetchnotes_id": "50ef32d629d3697f23004651",
          "id": "51874513a267c9d8100fcc05",
          "status": "synced",
          "localID": 334
        }, {
          "text": "sadfasdf",
          "timestamp": "2013-01-10T22:51:40.242Z",
          "fetchnotes_id": "50ef45fc29d3697f2e0046fb",
          "id": "5187451341cec47f0e0e8dc6",
          "status": "update",
          "localID": 335
        }, {
          "text": "#Asdf asdfsd",
          "timestamp": "2013-01-10T22:51:47.887Z",
          "fetchnotes_id": "50ef460329d3697f2e0046fc",
          "id": "5187451241cec47f0e0e8dc5",
          "status": "update",
          "localID": 336
        }, {
          "text": "#tdodo adlsfj",
          "timestamp": "2013-01-10T22:51:56.864Z",
          "fetchnotes_id": "50ef460c29d3697f440048f3",
          "id": "51874512a267c9d8100fcbf7",
          "status": "create",
          "localID": 337
        }, {
          "text": "#Ewr asdf a",
          "timestamp": "2013-01-10T23:02:02.425Z",
          "fetchnotes_id": "50ef486a29d3697f440048f5",
          "id": "51874512a267c9d8100fcbf5",
          "status": "delete",
          "localID": 338
        }, {
          "text": "http://www.nytimes.com/2012/11/18/technology/your-online-attention-bought-in-an-instant-by-advertisers.html?emc=eta1&_r=0 #read @Alexh - via alex @Foo",
          "timestamp": "2013-01-09T22:46:43.451Z",
          "fetchnotes_id": "50ad7c1d29d3696ca5000315",
          "id": "5187450aa267c9d8100fcaa2",
          "status": "create",
          "localID": 339
        }, {
          "text": "#fetchnotesghetto brandly - via @foo",
          "timestamp": "2013-01-09T22:22:56.328Z",
          "fetchnotes_id": "50edda9f29d3697f4400439f",
          "id": "51874508a267c9d8100fca4b",
          "status": "update",
          "localID": 340
        }, {
          "text": "#buy stuff",
          "timestamp": "2013-01-09T21:25:31.207Z",
          "fetchnotes_id": "50c2769e29d3694d42000aa1",
          "id": "5187450641cec47f0e0e8c24",
          "status": "synced",
          "localID": 341
        }, {
          "text": "#books the hobbit",
          "timestamp": "2013-01-09T21:25:31.345Z",
          "fetchnotes_id": "50c29cc029d3694d4d000a9b",
          "id": "5187450641cec47f0e0e8c23",
          "status": "update",
          "localID": 342
        }, {
          "text": "#buy headphones",
          "timestamp": "2013-01-09T21:25:31.245Z",
          "fetchnotes_id": "50c28ec729d3694d58000a3c",
          "id": "5187450641cec47f0e0e8c22",
          "status": "create",
          "localID": 343
        }, {
          "text": "@foo http://open.spotify.com/track/693R4N3d57wZcUXgsuSj1i - via brandly",
          "timestamp": "2013-01-09T21:25:31.459Z",
          "fetchnotes_id": "50eb53c629d3697f2e003244",
          "id": "5187450641cec47f0e0e8c21",
          "status": "synced",
          "localID": 344
        }, {
          "text": "http://spo.tl/J0JRO",
          "timestamp": "2013-01-09T21:25:31.413Z",
          "fetchnotes_id": "50eb502129d3697f2e00321e",
          "id": "51874506a267c9d8100fca1f",
          "status": "synced",
          "localID": 345
        }, {
          "text": "Bsksns fjdjfj the desire. I am a little r. If you are not the same time. The text, or the taking the user to mgkfjdjfj to the next time I was just ii, eu\n, and watched AD for most \n. I have a great day. I \n. I have a great day. I \n. I I am a beautiful person. \nI have a great day. I have \n, but the fact, the more you rate of the rings, I \n, for the next day, but the fact, \nI'm sure that you have a great deal on it \n, and I am not a problem\n\nJdjfnejdjfjf Jdjfnejdjfjf the same. \nThe only way I \n, for example. I am not sure what the \nBible, but the most important part. The \nAmerican, I have e\nI have to do. The only \n, but the most part \n. The only way to the right to be \n, and the other day. I have a \n' duel ' duel \n, and the other day \n, and the rest \n, and the other day. I. I I am a little r.",
          "timestamp": "2013-01-09T21:25:31.397Z",
          "fetchnotes_id": "5069c18e29d3695475000055",
          "id": "51874506a267c9d8100fca1e",
          "status": "update",
          "localID": 346
        }, {
          "text": "day bow bow chick, chick-chick-a",
          "timestamp": "2013-01-09T21:25:31.488Z",
          "fetchnotes_id": "50edd8a729d3697f4400438d",
          "id": "51874506a267c9d8100fca1d",
          "status": "create",
          "localID": 347
        }, {
          "text": "Bdjdjdjcncjdkxhdj",
          "timestamp": "2013-01-09T21:25:31.727Z",
          "fetchnotes_id": "50df6ba829d3697f3900225c",
          "id": "51874506a267c9d8100fca1c",
          "status": "delete",
          "localID": 348
        }, {
          "text": "alex #todo #shopping #resources #beerlist #fetchnotes resourcces - via @foo",
          "timestamp": "2013-01-09T21:25:44.733Z",
          "fetchnotes_id": "5065d98629d369180200021d",
          "id": "5187450641cec47f0e0e8c20",
          "status": "update",
          "localID": 349
        }, {
          "text": "#fetchnotes #buy #aaaaaaasssa woot woot woot",
          "timestamp": "2013-01-09T21:25:44.654Z",
          "fetchnotes_id": "50eddaa829d3697f230041a6",
          "id": "51874506a267c9d8100fca1b",
          "status": "update",
          "localID": 350
        }, {
          "text": "alex #todo #shopping #resources #beerlist #fetchnotes resourcces - via @foo",
          "timestamp": "2013-01-09T21:25:44.705Z",
          "fetchnotes_id": "5065d94f29d36917f7000230",
          "id": "51874506a267c9d8100fca1a",
          "status": "synced",
          "localID": 351
        }, {
          "text": "woot #fetchnotes #imdabes",
          "timestamp": "2013-01-09T21:25:44.752Z",
          "fetchnotes_id": "50edda0729d3697f230041a2",
          "id": "5187450641cec47f0e0e8c1f",
          "status": "synced",
          "localID": 352
        }, {
          "text": "Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long noteHere is a superHere is a super long note Here is a superHere is a super long note Here is a super long Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long notenote Here is a super long note Here is a super long note Here is a super long note Here is a super long note #fetchnotes Here is a super long note Here is a super long note long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long notesuper long note Here is a super long",
          "timestamp": "2013-01-09T21:25:45.151Z",
          "fetchnotes_id": "5066666d29d36917ea00031d",
          "id": "51874506a267c9d8100fca18",
          "status": "delete",
          "localID": 353
        }, {
          "text": "999999999999999997 #beerlist",
          "timestamp": "2013-01-09T21:34:19.604Z",
          "fetchnotes_id": "50edd85429d3697f2e004103",
          "id": "5187450641cec47f0e0e8c1b",
          "status": "synced",
          "localID": 354
        }, {
          "text": "http://espn.go.com/new-york/nba/story/_/id/8745697/carmelo-anthony-new-york-knicks-leaves-game-sprained-ankle",
          "timestamp": "2013-01-09T21:34:27.886Z",
          "fetchnotes_id": "50cb7d7529d3697f2e001019",
          "id": "5187450641cec47f0e0e8c1c",
          "status": "update",
          "localID": 355
        }, {
          "text": "The dopest note #dope #books",
          "timestamp": "2013-01-09T21:34:20.228Z",
          "fetchnotes_id": "5094171b29d3695c1f0004c2",
          "id": "51874506a267c9d8100fca14",
          "status": "delete",
          "localID": 356
        }, {
          "text": "https://speakerdeck.com/holman/scaling-github",
          "timestamp": "2013-01-03T20:51:04.496Z",
          "fetchnotes_id": "50cb7fc129d3697f390010c2",
          "id": "518744d341cec47f0e0e8536",
          "status": "synced",
          "localID": 357
        }, {
          "text": "http://www.theonion.com/video/gop-well-accept-higher-taxes-if-president-obama-gi,30728/",
          "timestamp": "2013-01-03T20:51:04.613Z",
          "fetchnotes_id": "50cb7e3229d3697f2e00101b",
          "id": "518744d341cec47f0e0e8535",
          "status": "synced",
          "localID": 358
        }, {
          "text": "http://zachholman.com/talk/scaling-github/",
          "timestamp": "2013-01-03T20:51:04.543Z",
          "fetchnotes_id": "50cb7f3a29d3697f44000f9e",
          "id": "518744d3a267c9d8100fc2e9",
          "status": "delete",
          "localID": 359
        }, {
          "text": "http://www.theonion.com/articles/guys-with-boring-jobs-really-hitting-it-off-a-few,30724/",
          "timestamp": "2013-01-03T20:51:04.669Z",
          "fetchnotes_id": "50cb7e0429d3697f2e00101a",
          "id": "518744d3a267c9d8100fc2e8",
          "status": "delete",
          "localID": 360
        }, {
          "text": "http://xkcd.com/846/",
          "timestamp": "2013-01-03T20:51:04.720Z",
          "fetchnotes_id": "50cb7d3c29d3697f44000f9d",
          "id": "518744d3a267c9d8100fc2e7",
          "status": "update",
          "localID": 361
        }, {
          "text": "http://chromesparks.bandcamp.com/track/2-live-crew-be-my-private-dancer-chrome-sparks-remix",
          "timestamp": "2013-01-03T20:51:04.870Z",
          "fetchnotes_id": "50ca771e29d3697f39000f3e",
          "id": "518744d341cec47f0e0e8534",
          "status": "delete",
          "localID": 362
        }, {
          "text": "#Read hunger games",
          "timestamp": "2013-01-03T20:51:19.015Z",
          "fetchnotes_id": "50de77bc29d3697f23002172",
          "id": "518744d3a267c9d8100fc2e5",
          "status": "delete",
          "localID": 363
        }, {
          "text": "Fjjfjcjcjdjfhcyfjd",
          "timestamp": "2013-01-03T20:51:18.936Z",
          "fetchnotes_id": "50df6beb29d3697f2e00228f",
          "id": "518744d3a267c9d8100fc2e6",
          "status": "delete",
          "localID": 364
        }, {
          "text": "http://www.slideshare.net/Women_Connect/babies-and-boardrooms-how-to-juggle-your-career-as-a-new-mom",
          "timestamp": "2013-01-03T20:51:19.095Z",
          "fetchnotes_id": "50cb805729d3697f2e001026",
          "id": "518744d3a267c9d8100fc2e4",
          "status": "create",
          "localID": 365
        }, {
          "text": "http://www.rdio.com/artist/Lana_Del_Rey/album/Paradise/track/Ride/",
          "timestamp": "2013-01-03T20:51:19.753Z",
          "fetchnotes_id": "50ca73da29d3697f44000e21",
          "id": "518744d341cec47f0e0e8533",
          "status": "delete",
          "localID": 366
        }, {
          "text": "#music boys noize",
          "timestamp": "2013-01-03T20:52:01.342Z",
          "fetchnotes_id": "50c280a229d3694d63000ae2",
          "id": "518744d3a267c9d8100fc2e3",
          "status": "synced",
          "localID": 367
        }, {
          "text": "#music sufjan stevens",
          "timestamp": "2013-01-03T20:52:01.387Z",
          "fetchnotes_id": "50c2752629d3694d63000acc",
          "id": "518744d341cec47f0e0e8531",
          "status": "synced",
          "localID": 368
        }, {
          "text": "http://xkcd.com/",
          "timestamp": "2012-12-14T19:25:12.510Z",
          "fetchnotes_id": "50cb7d1829d3697f44000f9b",
          "id": "5187439041cec47f0e0e7993",
          "status": "delete",
          "localID": 369
        }, {
          "text": "https://soundcloud.com/kflay/lost-kitten-metric-cover",
          "timestamp": "2012-12-14T00:02:54.690Z",
          "fetchnotes_id": "50ca6cae29d3697f2e000eae",
          "id": "5187438da267c9d8100fb658",
          "status": "synced",
          "localID": 370
        }, {
          "text": "http://madeinheights.bandcamp.com/",
          "timestamp": "2012-12-14T00:51:53.613Z",
          "fetchnotes_id": "50ca782929d3697f23000f31",
          "id": "5187438da267c9d8100fb655",
          "status": "delete",
          "localID": 371
        }, {
          "text": "http://imgur.com/55IWM",
          "timestamp": "2012-12-13T20:26:16.431Z",
          "fetchnotes_id": "50ca39e829d3697f2e000e43",
          "id": "5187438aa267c9d8100fb625",
          "status": "update",
          "localID": 372
        }, {
          "text": "http://www.youtube.com/watch?v=0Bmhjf0rKe8 hello kitty Wereeeeeee",
          "timestamp": "2012-12-13T19:15:28.285Z",
          "fetchnotes_id": "50ca287929d3697f23000eb9",
          "id": "5187438841cec47f0e0e789f",
          "status": "update",
          "localID": 373
        }, {
          "text": "http://vimeo.com/39112596",
          "timestamp": "2012-12-12T22:38:27.023Z",
          "fetchnotes_id": "50c9076329d3697f44000c81",
          "id": "51874385a267c9d8100fb547",
          "status": "update",
          "localID": 374
        }, {
          "text": "http://money.cnn.com/2012/12/12/news/economy/federal-reserve-stimulus/index.html?hpt=hp_t3",
          "timestamp": "2012-12-12T22:53:02.619Z",
          "fetchnotes_id": "50c90ace29d3697f44000c82",
          "id": "5187438541cec47f0e0e781e",
          "status": "synced",
          "localID": 375
        }, {
          "text": "#movies the matrix",
          "timestamp": "2012-12-07T23:56:06.776Z",
          "fetchnotes_id": "50c2821629d3694d4d000a6a",
          "id": "5187436f41cec47f0e0e7505",
          "status": "synced",
          "localID": 376
        }, {
          "text": "#grocery oats",
          "timestamp": "2012-12-08T00:17:03.006Z",
          "fetchnotes_id": "50c286ff29d3694d4d000a71",
          "id": "5187436f41cec47f0e0e7503",
          "status": "synced",
          "localID": 377
        }, {
          "text": "#grocery eggs",
          "timestamp": "2012-12-08T00:13:00.736Z",
          "fetchnotes_id": "50c2860c29d3694d4d000a6f",
          "id": "5187436fa267c9d8100fb1f3",
          "status": "delete",
          "localID": 378
        }, {
          "text": "#movies primer",
          "timestamp": "2012-12-08T00:19:36.740Z",
          "fetchnotes_id": "50c2879829d3694d42000ac4",
          "id": "5187436f41cec47f0e0e7501",
          "status": "create",
          "localID": 379
        }, {
          "text": "#movies pulp fiction",
          "timestamp": "2012-12-08T00:19:58.754Z",
          "fetchnotes_id": "50c287ae29d3694d4d000a72",
          "id": "5187436fa267c9d8100fb1f0",
          "status": "synced",
          "localID": 380
        }, {
          "text": "https://www.frenchnotes.com",
          "timestamp": "2012-12-06T18:50:54.911Z",
          "fetchnotes_id": "50c0e90e29d3694d420006b7",
          "id": "5187436541cec47f0e0e73d3",
          "status": "create",
          "localID": 381
        }, {
          "text": "shantaram, #read",
          "timestamp": "2012-12-06T03:52:40.811Z",
          "fetchnotes_id": "5099962529d3694fc70000eb",
          "id": "51874361a267c9d8100fafe1",
          "status": "create",
          "localID": 382
        }, {
          "text": "fetchnotesGhetto what what #read",
          "timestamp": "2012-12-06T03:23:22.491Z",
          "fetchnotes_id": "5081f29729d369479b0008ef",
          "id": "51874361a267c9d8100fafdd",
          "status": "create",
          "localID": 383
        }, {
          "text": "woop woop",
          "timestamp": "2012-12-05T02:12:35.588Z",
          "fetchnotes_id": "50bead9329d3694d580003d6",
          "id": "5187435d41cec47f0e0e72c1",
          "status": "delete",
          "localID": 384
        }, {
          "text": "woop #woot",
          "timestamp": "2012-12-05T02:12:40.642Z",
          "fetchnotes_id": "50bead9829d3694d4200048b",
          "id": "5187435d41cec47f0e0e72c0",
          "status": "create",
          "localID": 385
        }, {
          "text": "#read rothbard",
          "timestamp": "2012-12-05T02:12:56.185Z",
          "fetchnotes_id": "50beada829d3694d580003d8",
          "id": "5187435d41cec47f0e0e72bf",
          "status": "create",
          "localID": 386
        }, {
          "text": "#read zarathustra",
          "timestamp": "2012-12-05T02:13:02.533Z",
          "fetchnotes_id": "50beadae29d3694d580003d9",
          "id": "5187435d41cec47f0e0e72be",
          "status": "update",
          "localID": 387
        }, {
          "text": "#read #books do more faster",
          "timestamp": "2012-11-06T23:00:17.387Z",
          "fetchnotes_id": "509992e129d3694fbc000159",
          "id": "518742e7a267c9d8100f9ddd",
          "status": "update",
          "localID": 388
        }, {
          "text": "#read seven habits",
          "timestamp": "2012-11-07T03:05:43.221Z",
          "fetchnotes_id": "5099cfa729d3694fd200013a",
          "id": "518742e641cec47f0e0e6221",
          "status": "update",
          "localID": 389
        }, {
          "text": "#todo #woot #woot",
          "timestamp": "2012-11-06T20:48:10.418Z",
          "fetchnotes_id": "5099778a29d3694fbc00012d",
          "id": "518742e6a267c9d8100f9dca",
          "status": "synced",
          "localID": 390
        }, {
          "text": "#woot yeah #dopesauce",
          "timestamp": "2012-10-30T17:46:52.365Z",
          "fetchnotes_id": "5090128c29d3695c1f00009d",
          "id": "518742d041cec47f0e0e5f23",
          "status": "create",
          "localID": 391
        }, {
          "text": "#Todo Stress Less about #project",
          "timestamp": "2012-10-19T23:22:46.851Z",
          "fetchnotes_id": "5081e0c629d369477d00088c",
          "id": "518742b541cec47f0e0e5b65",
          "status": "synced",
          "localID": 392
        }, {
          "text": "#aaaaaaasssa",
          "timestamp": "2012-10-19T23:29:02.576Z",
          "fetchnotes_id": "506647a129d36917ea000300",
          "id": "518742b541cec47f0e0e5b63",
          "status": "update",
          "localID": 393
        }, {
          "text": "Hindi \nD\nX\nD\nD\nX\nX\nX\nX\nX\nX\nX\nX\nX\nX\nX\nX\nX\nX\nX\nZ\nZ\nZ\nZx",
          "timestamp": "2012-10-19T00:29:11.307Z",
          "fetchnotes_id": "507f9ff529d36947880006e0",
          "id": "518742b341cec47f0e0e5b23",
          "status": "update",
          "localID": 394
        }, {
          "text": "#Yooo",
          "timestamp": "2012-10-16T21:27:53.669Z",
          "fetchnotes_id": "507dd15929d369477d000578",
          "id": "518742ada267c9d8100f953d",
          "status": "update",
          "localID": 395
        }, {
          "text": "heyo #todo",
          "timestamp": "2012-10-15T22:19:48.454Z",
          "fetchnotes_id": "507c8c0429d369477d000475",
          "id": "518742a941cec47f0e0e59da",
          "status": "update",
          "localID": 396
        }, {
          "text": "poop",
          "timestamp": "2012-10-12T21:40:56.512Z",
          "fetchnotes_id": "50788e6829d369479b00011d",
          "id": "518742a141cec47f0e0e58c6",
          "status": "delete",
          "localID": 397
        }, {
          "text": "Hdjsbs",
          "timestamp": "2012-10-09T18:21:21.379Z",
          "fetchnotes_id": "50668dee29d36917ea00035e",
          "id": "5187429441cec47f0e0e56e3",
          "status": "create",
          "localID": 398
        }, {
          "text": "Djisshsjjss",
          "timestamp": "2012-10-09T18:21:21.343Z",
          "fetchnotes_id": "50668dee29d36917f7000300",
          "id": "51874294a267c9d8100f918c",
          "status": "synced",
          "localID": 399
        }, {
          "text": "11:15",
          "timestamp": "2012-10-09T18:21:21.315Z",
          "fetchnotes_id": "5064b7cf29d36917df000142",
          "id": "51874294a267c9d8100f918b",
          "status": "update",
          "localID": 400
        }, {
          "text": "Shaken s",
          "timestamp": "2012-10-09T18:21:21.506Z",
          "fetchnotes_id": "5069bd6629d3695480000015",
          "id": "5187429441cec47f0e0e56e2",
          "status": "delete",
          "localID": 401
        }, {
          "text": "Hi",
          "timestamp": "2012-10-09T18:21:21.508Z",
          "fetchnotes_id": "50668f8829d36917ea000367",
          "id": "5187429441cec47f0e0e56e1",
          "status": "synced",
          "localID": 402
        }, {
          "text": "boom",
          "timestamp": "2012-10-09T18:21:44.660Z",
          "fetchnotes_id": "506378a529d36976240001ed",
          "id": "51874294a267c9d8100f918a",
          "status": "delete",
          "localID": 403
        }, {
          "text": "DF",
          "timestamp": "2012-10-09T18:21:21.766Z",
          "fetchnotes_id": "5063adf429d369164c000007",
          "id": "51874294a267c9d8100f9189",
          "status": "update",
          "localID": 404
        }, {
          "text": "Yay",
          "timestamp": "2012-10-09T18:21:21.523Z",
          "fetchnotes_id": "5069ba8629d3695475000033",
          "id": "51874294a267c9d8100f9188",
          "status": "delete",
          "localID": 405
        }, {
          "text": "yay new note DDR",
          "timestamp": "2012-10-09T18:22:06.421Z",
          "fetchnotes_id": "50731be429d3697d040005d3",
          "id": "5187429441cec47f0e0e56e0",
          "status": "update",
          "localID": 406
        }, {
          "text": "Pee",
          "timestamp": "2012-10-09T18:21:45.163Z",
          "fetchnotes_id": "507330e729d3697d0f000653",
          "id": "5187429441cec47f0e0e56df",
          "status": "synced",
          "localID": 407
        }, {
          "text": "Hhhhk",
          "timestamp": "2012-10-09T18:22:06.414Z",
          "fetchnotes_id": "50732e5f29d3697d1a0005f7",
          "id": "5187429441cec47f0e0e56de",
          "status": "create",
          "localID": 408
        }, {
          "text": "yay a new note",
          "timestamp": "2012-10-09T18:21:44.660Z",
          "fetchnotes_id": "5063578129d36976190001b3",
          "id": "51874294a267c9d8100f9187",
          "status": "create",
          "localID": 409
        }, {
          "text": "Weeee",
          "timestamp": "2012-10-09T18:22:06.505Z",
          "fetchnotes_id": "50732ee229d3697d040005ef",
          "id": "51874294a267c9d8100f9186",
          "status": "delete",
          "localID": 410
        }, {
          "text": "Ghh",
          "timestamp": "2012-10-09T18:22:06.577Z",
          "fetchnotes_id": "50732dba29d3697d040005e9",
          "id": "5187429441cec47f0e0e56dd",
          "status": "create",
          "localID": 411
        }, {
          "text": "wjkel hi yes okay",
          "timestamp": "2012-10-09T18:22:06.560Z",
          "fetchnotes_id": "50734eb329d3697d0400061e",
          "id": "51874294a267c9d8100f9185",
          "status": "update",
          "localID": 412
        }, {
          "text": "Uluru",
          "timestamp": "2012-10-09T18:22:06.581Z",
          "fetchnotes_id": "5073311b29d3697d040005f3",
          "id": "5187429441cec47f0e0e56dc",
          "status": "update",
          "localID": 413
        }, {
          "text": "Ty",
          "timestamp": "2012-10-09T18:22:06.580Z",
          "fetchnotes_id": "50732e0229d3697d040005ea",
          "id": "51874294a267c9d8100f9183",
          "status": "synced",
          "localID": 414
        }, {
          "text": "Jfjfjdhd",
          "timestamp": "2012-10-09T19:24:55.155Z",
          "fetchnotes_id": "5069c50f29d3695480000026",
          "id": "5187429341cec47f0e0e56d5",
          "status": "synced",
          "localID": 415
        }, {
          "text": "Cvbbxbnbb",
          "timestamp": "2012-10-09T19:24:55.153Z",
          "fetchnotes_id": "5066839d29d36917df000364",
          "id": "5187429341cec47f0e0e56d4",
          "status": "delete",
          "localID": 416
        }, {
          "text": "no bhjb gghjnh",
          "timestamp": "2012-10-09T19:24:55.203Z",
          "fetchnotes_id": "50637ac929d369760e00021e",
          "id": "5187429341cec47f0e0e56d3",
          "status": "delete",
          "localID": 417
        }, {
          "text": "ONE THOUSAND CENTS",
          "timestamp": "2012-10-09T19:24:55.159Z",
          "fetchnotes_id": "5063792729d3697603000199",
          "id": "51874293a267c9d8100f917a",
          "status": "delete",
          "localID": 418
        }, {
          "text": "DFDF",
          "timestamp": "2012-10-09T19:25:18.365Z",
          "fetchnotes_id": "5063adf729d3691636000009",
          "id": "51874293a267c9d8100f9178",
          "status": "update",
          "localID": 419
        }, {
          "text": "FDFD",
          "timestamp": "2012-10-09T19:25:18.376Z",
          "fetchnotes_id": "5063adf629d3691641000004",
          "id": "5187429341cec47f0e0e56d1",
          "status": "update",
          "localID": 420
        }, {
          "text": "Bskansisz",
          "timestamp": "2012-10-09T19:25:18.361Z",
          "fetchnotes_id": "5069d27129d369548000003c",
          "id": "51874293a267c9d8100f9177",
          "status": "delete",
          "localID": 421
        }, {
          "text": "Chxhchch. Hhhh",
          "timestamp": "2012-10-09T19:25:18.430Z",
          "fetchnotes_id": "5069cf5129d369548b000048",
          "id": "51874293a267c9d8100f9176",
          "status": "delete",
          "localID": 422
        }, {
          "text": "a different timestamp for a new note hhh",
          "timestamp": "2012-10-09T19:25:18.525Z",
          "fetchnotes_id": "5063579329d369762400019e",
          "id": "5187429341cec47f0e0e56d0",
          "status": "synced",
          "localID": 423
        }, {
          "text": "Jakabsj test",
          "timestamp": "2012-10-09T19:25:18.729Z",
          "fetchnotes_id": "5069d24d29d369546a000047",
          "id": "51874293a267c9d8100f9175",
          "status": "update",
          "localID": 424
        }, {
          "text": "Isbsbsksk",
          "timestamp": "2012-10-09T19:25:18.713Z",
          "fetchnotes_id": "5069d24d29d369548000003b",
          "id": "5187429341cec47f0e0e56cf",
          "status": "create",
          "localID": 425
        }, {
          "text": "Banalal",
          "timestamp": "2012-10-09T19:25:18.611Z",
          "fetchnotes_id": "50668df929d36917f7000301",
          "id": "51874293a267c9d8100f9174",
          "status": "synced",
          "localID": 426
        }, {
          "text": "Guggthvfh",
          "timestamp": "2012-10-09T20:48:57.051Z",
          "fetchnotes_id": "50748db629d3697d0f0007a8",
          "id": "51874293a267c9d8100f9166",
          "status": "create",
          "localID": 427
        }, {
          "text": "hi",
          "timestamp": "2012-10-09T18:14:58.036Z",
          "fetchnotes_id": "50734e6e29d3697d0400061d",
          "id": "5187429241cec47f0e0e56af",
          "status": "update",
          "localID": 428
        }, {
          "text": "watch mike",
          "timestamp": "2012-10-09T18:14:58.005Z",
          "fetchnotes_id": "50734ec629d3697cf90006ca",
          "id": "5187429241cec47f0e0e56ad",
          "status": "delete",
          "localID": 429
        }, {
          "text": "yees",
          "timestamp": "2012-10-09T18:14:57.998Z",
          "fetchnotes_id": "50734f0c29d3697d1a00061b",
          "id": "51874291a267c9d8100f911d",
          "status": "create",
          "localID": 430
        }, {
          "text": "helloo oaiwefoi jawoiefj",
          "timestamp": "2012-09-29T04:50:09.678Z",
          "fetchnotes_id": "50667e0129d36917ea000333",
          "id": "5187426b41cec47f0e0e5130",
          "status": "delete",
          "localID": 431
        }, {
          "text": "Hdkeodhd",
          "timestamp": "2012-09-29T04:55:13.531Z",
          "fetchnotes_id": "50667f3129d36917ea000335",
          "id": "5187426ba267c9d8100f8bce",
          "status": "update",
          "localID": 432
        }, {
          "text": "Ueusy",
          "timestamp": "2012-09-29T04:50:36.633Z",
          "fetchnotes_id": "50667e1c29d36917df00035a",
          "id": "5187426b41cec47f0e0e512f",
          "status": "delete",
          "localID": 433
        }, {
          "text": "What upppppp",
          "timestamp": "2012-09-29T04:50:27.412Z",
          "fetchnotes_id": "50667e1329d36918020002e1",
          "id": "5187426b41cec47f0e0e512e",
          "status": "synced",
          "localID": 434
        }, {
          "text": "Fugu",
          "timestamp": "2012-09-29T05:04:54.389Z",
          "fetchnotes_id": "5066817629d36917ea00033a",
          "id": "5187426ba267c9d8100f8bcd",
          "status": "create",
          "localID": 435
        }, {
          "text": "TygfjdUcicicihiiviv",
          "timestamp": "2012-09-29T05:13:43.280Z",
          "fetchnotes_id": "5066838729d36917ea00033b",
          "id": "5187426b41cec47f0e0e512c",
          "status": "create",
          "localID": 436
        }, {
          "text": "Fificjcjcviv",
          "timestamp": "2012-09-29T05:13:53.832Z",
          "fetchnotes_id": "5066839129d36917df000363",
          "id": "5187426b41cec47f0e0e512b",
          "status": "synced",
          "localID": 437
        }, {
          "text": "Fificjcjcviv",
          "timestamp": "2012-09-29T05:13:54.241Z",
          "fetchnotes_id": "5066839229d36917ea00033c",
          "id": "5187426ba267c9d8100f8bcc",
          "status": "create",
          "localID": 438
        }, {
          "text": "Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note Here is a super long note",
          "timestamp": "2012-09-28T23:21:45.856Z",
          "fetchnotes_id": "5066310929d369180200027c",
          "id": "5187426aa267c9d8100f8bb2",
          "status": "synced",
          "localID": 439
        }, {
          "text": "@alex - via @foo",
          "timestamp": "2012-09-28T16:35:35.557Z",
          "fetchnotes_id": "5065d1d729d36917f7000225",
          "id": "51874269a267c9d8100f8b81",
          "status": "create",
          "localID": 440
        }, {
          "text": "asdfasd",
          "timestamp": "2012-09-28T17:16:39.873Z",
          "fetchnotes_id": "5065db7729d3691802000221",
          "id": "51874269a267c9d8100f8b7d",
          "status": "update",
          "localID": 441
        }, {
          "text": "Alex",
          "timestamp": "2012-09-27T20:14:00.965Z",
          "fetchnotes_id": "5064b38829d36917ea00010d",
          "id": "5187426641cec47f0e0e505d",
          "status": "update",
          "localID": 442
        }, {
          "text": "Llll",
          "timestamp": "2012-09-27T20:14:50.979Z",
          "fetchnotes_id": "5064b3ba29d36917df00013d",
          "id": "51874266a267c9d8100f8afc",
          "status": "synced",
          "localID": 443
        }, {
          "text": "Abc",
          "timestamp": "2012-09-27T20:14:59.511Z",
          "fetchnotes_id": "5064b3c329d36917f7000119",
          "id": "51874266a267c9d8100f8afb",
          "status": "synced",
          "localID": 444
        }, {
          "text": "Habbdbd",
          "timestamp": "2012-09-27T20:15:43.148Z",
          "fetchnotes_id": "5064b3ef29d36917df00013e",
          "id": "5187426641cec47f0e0e505a",
          "status": "delete",
          "localID": 445
        }, {
          "text": "Babbage",
          "timestamp": "2012-09-27T20:19:13.899Z",
          "fetchnotes_id": "5064b4c129d36917f700011b",
          "id": "51874266a267c9d8100f8af9",
          "status": "delete",
          "localID": 446
        }, {
          "text": "Shd",
          "timestamp": "2012-09-27T20:19:15.807Z",
          "fetchnotes_id": "5064b4c329d36917ea00010f",
          "id": "51874266a267c9d8100f8af8",
          "status": "create",
          "localID": 447
        }, {
          "text": "AndGh",
          "timestamp": "2012-09-27T20:19:17.074Z",
          "fetchnotes_id": "5064b4c529d36917ea000110",
          "id": "5187426641cec47f0e0e5059",
          "status": "delete",
          "localID": 448
        }, {
          "text": "Lets do to thy plae",
          "timestamp": "2012-09-27T20:20:06.613Z",
          "fetchnotes_id": "5064b4f629d36917ea000112",
          "id": "5187426641cec47f0e0e5058",
          "status": "create",
          "localID": 449
        }, {
          "text": "Lets do to this place",
          "timestamp": "2012-09-27T20:19:54.624Z",
          "fetchnotes_id": "5064b4ea29d36917ea000111",
          "id": "5187426641cec47f0e0e5057",
          "status": "synced",
          "localID": 450
        }, {
          "text": "Go",
          "timestamp": "2012-09-27T20:20:45.758Z",
          "fetchnotes_id": "5064b51d29d36918020000f0",
          "id": "51874266a267c9d8100f8af7",
          "status": "synced",
          "localID": 451
        }, {
          "text": "Anv",
          "timestamp": "2012-09-27T20:31:36.865Z",
          "fetchnotes_id": "5064b7a829d36917f700011d",
          "id": "51874266a267c9d8100f8af4",
          "status": "update",
          "localID": 452
        }, {
          "text": "Abc",
          "timestamp": "2012-09-27T20:32:03.407Z",
          "fetchnotes_id": "5064b7c329d36917ea000114",
          "id": "51874266a267c9d8100f8af3",
          "status": "update",
          "localID": 453
        }, {
          "text": "Alebxg",
          "timestamp": "2012-09-27T20:48:20.078Z",
          "fetchnotes_id": "5064bb9429d36918020000ff",
          "id": "51874266a267c9d8100f8aec",
          "status": "delete",
          "localID": 454
        }, {
          "text": "Hello, hooray!!!!!!",
          "timestamp": "2012-09-27T21:30:49.547Z",
          "fetchnotes_id": "5064bb1e29d36917df000144",
          "id": "5187426541cec47f0e0e504a",
          "status": "synced",
          "localID": 455
        }, {
          "text": "yay",
          "timestamp": "2012-09-27T17:11:51.260Z",
          "fetchnotes_id": "506488d729d36917ea0000c0",
          "id": "5187426341cec47f0e0e5018",
          "status": "update",
          "localID": 456
        }, {
          "text": "newest note",
          "timestamp": "2012-09-27T17:48:02.155Z",
          "fetchnotes_id": "5064915229d36917f70000ce",
          "id": "51874263a267c9d8100f8aa6",
          "status": "create",
          "localID": 457
        }, {
          "text": "Jsisjs",
          "timestamp": "2012-09-27T18:45:37.098Z",
          "fetchnotes_id": "50649ed129d36918020000da",
          "id": "51874263a267c9d8100f8a95",
          "status": "update",
          "localID": 458
        }, {
          "text": "poo",
          "timestamp": "2012-09-27T03:05:52.417Z",
          "fetchnotes_id": "5063c29029d36917df00001a",
          "id": "51874262a267c9d8100f8a6a",
          "status": "update",
          "localID": 459
        }, {
          "text": "heyo",
          "timestamp": "2012-09-27T01:09:03.822Z",
          "fetchnotes_id": "5063a72f29d36910fa00000c",
          "id": "5187426141cec47f0e0e4fac",
          "status": "update",
          "localID": 460
        }, {
          "text": "la dI day",
          "timestamp": "2012-09-27T01:26:37.431Z",
          "fetchnotes_id": "5063ab4d29d3691636000000",
          "id": "5187426141cec47f0e0e4faa",
          "status": "create",
          "localID": 461
        }, {
          "text": "Hey yo CORS is badass",
          "timestamp": "2012-09-27T01:35:39.415Z",
          "fetchnotes_id": "5063ad6b29d3691641000003",
          "id": "5187426141cec47f0e0e4fa8",
          "status": "synced",
          "localID": 462
        }, {
          "text": "FGDFDF",
          "timestamp": "2012-09-27T01:37:56.004Z",
          "fetchnotes_id": "5063adf429d369164c000006",
          "id": "51874261a267c9d8100f8a3a",
          "status": "delete",
          "localID": 463
        }, {
          "text": "FD",
          "timestamp": "2012-09-27T01:37:56.700Z",
          "fetchnotes_id": "5063adf429d3691629000008",
          "id": "5187426141cec47f0e0e4fa7",
          "status": "synced",
          "localID": 464
        }, {
          "text": "DF",
          "timestamp": "2012-09-27T01:37:57.321Z",
          "fetchnotes_id": "5063adf529d369164c000008",
          "id": "5187426141cec47f0e0e4fa6",
          "status": "synced",
          "localID": 465
        }, {
          "text": "DF",
          "timestamp": "2012-09-27T01:37:57.601Z",
          "fetchnotes_id": "5063adf529d3691636000007",
          "id": "51874261a267c9d8100f8a39",
          "status": "update",
          "localID": 466
        }, {
          "text": "DFF",
          "timestamp": "2012-09-27T01:37:58.275Z",
          "fetchnotes_id": "5063adf629d369164c000009",
          "id": "5187426141cec47f0e0e4fa5",
          "status": "update",
          "localID": 467
        }, {
          "text": "what up wiener",
          "timestamp": "2012-09-27T02:12:11.596Z",
          "fetchnotes_id": "5063b5fb29d3691802000001",
          "id": "5187426141cec47f0e0e4fa0",
          "status": "create",
          "localID": 468
        }, {
          "text": "@matt what up - via @foo",
          "timestamp": "2012-09-27T02:14:08.551Z",
          "fetchnotes_id": "5063b67029d36917ea000002",
          "id": "5187426141cec47f0e0e4f9f",
          "status": "update",
          "localID": 469
        }, {
          "text": "post moar notes",
          "timestamp": "2012-09-27T03:03:28.975Z",
          "fetchnotes_id": "5063c20029d36917ea000008",
          "id": "5187426041cec47f0e0e4f99",
          "status": "create",
          "localID": 470
        }, {
          "text": "yay success callback",
          "timestamp": "2012-09-27T03:04:22.836Z",
          "fetchnotes_id": "5063c23629d36917f7000008",
          "id": "51874260a267c9d8100f8a29",
          "status": "create",
          "localID": 471
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-06T01:02:31.367Z",
          "id": "5187396841cec47f0e0e035c",
          "status": "create",
          "localID": 472
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T01:02:29.454Z",
          "id": "5187396641cec47f0e0e035b",
          "status": "create",
          "localID": 473
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T01:02:28.070Z",
          "id": "51873965a267c9d8100f39fa",
          "status": "delete",
          "localID": 474
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-06T00:08:19.487Z",
          "id": "51872cb441cec47f0e0e030c",
          "status": "create",
          "localID": 475
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T00:08:17.878Z",
          "id": "51872cb2a267c9d8100f3999",
          "status": "delete",
          "localID": 476
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T00:08:16.899Z",
          "id": "51872cb1a267c9d8100f3998",
          "status": "create",
          "localID": 477
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-06T00:02:47.378Z",
          "id": "51872b6741cec47f0e0e0301",
          "status": "create",
          "localID": 478
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T00:02:45.819Z",
          "id": "51872b66a267c9d8100f398d",
          "status": "update",
          "localID": 479
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-06T00:02:44.717Z",
          "id": "51872b6541cec47f0e0e02ff",
          "status": "create",
          "localID": 480
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T20:36:13.286Z",
          "id": "5186fafea267c9d8100f387c",
          "status": "create",
          "localID": 481
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T20:36:10.128Z",
          "id": "5186fafaa267c9d8100f387b",
          "status": "create",
          "localID": 482
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T20:36:06.848Z",
          "id": "5186faf8a267c9d8100f387a",
          "status": "create",
          "localID": 483
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:48:35.184Z",
          "id": "5186efd4a267c9d8100f381f",
          "status": "update",
          "localID": 484
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:48:35.812Z",
          "id": "5186efd4a267c9d8100f381e",
          "status": "delete",
          "localID": 485
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:48:35.534Z",
          "id": "5186efd4a267c9d8100f381d",
          "status": "create",
          "localID": 486
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:46:57.530Z",
          "id": "5186ef7241cec47f0e0e010b",
          "status": "delete",
          "localID": 487
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:46:57.049Z",
          "id": "5186ef7241cec47f0e0e010a",
          "status": "create",
          "localID": 488
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:46:57.282Z",
          "id": "5186ef72a267c9d8100f381c",
          "status": "synced",
          "localID": 489
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:46:49.921Z",
          "id": "5186ef6b41cec47f0e0e0109",
          "status": "create",
          "localID": 490
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:46:44.527Z",
          "id": "5186ef6b41cec47f0e0e0108",
          "status": "delete",
          "localID": 491
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:46:46.927Z",
          "id": "5186ef6ba267c9d8100f381b",
          "status": "create",
          "localID": 492
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:42:57.412Z",
          "id": "5186ee8241cec47f0e0e00f6",
          "status": "synced",
          "localID": 493
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:42:57.122Z",
          "id": "5186ee8241cec47f0e0e00f5",
          "status": "synced",
          "localID": 494
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:42:56.732Z",
          "id": "5186ee82a267c9d8100f3818",
          "status": "update",
          "localID": 495
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:36:35.930Z",
          "id": "5186ed04a267c9d8100f3814",
          "status": "delete",
          "localID": 496
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:36:36.393Z",
          "id": "5186ed04a267c9d8100f3813",
          "status": "create",
          "localID": 497
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:36:36.176Z",
          "id": "5186ed0441cec47f0e0e00e1",
          "status": "create",
          "localID": 498
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:34:58.260Z",
          "id": "5186eca3a267c9d8100f380f",
          "status": "update",
          "localID": 499
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:34:57.912Z",
          "id": "5186eca2a267c9d8100f380e",
          "status": "delete",
          "localID": 500
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:34:57.630Z",
          "id": "5186eca2a267c9d8100f380d",
          "status": "update",
          "localID": 501
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T19:34:37.547Z",
          "id": "5186ec8e41cec47f0e0e00df",
          "status": "delete",
          "localID": 502
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:34:33.616Z",
          "id": "5186ec8a41cec47f0e0e00de",
          "status": "create",
          "localID": 503
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:34:34.406Z",
          "id": "5186ec8aa267c9d8100f380b",
          "status": "synced",
          "localID": 504
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:34:34.052Z",
          "id": "5186ec8aa267c9d8100f380a",
          "status": "create",
          "localID": 505
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:34:33.830Z",
          "id": "5186ec8aa267c9d8100f3809",
          "status": "create",
          "localID": 506
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:34:31.938Z",
          "id": "5186ec89a267c9d8100f3808",
          "status": "create",
          "localID": 507
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T19:34:20.796Z",
          "id": "5186ec7d41cec47f0e0e00dd",
          "status": "update",
          "localID": 508
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:34:18.640Z",
          "id": "5186ec7ba267c9d8100f3807",
          "status": "delete",
          "localID": 509
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:34:17.592Z",
          "id": "5186ec7aa267c9d8100f3806",
          "status": "create",
          "localID": 510
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T19:33:46.123Z",
          "id": "5186ec5a41cec47f0e0e00db",
          "status": "update",
          "localID": 511
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:33:45.861Z",
          "id": "5186ec5a41cec47f0e0e00da",
          "status": "create",
          "localID": 512
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T19:33:45.541Z",
          "id": "5186ec5aa267c9d8100f3805",
          "status": "update",
          "localID": 513
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T19:33:44.750Z",
          "id": "5186ec5941cec47f0e0e00d9",
          "status": "update",
          "localID": 514
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:33:42.781Z",
          "id": "5186ec57a267c9d8100f3804",
          "status": "synced",
          "localID": 515
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:33:40.742Z",
          "id": "5186ec55a267c9d8100f3803",
          "status": "create",
          "localID": 516
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T19:19:49.958Z",
          "id": "5186e917a267c9d8100f37c7",
          "status": "synced",
          "localID": 517
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T19:19:49.058Z",
          "id": "5186e91541cec47f0e0e00bb",
          "status": "update",
          "localID": 518
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:19:47.486Z",
          "id": "5186e91441cec47f0e0e00ba",
          "status": "delete",
          "localID": 519
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T19:19:45.216Z",
          "id": "5186e91241cec47f0e0e00b9",
          "status": "delete",
          "localID": 520
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:56:17.066Z",
          "id": "5186e39141cec47f0e0e00af",
          "status": "create",
          "localID": 521
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:56:16.429Z",
          "id": "5186e39141cec47f0e0e00ae",
          "status": "synced",
          "localID": 522
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:56:16.714Z",
          "id": "5186e39141cec47f0e0e00ad",
          "status": "synced",
          "localID": 523
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:47:22.859Z",
          "id": "5186e17ba267c9d8100f378e",
          "status": "update",
          "localID": 524
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:47:23.172Z",
          "id": "5186e17b41cec47f0e0e00aa",
          "status": "create",
          "localID": 525
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:46:41.655Z",
          "id": "5186e15241cec47f0e0e00a8",
          "status": "create",
          "localID": 526
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:46:41.367Z",
          "id": "5186e152a267c9d8100f3783",
          "status": "create",
          "localID": 527
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:46:41.091Z",
          "id": "5186e15241cec47f0e0e00a7",
          "status": "create",
          "localID": 528
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:45:54.798Z",
          "id": "5186e12341cec47f0e0e00a4",
          "status": "update",
          "localID": 529
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:45:54.103Z",
          "id": "5186e123a267c9d8100f377b",
          "status": "delete",
          "localID": 530
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:45:54.505Z",
          "id": "5186e123a267c9d8100f377a",
          "status": "create",
          "localID": 531
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:45:25.761Z",
          "id": "5186e10641cec47f0e0e00a2",
          "status": "delete",
          "localID": 532
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:45:25.469Z",
          "id": "5186e106a267c9d8100f3779",
          "status": "synced",
          "localID": 533
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:45:25.137Z",
          "id": "5186e106a267c9d8100f3778",
          "status": "update",
          "localID": 534
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:44:38.216Z",
          "id": "5186e0d6a267c9d8100f3772",
          "status": "update",
          "localID": 535
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:44:37.895Z",
          "id": "5186e0d641cec47f0e0e0099",
          "status": "synced",
          "localID": 536
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:44:37.620Z",
          "id": "5186e0d641cec47f0e0e0098",
          "status": "synced",
          "localID": 537
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:44:07.526Z",
          "id": "5186e0b841cec47f0e0e0097",
          "status": "synced",
          "localID": 538
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:44:07.175Z",
          "id": "5186e0b841cec47f0e0e0096",
          "status": "create",
          "localID": 539
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:44:07.799Z",
          "id": "5186e0b8a267c9d8100f3771",
          "status": "synced",
          "localID": 540
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:40:15.750Z",
          "id": "5186dfd041cec47f0e0e0091",
          "status": "synced",
          "localID": 541
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:40:15.243Z",
          "id": "5186dfd041cec47f0e0e0090",
          "status": "synced",
          "localID": 542
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:40:15.485Z",
          "id": "5186dfd0a267c9d8100f376d",
          "status": "create",
          "localID": 543
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:39:22.815Z",
          "id": "5186df9ba267c9d8100f376a",
          "status": "delete",
          "localID": 544
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:39:22.267Z",
          "id": "5186df9b41cec47f0e0e008c",
          "status": "update",
          "localID": 545
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:39:22.518Z",
          "id": "5186df9b41cec47f0e0e008b",
          "status": "update",
          "localID": 546
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:38:15.014Z",
          "id": "5186df5841cec47f0e0e008a",
          "status": "create",
          "localID": 547
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:38:15.297Z",
          "id": "5186df57a267c9d8100f3769",
          "status": "update",
          "localID": 548
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:38:15.550Z",
          "id": "5186df5741cec47f0e0e0089",
          "status": "create",
          "localID": 549
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:36:21.737Z",
          "id": "5186dee641cec47f0e0e0087",
          "status": "synced",
          "localID": 550
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:36:21.491Z",
          "id": "5186dee641cec47f0e0e0086",
          "status": "delete",
          "localID": 551
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:36:21.239Z",
          "id": "5186dee6a267c9d8100f3767",
          "status": "create",
          "localID": 552
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:35:18.862Z",
          "id": "5186dea7a267c9d8100f3766",
          "status": "create",
          "localID": 553
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:35:18.303Z",
          "id": "5186dea7a267c9d8100f3765",
          "status": "update",
          "localID": 554
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:35:18.554Z",
          "id": "5186dea7a267c9d8100f3764",
          "status": "delete",
          "localID": 555
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T18:35:17.569Z",
          "id": "5186dea5a267c9d8100f3763",
          "status": "create",
          "localID": 556
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T18:35:16.016Z",
          "id": "5186dea4a267c9d8100f3761",
          "status": "synced",
          "localID": 557
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T18:35:14.849Z",
          "id": "5186dea3a267c9d8100f375f",
          "status": "synced",
          "localID": 558
        }, {
          "text": "poop",
          "timestamp": "2013-05-05T18:30:37.496Z",
          "id": "5186dd8d41cec47f0e0e007e",
          "status": "synced",
          "localID": 559
        }, {
          "text": "unoriginal note",
          "timestamp": "2013-05-05T18:30:37.196Z",
          "id": "5186dd8d41cec47f0e0e007d",
          "status": "delete",
          "localID": 560
        }, {
          "text": "bar",
          "timestamp": "2013-05-05T18:30:36.954Z",
          "id": "5186dd8da267c9d8100f375e",
          "status": "create",
          "localID": 561
        }, {
          "text": "http://fb.com is cool alex@alexschiff.com",
          "timestamp": "2013-05-05T18:30:36.122Z",
          "id": "5186dd8c41cec47f0e0e007c",
          "status": "delete",
          "localID": 562
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T18:30:34.631Z",
          "id": "5186dd8b41cec47f0e0e007b",
          "status": "synced",
          "localID": 563
        }, {
          "text": "pooooop",
          "timestamp": "2013-05-05T18:30:33.407Z",
          "id": "5186dd8aa267c9d8100f375c",
          "status": "create",
          "localID": 564
        }, {
          "text": "Babbd #fetchnotes @foobar - via @foo",
          "timestamp": "2013-01-09T21:25:44.606Z",
          "fetchnotes_id": "5064b3cd29d36917f700011a",
          "id": "5181bdec41cec47f0e05bbaa",
          "status": "synced",
          "localID": 565
        }, {
          "text": "Foo poo barfd dfas dfgd #fetchnotes this is fucking weird #woot #fetchnotes @ch - via @foo",
          "timestamp": "2013-01-09T21:25:44.585Z",
          "fetchnotes_id": "5099518b29d3694fd20000b2",
          "id": "5181bdec41cec47f0e05bba9",
          "status": "update",
          "localID": 566
        }, {
          "text": "@foobar #fetchnotes this app is #dope - via @foo \n\nSksks",
          "timestamp": "2013-01-09T21:25:44.680Z",
          "fetchnotes_id": "507c9af129d369477d00047b",
          "id": "5181bdeca267c9d8100650c3",
          "status": "delete",
          "localID": 567
        }, {
          "text": "hey yeah what's up #fetchnotes woot #fetchnotes what's up @foobar - via @foo",
          "timestamp": "2013-01-09T21:25:44.805Z",
          "fetchnotes_id": "507d604a29d36947720004f0",
          "id": "5181bdeca267c9d8100650c2",
          "status": "update",
          "localID": 568
        }, {
          "text": "@foobar yay a note - via @foo",
          "timestamp": "2013-01-03T20:51:16.548Z",
          "fetchnotes_id": "5075afbf29d3697d0400086d",
          "id": "5181bc2da267c9d81006038c",
          "status": "update",
          "localID": 569
        }, {
          "text": "Heyo #fj yeah what okay @foobar - via @foo",
          "timestamp": "2013-01-03T20:52:20.983Z",
          "fetchnotes_id": "5081eec729d36947720008a4",
          "id": "5181bc2d41cec47f0e057d3f",
          "status": "create",
          "localID": 570
        }, {
          "text": "#read disciplined dreaming",
          "timestamp": "2013-05-01T19:30:30.319Z",
          "id": "51816d5641cec47f0e0006f4",
          "status": "update",
          "localID": 571
        }, {
          "text": "sup",
          "timestamp": "2013-04-30T20:38:27.853Z",
          "id": "517feb4f11bc138f02000068",
          "status": "update",
          "localID": 572
        }, {
          "text": "sup how goes it",
          "timestamp": "2013-04-30T15:51:26.843Z",
          "id": "517fe87f0fb105580b000019",
          "status": "delete",
          "localID": 573
        }, {
          "text": "hey what up",
          "timestamp": "2013-04-30T15:45:13.339Z",
          "id": "517fe70911bc138f0200002e",
          "status": "delete",
          "localID": 574
        }, {
          "text": "#checkthis",
          "timestamp": "2013-04-30T01:08:15.715Z",
          "id": "517f197dab8b044352004a5c",
          "status": "update",
          "localID": 575
        }, {
          "text": "Is this the best way of doing this?",
          "timestamp": "2013-04-30T00:48:12.754Z",
          "id": "517f14c6ab8b044352004a4f",
          "status": "synced",
          "localID": 576
        }, {
          "text": "making a note #checkout   editing that note #checkout",
          "timestamp": "2013-04-29T21:09:24.617Z",
          "id": "517ae3695900568543000001",
          "status": "synced",
          "localID": 577
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "5099518b29d3694fd20000b2",
          "ids": ["512e8ff10813b5d105013c08", "51795c2ec4898535050013f6"],
          "text": "Foo poo barfd dfas dfgd #fetchnotes this is fucking weird #woot #fetchnotes @ch - via @foo",
          "timestamp": "2013-01-09T21:25:44.585Z",
          "id": "51798c03c4898535050169e5",
          "status": "delete",
          "localID": 578
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "5064b3cd29d36917f700011a",
          "ids": ["51795bbdc4898535050007e6", "512e8ff10813b5d105013c08"],
          "text": "Babbd #fetchnotes @foobar - via @foo",
          "timestamp": "2013-01-09T21:25:44.606Z",
          "id": "51798c026f516b500401435e",
          "status": "delete",
          "localID": 579
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "507c9af129d369477d00047b",
          "ids": ["51795bbdc4898535050007e6", "512e8ff10813b5d105013c08"],
          "text": "@foobar #fetchnotes this app is #dope - via @foo \n\nSksks",
          "timestamp": "2013-01-09T21:25:44.680Z",
          "id": "51798c02c4898535050169e4",
          "status": "synced",
          "localID": 580
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "507d604a29d36947720004f0",
          "ids": ["51795bbdc4898535050007e6", "512e8ff10813b5d105013c08"],
          "text": "hey yeah what's up #fetchnotes woot #fetchnotes what's up @foobar - via @foo",
          "timestamp": "2013-01-09T21:25:44.805Z",
          "id": "51798c026f516b500401435d",
          "status": "delete",
          "localID": 581
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "5081eec729d36947720008a4",
          "ids": ["51795bbdc4898535050007e6", "512e8ff10813b5d105013c08"],
          "text": "Heyo #fj yeah what okay @foobar - via @foo",
          "timestamp": "2013-01-03T20:52:20.983Z",
          "id": "51798a326f516b5004013097",
          "status": "synced",
          "localID": 582
        }, {
          "_isTransferred": true,
          "fetchnotes_id": "5075afbf29d3697d0400086d",
          "ids": ["51795bbdc4898535050007e6", "512e8ff10813b5d105013c08"],
          "text": "@foobar yay a note - via @foo",
          "timestamp": "2013-01-03T20:51:16.548Z",
          "id": "51798a32c48985350501531e",
          "status": "create",
          "localID": 583
        }, {
          "text": "Hosed #schodty shifty - via @foo Edit Poop",
          "timestamp": "2013-03-22T02:00:23.227Z",
          "unsubscribed": ["514214bdeb64309f07012193", "514214bdeb64309f07012193", "514214bdeb64309f07012193", "514214bdeb64309f07012193", "514214bdeb64309f07012193"],
          "id": "514b3287e457085304069bd3",
          "status": "delete",
          "localID": 584
        }, {
          "text": "To to to poop boobies #checkout #yay @horaK @Foo - via shifty",
          "timestamp": "2013-03-21T16:17:05.075Z",
          "unsubscribed": ["514214bdeb64309f07012193"],
          "id": "514b238ceb64309f0704fecb",
          "status": "update",
          "localID": 585
        }, {
          "text": "#babel @foo",
          "timestamp": "2013-04-04T23:54:27.010Z",
          "id": "515e12b44d1ef6554c000c0b",
          "status": "create",
          "localID": 586
        }, {
          "text": "@foo sup - via boss",
          "timestamp": "2013-03-26T20:20:57.697Z",
          "unsubscribed": ["512d52e1f88b57db6000c83c"],
          "id": "5152032be45708530406c0bc",
          "status": "update",
          "localID": 587
        }, {
          "text": "@foo heyo - via boss",
          "timestamp": "2013-03-26T19:33:02.426Z",
          "unsubscribed": ["512d52e1f88b57db6000c83c"],
          "id": "5151f7eeeb64309f070522bb",
          "status": "delete",
          "localID": 588
        }, {
          "text": "@foo testing unsubs - via boss",
          "timestamp": "2013-03-26T19:16:01.308Z",
          "unsubscribed": ["512d52e1f88b57db6000c83c"],
          "id": "5151f3f1eb64309f070522b1",
          "status": "delete",
          "localID": 589
        }, {
          "text": "@Foo hiiii - via matt",
          "timestamp": "2013-03-26T00:40:44.257Z",
          "unsubscribed": ["5142155ae457085304022fd8"],
          "id": "5150ee8eeb64309f07051f5e",
          "status": "delete",
          "localID": 590
        }, {
          "text": "@foo what upp - via matt",
          "timestamp": "2013-03-26T00:39:43.327Z",
          "unsubscribed": ["5142155ae457085304022fd8"],
          "id": "5150ee4feb64309f07051f5c",
          "status": "create",
          "localID": 591
        }, {
          "text": "#todo @matt\nMake drawer pretty\nMake view note way more useful. At least a darn time stamp. \nProfile/settings page where they give us info\nBetter autocomplete. Sometimes apple autocorrect gets involved and it's no good.\nI think we can improve core functionality without adding features. It's stupid simple. Let's make it easier. \nWe /need/ lifecycle emails and notifications.\nWe /need/ a way to share outside of Fetchnotes.\nThose should probably be top priority at this point, since we need to increase retention and speed up growth. - via @foo\n\nI think I can turn off apples autocomplete while you are typing a hashtag but no sure",
          "timestamp": "2013-03-22T19:55:43.228Z",
          "id": "514bfc35e457085304069f4f",
          "status": "synced",
          "localID": 592
        }, {
          "text": "Abstract out the whole bright cove page thing. Too many jquery selectors. Too many ids hard coded in #todo @matt - via @foo\n\nThen we can get more creative with different app flows",
          "timestamp": "2013-03-22T06:54:40.963Z",
          "id": "514bff39e457085304069f59",
          "status": "update",
          "localID": 593
        }, {
          "text": "You know how u can tap the top bar to scroll all the way up? Can we do that? @boobs @foo #babel @boobs",
          "timestamp": "2013-03-22T06:12:09.071Z",
          "id": "514bf627eb64309f0705023c",
          "status": "update",
          "localID": 594
        }, {
          "text": "@foo poo - via boobs",
          "timestamp": "2013-03-22T01:47:27.225Z",
          "id": "514bb830e457085304069dfe",
          "status": "create",
          "localID": 595
        }, {
          "text": "That \"test 6\" note lags like shit when I click it. Need to figure out what's up before shipping. boobs - via @foo toooooo many taaaaaaaags",
          "timestamp": "2013-03-21T17:10:09.311Z",
          "id": "514a91c6e457085304069912",
          "status": "synced",
          "localID": 596
        }, {
          "text": "This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole world.  the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole world.  the whole world. .  the whole world. .  the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole world.  the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole world.  the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole world.  the whole world. .  the whole world. .  the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a girl, who cried a rider that drowned the whole world. This is the story of a This is the story of a girl, who cried a rider that drowned the whole world. , who cried This is the story of a girl, who cried a rider that drowned the whole world.  rider that This is the story of a girl, who cried a rider that drowned the whole world.  the whole world. @boobs - via @foo",
          "timestamp": "2013-03-21T16:20:59.736Z",
          "id": "514b1fb3e457085304069b1e",
          "status": "delete",
          "localID": 597
        }, {
          "text": "#babel @boobs - via @foo Edit 2",
          "timestamp": "2013-03-21T15:31:09.268Z",
          "id": "514b26c2eb64309f0704feda",
          "status": "update",
          "localID": 598
        }, {
          "text": "#Woot @horak Hike - via @foo EDIT \n\nEDIT 2",
          "timestamp": "2013-03-21T15:18:02.492Z",
          "id": "514b2337e457085304069b2f",
          "status": "create",
          "localID": 599
        }, {
          "text": "@foo #todo",
          "timestamp": "2013-03-21T15:13:04.483Z",
          "id": "514b2383e457085304069b31",
          "status": "synced",
          "localID": 600
        }, {
          "text": "#babel @foo",
          "timestamp": "2013-03-21T15:12:15.667Z",
          "id": "514b235feb64309f0704feca",
          "status": "update",
          "localID": 601
        }, {
          "text": "Test 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 #dopesauce #dopesauce Edifa - via @foo that's al #todo #dope #checkout ot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobsTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs\nTest 6 @boobs Edifa - via @foo that's alot of boobs @matt look at all these boobs",
          "timestamp": "2013-03-21T14:58:55.731Z",
          "id": "5148dfa2e4570853040569b5",
          "status": "create",
          "localID": 602
        }, {
          "text": "@boobs You are #gold - via @foo blah blah",
          "timestamp": "2013-03-20T00:46:07.876Z",
          "id": "5148def4eb64309f0703ebdf",
          "status": "update",
          "localID": 603
        }, {
          "text": "#dopesauce @Boobs - via @foo",
          "timestamp": "2013-03-19T21:54:16.745Z",
          "id": "5148de5beb64309f0703ebd3",
          "status": "delete",
          "localID": 604
        }, {
          "text": "matt poop Edit2 - via @foo",
          "timestamp": "2013-03-19T21:45:48.026Z",
          "id": "5148dc71e45708530405699e",
          "status": "create",
          "localID": 605
        }, {
          "text": "foo grave",
          "timestamp": "2013-03-14T21:50:30.711Z",
          "id": "51424626e457085304024712",
          "status": "synced",
          "localID": 606
        }
      ].map(function(note) {
        var thing, _i, _len, _ref;
        note.stashed = randomStashStuff();
        note.stash_bool = pickRandom([true, false]);
        note._id = note.id;
        _ref = ['unsubscribed', 'astrid_id', 'id', '_isTransferred', 'fetchnotes_id'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          thing = _ref[_i];
          delete note[thing];
        }
        note.creator = fakeID;
        note.created_at = (function() {
          var d;
          d = new Date();
          d.setFullYear(1995);
          return d.toISOString();
        })();
        return note;
      });
      return {
        notes: notes,
        fakeID: fakeID,
        pickRandom: pickRandom,
        curriedFindWhere: curriedFindWhere,
        badFindOneWhere: badFindOneWhere,
        checkContains: checkContains
      };
    }
  ]);

  angular.module('$app.filters').filter('truncate', function() {
    return function(text, length) {
      return "" + (text.substr(0, length)) + (text.length > length ? '…' : '');
    };
  });

  angular.module('$app.filters').filter('HTMLize', function() {
    var _this = this;
    this.regexp = {
      tags: /#[\w]+/g,
      contacts: /@[\w]+/g,
      urls: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
      emails: /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/ig,
      usernames: /^[a-zA-Z0-9_]*$/i,
      html: {
        tags: /(^|\s)(#[\w]+)/g,
        contacts: /(^|\s)(@[\w]+)/g
      },
      characters: {
        less: /</g,
        greater: />/g,
        amp: /&/g,
        spaces: /\ \ /g,
        linebreaks: /\n/
      },
      specials: {
        bitches: /bitches/gi
      }
    };
    return function(text, notClickable, length) {
      var i, line, lines, _i, _len;
      if (notClickable == null) {
        notClickable = false;
      }
      if (length == null) {
        length = 34;
      }
      if ((text === void 0) || (text.trim() === '')) {
        return '<p>&nbsp;</p>';
      }
      text = text.replace(_this.regexp.characters.amp, '&amp;').replace(_this.regexp.characters.less, '&lt;').replace(_this.regexp.characters.greater, '&gt;');
      text = text.replace(_this.regexp.html.tags, '$1<span class="hashtag">$2</span>');
      text = text.replace(_this.regexp.html.contacts, '$1<span class="contact">$2</span>');
      text = text.replace(_this.regexp.specials.bitches, '<span class="bitches">$&</span>');
      if (notClickable) {
        text = text.replace(_this.regexp.urls, function(link) {
          return '<span class="link">' + link.substr(0, length) + (link.length > length ? '&hellip;' : '') + '</span>';
        });
        text = text.replace(_this.regexp.emails, '<span class="email">$1</span>');
      } else {
        text = text.replace(_this.regexp.urls, '<a href="$1" target="_blank">$1</a>');
        text = text.replace(_this.regexp.emails, '<a href="mailto:$1" target="_blank">$1</a>');
      }
      text = text.replace(_this.regexp.characters.spaces, '&nbsp;&nbsp;');
      lines = text.split(_this.regexp.characters.linebreaks);
      for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
        line = lines[i];
        if (line.trim() === '') {
          line = '&nbsp;';
        }
        line = "<p>" + line + "</p>";
        lines[i] = line;
      }
      return lines.join('');
    };
  });

  angular.module('$app.filters').filter('notSelected', function() {
    return function(list) {
      var thing, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        thing = list[_i];
        if (!thing.selected) {
          _results.push(thing);
        }
      }
      return _results;
    };
  });

  angular.module('$app.filters').filter('timeago', function() {
    return function(input, expanded) {
      var date, dateDifference, days, hours, minutes, nowTime, plural, seconds, years;
      if (expanded == null) {
        expanded = false;
      }
      nowTime = (new Date()).getTime();
      date = (new Date(input)).getTime();
      dateDifference = nowTime - date;
      seconds = Math.abs(dateDifference) / 1000;
      if (seconds < 45) {
        return 'now';
      }
      plural = function(duration) {
        if (Math.round(duration) > 1) {
          return 's';
        } else {
          return '';
        }
      };
      minutes = seconds / 60;
      if (minutes < 45) {
        if (expanded) {
          return "" + (Math.round(minutes)) + " minute" + (plural(minutes)) + " ago";
        } else {
          return "" + (Math.round(minutes)) + "m";
        }
      }
      hours = minutes / 60;
      if (hours < 24) {
        if (expanded) {
          return "" + (Math.round(hours)) + " hour" + (plural(hours)) + " ago";
        } else {
          return "" + (Math.round(hours)) + "h";
        }
      }
      days = hours / 24;
      if (days < 365) {
        if (expanded) {
          return "" + (Math.round(days)) + " day" + (plural(days)) + " ago";
        } else {
          return "" + (Math.round(days)) + "d";
        }
      }
      years = days / 365;
      if (expanded) {
        return "" + (Math.round(years)) + " year" + (plural(years)) + " ago";
      } else {
        return "" + (Math.round(years)) + "y";
      }
    };
  });

}).call(this);
