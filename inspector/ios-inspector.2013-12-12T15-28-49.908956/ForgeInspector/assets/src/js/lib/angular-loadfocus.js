angular.module('loadfocus', []);

angular.module('loadfocus')
  .directive('loadfocus', function ($compile, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      link: function link(scope, element) {
        var fire = false;
        scope.$on('$pageTransitionStart', function ($event, dest, source, reverse){
          fire = !reverse;
        });

        scope.$on('$pageTransitionSuccess', function ($event){
          if (fire) {
            $timeout(function(){
              var cloned = element.clone();
              cloned.attr("autofocus", "");
              element.parent().prepend($compile(cloned)(scope));
              element.remove();
            }, 0);
          }
        });
      }
    };
  });
