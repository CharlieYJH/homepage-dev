// Script for custom scrollbar

(function(fn) {
	'use strict';

	// Attach scrollbar object to window
	window.scrollbar = {
		// Various settings
		settings: {
			mouseScrollSpeed: 45,
			touchScrollSettleSpeed: 325,
		},

		// Initiation method
		initScrollbar: function() {

			// Cache related elements
			var elements = {
				tester: document.getElementById('tester'),
				contentWrapper: document.getElementsByClassName('scrollbar-content-wrapper'),
				contentContainer: document.getElementsByClassName('scrollbar-content-container'),
				draggerContainer: document.getElementsByClassName('scrollbar-dragger-container'),
				dragger: document.getElementsByClassName('scrollbar-dragger')
			};

			// Used to animate residual scrolling
			var requestAnimationFrame = window.requestAnimationFrame ||
                                		window.webkitRequestAnimationFrame ||
                                		window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
                                		window.RequestAnimationFrame ||
                                		function(fn){window.setTimeout(fn, 15);};

			// Event listeners
			Array.prototype.forEach.call(elements.contentWrapper, function(contentWrapper) {
				/*
				------------------------------------------------------------------------------
				Variables
				------------------------------------------------------------------------------
				*/
				// Cache relevant elements
				var contentContainer = contentWrapper.getElementsByClassName('scrollbar-content-container')[0];
				var draggerContainer = contentWrapper.getElementsByClassName('scrollbar-dragger-container')[0];
				var dragger = draggerContainer.getElementsByClassName('scrollbar-dragger')[0];
				// Cache relevant values
				var contentWrapperHeight = Math.floor(contentWrapper.getBoundingClientRect().height);
				var contentWrapperTop = contentWrapper.getBoundingClientRect().top;
				var contentContainerHeight = Math.floor(contentContainer.getBoundingClientRect().height);
				var draggerContainerHeight = Math.floor(draggerContainer.getBoundingClientRect().height);
				// Initialize various storage variables
				var prevTime, touchCurrPos, touchPrevPos, boxPrevPos, velocity, amplitude,
					delta, elapsed, intervalID, residualEnabled, pressed, scrolling, dragRatio, dragMax,
					resizeID;
				// Whether there's a need to scroll
				var scrollMax = contentContainerHeight - contentWrapperHeight;

				/*
				------------------------------------------------------------------------------
				Helper Functions
				------------------------------------------------------------------------------
				*/
                // Track movement of container
                var track = function() {
                	// Local variables so that actual listener events aren't distubed
                	var currPos, delta, elapsed, instV;
                	// Get difference in positions
                	currPos = contentContainer.offsetTop;
                	delta = currPos - boxPrevPos;
                	boxPrevPos = currPos;
                	// Get time elapsed
                	elapsed = Date.now() - prevTime;
                	prevTime = Date.now();
                	// Calculate instantaneous velocity (px/s)
                	instV = 1000 * delta / (elapsed + 1);
                	// Get velocity using moving average filter to account for noise
                	velocity = 0.8 * instV + 0.2 * velocity;
                };

                // Get y position
                var getYPos = function(event) {
                	// If on touch device
                	if (event.changedTouches) {
                		return event.changedTouches[0].pageY;
                	}
                	// If using mouse
                	return event.clientY;
                }

                // Update container position
                var updatePosition = function(element, position, max, min) {
                	// Update position and stop scroll if we hit top or bottom boundaries
                	if (position >= max) {
                		element.style.top = max + 'px';
                		residualEnabled = false;
                	} else if (position <= min) {
                		element.style.top = min + 'px';
                		residualEnabled = false;
                	} else {
                		element.style.top = position + 'px';
                	}
                };

            	// Residual scrolling step function
            	var residualScroll = function() {

					// Using top from the style to get exact value because offsetTop doesn't give exact value
					var draggerTop = dragger.style.top;
            		// Get how much time has elapsed since release
            		var elapsed = Date.now() - prevTime;

            		// Calculate delta based on how much time has passed
            		delta = residualEnabled ? amplitude * Math.exp(- elapsed / scrollbar.settings.touchScrollSettleSpeed) : 0;

            		// If delta is within a certain threshold, animate residual scroll
            		if ((delta > 0.5 || delta < - 0.5) && residualEnabled) {
            			scrollMax > 0 && updatePosition(contentContainer, contentContainer.offsetTop + delta, 0, - scrollMax);
            			// Use substr method to get rid of 'px' on draggerTop to avoid parseFloat()
						scrollMax > 0 && updatePosition(dragger, draggerTop.substr(0, draggerTop.length - 2) - delta * dragRatio, dragMax, 0);
            			requestAnimationFrame(residualScroll);
            		}
            	};

            	// Dragger characteristics and resetting dragger position
            	var getDraggerChar = function() {

            		// Calculate dragger and content ratio
            		dragRatio = (contentWrapperHeight <= contentContainerHeight)
            				  ? draggerContainerHeight / contentContainerHeight
            				  : 0;

            		// Don't show container if we don't have a dragger
            		draggerContainer.style.opacity = (!dragRatio) ? 0 : 1;

            		// Set dragger height
					dragger.style.height = dragRatio * contentWrapperHeight + 'px';
					dragger.style.top = 0 + 'px';

					// Set maximum dragging point
					dragMax = draggerContainerHeight - dragger.offsetHeight;
            	};

				// Mousewheel event handler
				var mouseWheelEvent = function(event) {

					// Get whether it was scrolling up or down (negative delta is down)
					var delta = event.wheelDelta / Math.abs(event.wheelDelta) || - event.detail / Math.abs(event.detail);
					// Dragger top
					var draggerTop = dragger.style.top;

					// Disable residual scrolling
					residualEnabled = false;

					// If content exceeds wrapper (there's a need for scrolling)
					scrollMax > 0 && updatePosition(contentContainer, contentContainer.offsetTop + delta * scrollbar.settings.mouseScrollSpeed, 0, - scrollMax);
            		// Use substr method to get rid of 'px' on draggerTop to avoid parseFloat()
					scrollMax > 0 && updatePosition(dragger, ~~draggerTop.substr(0, draggerTop.length - 2) - delta * scrollbar.settings.mouseScrollSpeed * dragRatio, dragMax, 0);
				};

				// Touch start event handler
				var touchStartEvent = function(event) {

					event.preventDefault();
					// Reset velocities and delta
					velocity = delta = 0;
					// Reset various boolean variables
					residualEnabled = false;
					scrolling = false;
					pressed = true;
					// Record start tme and start position on touch start
					prevTime = Date.now();
					// Initialize various storage values
					touchCurrPos = touchPrevPos = getYPos(event);
					boxPrevPos = contentContainer.offsetTop;
					// Start tracking velocity every set interval
					intervalID = setInterval(track, 50);
				};

				// Touch move event handler
				var touchMoveEvent = function(event) {

					event.preventDefault();
					// Using top from the style to get exact value because offsetTop doesn't give exact value
					var draggerTop = dragger.style.top;

					// Get change in position
					touchCurrPos = getYPos(event);
					delta = touchCurrPos - touchPrevPos;
					touchPrevPos = touchCurrPos;

					// Only scroll if there's a need for scrolling
					if (scrollMax > 0) {
						// If touch event is fired from dragger, scroll using the dragger
						if ((event.target.className === 'scrollbar-dragger' && pressed) || scrolling) {
							// Update container position
							updatePosition(contentContainer, contentContainer.getBoundingClientRect().top - contentWrapperTop - delta / dragRatio, 0, - scrollMax);
		            		// Double negation to convert string into number
							updatePosition(dragger, ~~draggerTop.substr(0, draggerTop.length - 2) + delta, dragMax, 0);
							// Record that we're already scrolling so that even if mouse goes outside dragger bounds it continues to follow mouse
							scrolling = true;
						// If touch event is fired from content container, scroll the container
						} else if (event.changedTouches) {
							// Update container position
							updatePosition(contentContainer, contentContainer.offsetTop + delta, 0, - scrollMax);
		            		// Use substr method to get rid of 'px' on draggerTop to avoid parseFloat()
							updatePosition(dragger, draggerTop.substr(0, draggerTop.length - 2) - delta * dragRatio, dragMax, 0);
						}
					}
				};

				// Touch end event handler
				var touchEndEvent = function(event) {

					event.preventDefault();
					// Set pressed to false
					pressed = false;
					scrolling = false;
					// Stop tracking velocity
					clearInterval(intervalID);
					// Record end time
					prevTime = Date.now();

					// If velocity is large enough, do residual scrolling
					if ((velocity > 100 || velocity < - 100) && event.target.className !== 'scrollbar-dragger' && event.changedTouches) {
						residualEnabled = true;
						// Calculate amplitude for the exponential decay
						amplitude = 0.015 * velocity;
						residualScroll();
					}
				};

				// Resize event
				var resizeEvent = function(event) {

					clearTimeout(resizeID);

					// Only recalculate once resize is finished
					resizeID = setTimeout(function() {
						// Recalculate various variables
						contentWrapperHeight = Math.floor(contentWrapper.getBoundingClientRect().height);
						contentWrapperTop = contentWrapper.getBoundingClientRect().top;
						contentContainerHeight = Math.floor(contentContainer.getBoundingClientRect().height);
						draggerContainerHeight = Math.floor(draggerContainer.getBoundingClientRect().height);
						scrollMax = contentContainerHeight - contentWrapperHeight;
						// Recalculate dragger characteristics
						getDraggerChar();
						// Reset contentContainer to top
						contentContainer.style.top = 0 + 'px';
					}, 500);
				};

				// Activate dragger
				getDraggerChar();

				/*
				------------------------------------------------------------------------------
				Listeners
				------------------------------------------------------------------------------
				*/
				// Capture touchstart event
				contentWrapper.addEventListener('touchstart', touchStartEvent);
				// Capture touchmove event
				contentWrapper.addEventListener('touchmove', touchMoveEvent);
				// Capture touchend event
				contentWrapper.addEventListener('touchend', touchEndEvent);
				// Capture mousestart event
				contentWrapper.addEventListener('mousedown', touchStartEvent);
				// Capture mousemove event
				contentWrapper.addEventListener('mousemove', touchMoveEvent);
				// Capture mouseend event
				contentWrapper.addEventListener('mouseup', touchEndEvent);
				// IE9, Chrome, Safari, Opera mousewheel event
				contentWrapper.addEventListener('mousewheel', mouseWheelEvent);
				// Firefox mousewheel event
				contentWrapper.addEventListener('DOMMouseScroll', mouseWheelEvent);
				// Resize event
				window.addEventListener('resize', resizeEvent);
			});
		}
	};
})();

scrollbar.initScrollbar();
