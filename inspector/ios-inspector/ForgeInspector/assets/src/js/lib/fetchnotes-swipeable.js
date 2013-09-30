angular.module('fn.swipeable',[]);

angular.module('fn.swipeable')
  .service('canSwipe', function(){
    this.possible = true;
  })
  .directive('swipeable', function ($timeout, $window, canSwipe) {
    'use strict';
    return {
      restrict: 'A',
      link: function link (scope, element, attrs) {
        scope.direction = "left";
        var cache = {
          isDragging: false,
          startDrag: { x: 0, y: 0 },
          lastDrag:  { x: 0, y: 0 },
          frame: null,
          hasIntent: true,
          angle: 0,
          reset: function() {
            this.isDragging = false;
            this.startDrag = { x: 0, y: 0 };
            this.lastDrag = { x: 0, y: 0 };
            this.frame = null;
            this.hasIntent = true;
            this.angle = 0;
          }
        },
        settings = {
          speed: 300,
          angle: 20,
          minimumDragDistance: 5,
          breakPoint: 84,
          imageWidth: 44,
          imagePadding: 20,
          states: {
            default: {
              left: true,
              right: false,
              colors: {
                left: '0,0,0',
                right: undefined
              }, 
              actions: {
                left: "swipeLeft(note, $index)",
                right: "swipeRight(note, $index)"
              }
            },
          }
        };

        // Set default state
        var state = settings.states['default'], states;
        // Extend states with scope defined states
        states = angular.extend(settings.states, scope.states);
        // The current state is given by the state of the controller
        state = states[scope.state];

        // Change state based on current scope.state
        scope.$watch('state', function(){
          if (typeof scope.state !== undefined && 
                typeof scope.state === 'string') {
            state = states[scope.state];
          } else {
            state = states['default'];
          }
        });

        var utils = {
          angle: function (point) {
            var theta, degrees;

            // Get the theta
            theta = Math.atan2(-(cache.startDrag.y - point.y), (cache.startDrag.x - point.x));
            if (theta < 0) {
              theta += (2 * Math.PI);
            }

            // Convert to degrees
            degrees = Math.floor(theta * (180 / Math.PI) - 180);
            if (degrees < 0 && degrees > -180) {
              degrees = 360 - Math.abs(degrees);
            }

            // Return angle of drag
            return Math.abs(degrees);
          },
          validateFunction: function (fn) {
            return typeof fn === 'function';
          },
          difference: function (e) {
            // Check if any touch points have been put down or moved
            return e.changedTouches.length ? (e.changedTouches[0].pageX - cache.startDrag.x) : 0
          },
          slice: function (notArray, startIndex, endIndex) {
            var results = [], index, length, item;

            // If and end index is not given, set as length of array
            if (typeof endIndex === 'undefined') endIndex = notArray.length;

            // Iterate over array-like object, 
            for (index = 0, length = notArray.length; index < length; ++index) {
              item = notArray[index];
              // return all items after start and before end
              if (index >= startIndex && index < endIndex) results.push(item);
            }

            return results;
          },
          wrapAll: function (elements, wrapper) {
            var parent, fragment, index, length, element;

            // `wrapper` is the element to wrap all node in
            wrapper = angular.element(wrapper)[0];
            parent = elements.parent()[0];

            // Insert wrapper before the elements to be wrapped
            parent.insertBefore(wrapper, elements[0]);

            // Create document fragment 
            fragment = document.createDocumentFragment();

            // and push all the elements from parent to the fragment
            for (index = 0, length = elements.length; index < length; ++index) {
              element = elements[index];
              parent.removeChild(element);
              fragment.appendChild(element);
            }

            return wrapper.appendChild(fragment);
          },
          vendor: function (context, func) {
            // Get an array of prefixes
            var prefixes = "-o- -webkit- -ms- -moz-".split(' '), prefix,
                index, length, item;

            // Call the function passed for each prefix
            for (index = 0, length = prefixes.length; index < length; ++index) {
              func.call(context, prefixes[index])
            }
          },
          slide: function (el, distance) {
            // For every vendor, translate the distance
            this.vendor(this, function (prefix){
              el.css(prefix + "transform", "translate3d(" + distance + "px, 0, 0)");
            });
          },
          direction: function (distance) {
            // Get direction based on sign
            return (distance <= 0) ? "left" : "right";
          },
          inRange: function (angle, constraint) {
            // Check if angle is within the constraint angle in all four quadrants
            // of a Cartesian plane
            var inRightRange = (angle >= 0 && angle <= constraint) ||
                                 (angle <= 360 && angle > (360 - constraint)),
                inLeftRange = (angle >= 180 && angle <= (180 + constraint)) || 
                                (angle <= 180 && angle >= (180 - constraint));

            return (inLeftRange || inRightRange);

          },
          hasIntent: function (deg) {
            // If the degree given is within range of the set angle
            // the user has intent to slide
            return this.inRange(deg, settings.angle);
          },
          updateAngle: function(e) {
            // Get the current angle and check if it's greater 
            // than the cached angle, and if so, replace the cache
            var current = utils.angle({x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY});
            if (!this.inRange(current, cache.angle)) {
              cache.angle = current;
            }
          }

        };

        // Handle shifting logic
        var shift = function (el, distance) {
          var opacity, containerWidth, dir, backgroundPosition, absDistance = Math.abs(distance);

          // Set default distance is not set
          distance || (distance = 0);

          // Get direction
          dir = utils.direction(distance);

          if (state[dir]) {

            // Slide the element
            utils.slide(el, distance);

            // Calculate container's background color and opacity & set it
            opacity = Math.abs(distance / settings.breakPoint);
            el.parent().css('background-color', "rgba(" + state.colors[dir] + "," + opacity + ")");

            // Get container width
            containerWidth = element.parent()[0].offsetWidth;

            // Calculate background position
            if (dir === "right") {
              backgroundPosition = (absDistance - (settings.imageWidth + settings.imagePadding));
            } else if (dir === "left" && distance !== 0) {
              backgroundPosition = (containerWidth - absDistance) + settings.imagePadding;
            } else {
              if (cache.lastDrag.x < 0) {
                backgroundPosition = containerWidth + settings.imagePadding;
              } else {
                backgroundPosition = -1 * (settings.imageWidth + settings.imagePadding);
              }
            }

            // Set background position
            if (absDistance > settings.breakPoint) {
              // If the element has been shifted past the break point
              element.parent().css('background-position', backgroundPosition + "px")
            } else {
              if (cache.lastDrag.x < 0) {
                // If last drag is greater than 0, background is positioned to the right
                element.parent().css('background-position', (containerWidth - (settings.imageWidth + settings.imagePadding)) + 'px');
              } else {
                // Otherwise, background is positioned to the left
                element.parent().css('background-position', settings.imagePadding +'px');
              }
            }
          }
        }

        element.bind('touchstart', function (e){
          if (!canSwipe.possible) return;
          // Remove programmatically added styles
          element.parent().removeAttr('style');

          // Remove transitions
          utils.vendor(this, function (prefix){
            element.css(prefix + 'transition', '');
            element.parent().css(prefix + 'transition', '');
          });

          // Reset cache
          cache.reset();

          // Get coordinates of touch events
          cache.startDrag.x = e.changedTouches[0].pageX;
          cache.startDrag.y = e.changedTouches[0].pageY;
        });

        element.bind('touchmove', function (e){
          if (!canSwipe.possible) return;

          var difference;

          // Get the current drag difference
          difference = utils.difference(e);

          // Save the current x position as the difference
          cache.lastDrag.x = difference;

          // If the minimum drag distance hasn't been met, cancel operation
          if (Math.abs(difference) < settings.minimumDragDistance) {
            return;
          }

          // Update the touch
          utils.updateAngle(e);

          if (!(cache.hasIntent = utils.hasIntent(cache.angle))) {
            return;
          }

          // Dragging is occuring
          cache.isDragging = true;

          // Prevent default behavior of full screen bubbling
          e.preventDefault();

          // Use requestAnimationFrame to smoothly animate shifting of element
          cache.frame = $window.requestAnimationFrame(function (){
            shift(element, difference);
            scope.$apply(function(){
              scope.direction = utils.direction(difference);
            });
          });
        });

        element.bind('touchend', function (e){

          // Prevent any code from running if another swipeable item
          // if currently being swiped
          if (!canSwipe.possible) return;
          canSwipe.possible = false;

          var parent = element.parent(), difference, 
              containerWidth = parent[0].offsetWidth, children,
              block, destinationPosition, direction, siblings, isLastItem,
              verticalDirection = -1, sliceArgs, onlyChild, heightCSS = {};

          // Get difference and determine where to slide background and element
          difference = utils.difference(e);
          direction = utils.direction(difference);

          // Vendor prefix transitions and transforms
          utils.vendor(this, function (prefix){
            element.css(prefix + 'transition', prefix + 'transform '+ settings.speed +'ms');
            parent.css(prefix + 'transition', 'background ' + settings.speed + 'ms');
          });

          // Determine direction of background sliding
          if (difference) {
            // If slid correctly, move left or right off
            destinationPosition = (difference < 0 ? (-1 * 2 * containerWidth) : (2 * containerWidth));
          } else {
            // Otherwise, slide back to 0
            destinationPosition = 0;
          }

          // Slide the background away
          parent.css('background-position', destinationPosition + "px");

          // If the touch has moved ('touchmove' has fired), preventDefault behavior
          if (cache.isDragging) e.preventDefault();

          // The element has been swiped far enough, and there is callback
          // associated with the slide, and the intent was to slide (not scroll)
          // then do the magic
          if (Math.abs(difference) > settings.breakPoint && state.actions[direction] && cache.hasIntent) {
            // Shift the element away
            shift(element, destinationPosition);

            // Get all the children, 
            children = parent.parent().children();
            if (onlyChild = (children.length === 1)) {

              // Animate height if the only child
              // no siblings & reflow means height is okay
              parent.css('max-height', parent[0].offsetHeight + 'px');

              // Wait for the slide transition to finish
              parent.bind('webkitTransitionEnd', function (){

                // Set height as 0
                heightCSS['max-height'] = 0;

                // Unbind slide listener
                parent.unbind('webkitTransitionEnd');

                // Transition height and set css
                utils.vendor(this, function (prefix){
                  heightCSS[prefix + 'transition'] = 'max-height ' + settings.speed + 'ms';
                  parent.css(heightCSS);
                });

                // Wait for transition to finish
                // adding a transition listener doesn't seem to work here
                $timeout(function (){

                  // Apply callback
                  if (destinationPosition !== 0) {
                    scope.$apply(state.actions[direction]);
                  }
                  parent.remove();
                }, settings.speed);

              });
            } else {
              // Check how many children there are, and see if the item
              // being swiped is the last one
              if (isLastItem = (children.length === (scope.$index + 1))) {
                // Slide block *down*
                verticalDirection = 1;
                sliceArgs = [children, 0, scope.$index];
              } else {
                // Slide block *down*
                verticalDirection = -1;
                sliceArgs = [children, scope.$index + 1];
              }

              // get the elements to be shifted as a block
              siblings = angular.element(utils.slice.apply(utils, sliceArgs));
              // and then wrap those in a siblings wrapper that can be transformed
              utils.wrapAll(siblings, '<div class="siblings" />');

              // Get a reference to the block of list items to be moved
              if (isLastItem) {
                block = angular.element(parent.parent().children()[0]);
              } else {
                block = parent.next();
              }

              // Yeah, not vendor prefixed yet, but will soon
              parent.bind('webkitTransitionEnd', function (){

                // If swipeable get stuck, ensure the area is swiped away
                shift(element, destinationPosition);

                // Translate the block up or down
                utils.vendor(this, function (prefix){
                  block.css(prefix + 'transition', prefix + 'transform ' + settings.speed + 'ms');
                  block.css(prefix + 'transform', "translate3d(0," + (verticalDirection * parent[0].offsetHeight) + 'px,0)');
                })

                // When the block has finished transitioning up, perform action and remove block
                block.bind('webkitTransitionEnd', function (){
                  // Apply the action for the given direction
                  if (destinationPosition !== 0) {
                    scope.$apply(state.actions[direction]);
                  }

                  parent.css('opacity', 0);
                  // Unbind the function from the block
                  block.unbind('webkitTransitionEnd');
                  // Remove the block
                  canSwipe.possible = true;
                  block.remove();
                });

                // Unbind from parent, prevent double calling
                parent.unbind('webkitTransitionEnd');
              });
            }

          } else {
            // If the element hasn't met the breakpoint, shift element back to 0
            shift(element, 0);
            canSwipe.possible = true;
          }
        });

        // Cleanup listeners to prevent memory leak
        scope.$on('$destroy', function (){
          canSwipe.possible = true;
          element.unbind('touchstart');
          element.unbind('touchmove');
          element.unbind('touchend');
        });

      }
    };
  });
