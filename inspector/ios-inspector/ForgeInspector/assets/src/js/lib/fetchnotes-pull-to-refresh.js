// Fetchnotes Keyframe Animation
// 
// Element that watches for updateAnimation,
// then updates the animation state from the 
// parent scope.
// 
// @requires: Whenever animation state
// needs to change, broadcast on $rootScope
// the 0-100 value of the state.
// 
// ==========================

angular.module('fn.keyframeAnimation', [])
  .directive('keyframeAnimation', function(){
    'use strict';
    return {
      restrict: 'EA',
      scope: true,
      template: '<div class="keyframe-animation"></div>',
      replace: true,
      link: function link(scope, element, attrs) {

        // Store animation attributes
        var keyframeSize = parseInt(attrs.keyframeSize, 10),
            keyframeNumber = parseInt(attrs.keyframeNumber);

        // Create a conversion function that translates
        // the 0 to 100 progress value into the current keyframe
        // needed for the animation sheet
        var currentKeyframe = function(progress) {
          return (-Math.round((progress/100)*(keyframeNumber-1)));
        };

        // Setup style attrs on the keyframe element
        element.css('background-image', "url(" + attrs.keyframeImage + ")");
        element.css('width', keyframeSize + "px");

        // Initial animation state = 0
        scope.animationState = 0;

        // Watch for call to update animation
        scope.$on('$updateAnimation', function(e, state){
          scope.animationState = state;
        });

        // When animation state changes, update keyframe position
        scope.$watch('animationState', function(newState) {
          var position = (currentKeyframe(newState) * keyframeSize) + "px";
          element.css('background-position', position);
        });
      }
    }
  });

angular.module('fn.spriteLoopAnimation', [])
  .directive('spriteLoopAnimation', function (){
    'use strict';
    return {
      restrict: 'EA',
      scope: true,
      template: '<div class="sprite-sheet-animation"></div>',
      replace: true,
      link: function link(scope, element, attrs) {

        // Set background image and size
        element.css('background-image', "url(" + attrs.spriteSheetImage + ")");
        element.css('background-size', 'cover');

        // Create animation argument
        var animationArg = 'play ' + attrs.animationSpeed + ' steps(' + attrs.spriteNumber + ') infinite';

        // Set animation with vendor-prefixes
        'o ms moz webkit'.split(' ').forEach(function (prefix){
          element.css('-' + prefix + '-animation', animationArg);
        });

        // Set animation without vendor-prefix
        element.css('animation', animationArg);
      }
    }
  });

// Fetchnotes Pull To Refresh
// ==========================

angular.module('fn.pullToRefresh', ['fn.keyframeAnimation', 'fn.spriteLoopAnimation']);

angular.module('fn.pullToRefresh')

  // Keep the state of the pull to refresh system in one place,
  // unless other outside services need access; then, use broadcasts
  .service('pullState', function() {
    this.activated = false;
    this.loading = false;
    this.threshold = 100;
  })

  // Keep constant configuration variables here
  .constant('pullConfig', {
    debounce: 400,
    messages: {
      pull: "Pull to refresh",
      release: "Release to refresh",
      loading: "Loading"
    },
    stateConverter: function(pullState) {
      var animationState = (-1 * pullState);
      // Conversion code goes here
      return animationState;
    }
  })

  // Describe the area in which
  //  1. animation occurs
  //  2. feedback on pull state is shown
  // This area listens to the events from the pull content area
  // and the entire refreshable area to respond with the correct
  // feedback 
  .directive('pullArea', function($rootScope, $compile, pullConfig, pullState, $timeout){
    'use strict';
    return {
      restrict: 'EA',
      template: '<div class="pull-area" data-loading="{{loading}}" ng-transclude>\
                  <span class="message current" >{{currentMessage}}</span>\
                </div>',
      replace: true,
      transclude: true,
      scope: true,
      controller: function($scope){
        $scope.animationState = 0;
        this.getAnimationState = function() {
          return $scope.animationState;
        };
      },
      link: function link(scope, element, attrs) {

        // Set default current message
        scope.currentMessage = pullConfig.messages.pull;
        scope.loading = false;

        var pullContent = element.next();
        
        // Wait until the threshold has been met, set message
        // to prompt user to release pull content
        scope.$on('$pullToRefreshRelease', function(){
          scope.$apply(function(){
            scope.currentMessage = pullConfig.messages.release;
            $rootScope.$broadcast('$updateAnimation', 100);
          });
        });

        // When the pull content has been released, set the loading messages
        scope.$on('$pullToRefreshLoadingStart', function(e, distance){
          scope.$apply(function(){
            scope.currentMessage = pullConfig.messages.loading;
            pullContent.css('-webkit-transform', 'translate3d(0,' + element[0].offsetHeight*1.2 + 'px,0)');
            element.css('-webkit-transform', 'translate3d(0,10px,0)');
            scope.loading = true;
          });
        });

        // Same for end of loading
        scope.$on('$pullToRefreshLoadingEnd', function(){
          scope.$apply(function(){
            scope.currentMessage = pullConfig.messages.pull;
            scope.loading = false;
            pullContent.css('-webkit-transform', '');
            element.css('-webkit-transform', '');
            pullContent.removeAttr('style');
            element.removeAttr('style');
          });
        });

        // When pulling, set the pull messages
        scope.$on('$pullToRefreshPulling', function(e, distance){
          scope.$apply(function(){
            scope.currentMessage = pullConfig.messages.pull;
            $rootScope.$broadcast('$updateAnimation', pullConfig.stateConverter(distance));
          });
        });
      }
    }
  })

  .directive('pullContent', function($rootScope, pullState){
    'use strict';
    return {
      restrict: 'A',
      scope: true,
      link: function link(scope, element, attrs) {

        // When the content is moving, check the scrollTop position
        element.bind('touchmove', function(e) {
          var top = element.parent()[0].scrollTop,
              height = pullState.threshold;              

          // If the scrollTop position is greater than the height of the pull area
          if ((-top > height) && pullState.activated === false) {
            $rootScope.$broadcast('$pullToRefreshRelease');
            pullState.activated = true;
          } 
          // Else, if the content is still being pulled, broadcast the pull state,
          // with the current pull position and make sure the 
          if ((-top > 0) && (-top < height) && pullState.loading === false) {
            $rootScope.$broadcast('$pullToRefreshPulling', top);
            pullState.activated = false;
          } 
        });

        // When the pull content is released, 
        element.bind('touchend', function(e){
          var top = element.parent()[0].scrollTop;
          // Make sure pull state is activated, and start the loading events
          if (pullState.activated) {
            $rootScope.$broadcast('$pullToRefreshLoadingStart', top);
          }
        });

        scope.$on('$destroy', function() {
          element.unbind('touchmove');
          element.unbind('touchend');
        });
      }
    }
  })
  .directive('refreshable', function($rootScope, $q, $timeout, pullState, pullConfig){
    'use strict';
    return {
      restrict: 'A',
      scope: true,
      link: function link(scope, element, attrs) {

        // When loading events broadcast,
        scope.$on('$pullToRefreshLoadingStart', function(){
          // Check if refresh is activated
          if (pullState.activated) {

            // Reset activated state
            pullState.activated = false;

            // Perform update function
            var startTime = new Date();
            $q.when(scope.$eval(attrs.refresh)).then(function() {

              // When the update function is finished, check elapsed time
              var elapsed = new Date() - startTime;

              // If the elapsed time is less than the debounce config, wait until
              // the debounce duration has elapsed, else, broadcast the end of
              // the refresh, and set the loading state to false
              $timeout(function(){
                pullState.loading = false;
                $rootScope.$broadcast('$pullToRefreshLoadingEnd');
              }, ((elapsed < pullConfig.debounce) ? (pullConfig.debounce - elapsed) : 0));
            });
          }
        });
      }
    };
  });

