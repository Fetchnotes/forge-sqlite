// Ryan Gonzalez 7/2013
// Adapted from the blog post 
// http://phaistonian.pblogs.gr/expanding-textareas-the-easy-and-clean-way.html

angular.module('autoresize', []);

angular.module('autoresize')
  .directive('autoresize', function($window){
    'use strict';
    return  {
      restrict: 'A',
      link:  function (scope, element, attrs) {
        var offset = !$window.opera ? (element[0].offsetHeight - element[0].clientHeight) : (element[0].offsetHeight + parseInt($window.getComputedStyle(element[0], null).getPropertyValue('border-top-width'))) ;

        var resize  = function(el) {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight  + offset ) + 'px';    
        }
     
        element.bind('input', function() { resize(element[0]); });
        element.bind('keyup', function() { resize(element[0]); });
        
        scope.$on('$destroy', function(){
          element.unbind('input');
          element.unbind('keyup');
        });
      }
    }
  });
