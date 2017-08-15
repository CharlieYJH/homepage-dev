// Smooth scroll function
(function(root, smoothScroll) {
    'use strict';
    // Attach smoothScroll to window
    root.smoothScroll = smoothScroll;
}) (this, function(startPoint, target, duration) {
    'use strict';

    // Return if target is null or the functions are undefined in the browser
    if (target === null || target === undefined) {return;}
    if (document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) {return;}

    // Get target element top
    var getTargetTop = function(el) {
        return el.getBoundingClientRect().top + window.pageYOffset;
    };

    // Ease in out function
    // http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
    var easeInOutCubic = function(t) {return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;};
    // Calculate position we should be in

    var position = function(start, end, elapsed, duration) {
        return (elapsed > duration)? end : start + (end - start) * easeInOutCubic(elapsed/duration);
    };

    // Smooth scroll animation
    var smoothScroll = function(target, duration, callback) {
		
        // Animation duration
        duration = duration || 500;

        // Start location
        var start = window.pageYOffset;

		// Document end location
		var documentEnd = getTargetTop(document.getElementById('end-marker'));

		// Client height
		var documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Animation frame function
        var requestAnimationFrame = window.requestAnimationFrame ||
                                    window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
                                    function(fn){window.setTimeout(fn, 15);};

        // If target is a number, end target is set by target
        // Else end is top of end target
        if (typeof target === 'number') {
            var end = parseInt(target);
        } else {
            var end = getTargetTop(target);
        }

		// Adjust end if the element can't scroll to the top
		if (documentEnd - end < documentHeight) {
			end = documentEnd - documentHeight;
		}

        // Remember start time
        var startTime = Date.now();

        // Animation function
        var step = function() {

            var elapsed = Date.now() - startTime;

            window.scrollTo(0, position(start, end, elapsed, duration));

            if (elapsed > duration || start === end) {
                // Run callback function if it exists
                if (typeof callback === 'function') callback(target);
            } else {
                requestAnimationFrame(step);
            }
        };

        // Run step function
        step();
    };

    // Function to push state to browser
    var linkHandler = function() {
        // Push has to history
        if (typeof startPoint.hash === 'string' && location.hash !== startPoint.hash) {

            // Push state if current state not equal link state
            window.history.pushState(null, null, startPoint.hash);
        }
    };

    // Push hash to history if hash exists
    startPoint.hash && linkHandler();

    // Scroll to target
    smoothScroll(target, duration, function(el) {
        // Triggers :target so that backspace works
        //el.id && location.replace('#' + el.id);
    });
});
