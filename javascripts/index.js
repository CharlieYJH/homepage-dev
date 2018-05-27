(function() {
    'use strict';

    // Regex check for mobile devices (from http://detectmobilebrowsers.com/)
    var mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    // Used to detect Internet Explorer
    var detectIE = function() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    // Enable hover features on non-touch device
    if (mobilecheck()) {
        document.getElementsByTagName('body')[0].classList.remove('hover-enable');
    };

    // Caching commonly used elements
    var cache = {
        nav: document.getElementById('nav-wrapper'),
        sidebar: document.getElementById('sidebar-container'),
        sidebarLinks: document.getElementsByClassName('sidebar-links'),
        sidebarIndicator: document.getElementById('sidebar-links-indicator'),
        contents: document.getElementsByClassName('content-wrapper'),
        contentTops: [],
        contentCells: document.getElementsByClassName('content-cell'),
        contentMarkers: document.getElementsByClassName('content-marker')
    };

    // Helper functions
    var helpers = {

        // Current scroll position
        scroll: function() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        },

        // Toggle properties based on scroll condition
        scrollToggle: function(element, className, scrollCondition, reverse) {

            // Default reverse is false (Won't remove when scrollCondition is met)
            reverse = reverse || false;
            // Check scrollCondition and add/remove class based on this
            if (this.scroll() > scrollCondition) {
                if (reverse) {
                    element.classList.remove(className);
                } else {
                    element.classList.add(className);
                }
            } else {
                if (reverse) {
                    element.classList.add(className);
                } else {
                    element.classList.remove(className);
                }
            }
        },

        // Get the top position of an element excluding nav height
        getElementTop: function(element) {
            return element.getBoundingClientRect().top + this.scroll() - cache.nav.offsetHeight;
        },

        // Update contentTops
        updateContentTops: function() {

            // Tops of each section of content
            cache.contentTops = [];
            Array.prototype.forEach.call(cache.contents, function(element) {
                cache.contentTops.push(helpers.getElementTop(element));
            });
        },

        // Check whether element has the specified class
        hasClass: function(element, className) {

            // Check whether element or class is valid input
            if (typeof element !== 'object' || typeof className !== 'string') {throw new Error('Invalid input.');}
            // If browser supports the contains method use that
            if (typeof element.classList.contains === 'function') {
                return !!element.classList.contains(className);
            } else {
                // Get class list length
                var length = element.classList.length;
                // Loop through list
                for (var i = 0; i < length; i++) {
                    // If there's a match, return true
                    if (element.classList[i] === className) {
                        return true;
                    }
                }
                // If no match found, return false
                return false;
            }
        },

        // Toggle content
        classToggle: function(element, className) {

            // Add or remove class depending on if element has the class already
            if (helpers.hasClass(element, className)) {
                element.classList.remove(className);
            }
            else {
                element.classList.add(className);
            }
        },

        // Debounce function
        debounce: function (func, threshold) {

            // How many milliseconds before function executes
            threshold = threshold || 250;

            var timeout;
            var later = function() {
                timeout = null;
                func();
            };

            return function() {
                // If debounce is called and timer is set, reset timer
                timeout && clearTimeout(timeout);
                // Only allow timer to finish if action is finished
                timeout = setTimeout(later, threshold);
            }
        },

        // Throttle function
        throttle: function(func, threshold) {

            // How many milliseconds between each function call
            threshold = threshold || 250;

            // Only fire the function after every threshold milliseconds
            var wait = false;

            return function() {
                if (!wait) {
                    func();
                    wait = true;
                    setTimeout(function() {
                        wait = false;
                    }, threshold);
                }
            };
        }
    };

    // Initial load events
    window.addEventListener('DOMContentLoaded', function() {

        // Initial load animations
        setTimeout(function() {
            // Show page load transitions
            // document.getElementById('frontpage-wrapper').classList.add('page-loaded');
            document.body.classList.add('page-loaded');
        }, 350);

        // Attaching link listeners
        // Get link DOMs
        var links = document.getElementsByClassName('scroll-link');

        // Use forEach() to apply listener to each link
        Array.prototype.forEach.call(links, function(link) {
            link.addEventListener('click', function(e) {
                // Prevent links from jumping to destination
                e.preventDefault();
                // Call smoothScroll()
                window.smoothScroll(this, 
                    // If destination exists, scroll to destination
                    (link.hash) ? document.getElementById(link.hash.substring(1)) : null,
                    // Speed of scroll
                    500);
            });
        });

        // Initial sidebar position
        var sidebarTop = helpers.getElementTop(cache.sidebar.parentNode);

        // Set initial sidebar property
        if (helpers.scroll() > sidebarTop) {
            cache.sidebar.classList.add('fixed-sidebar');
        }

        // Load number of years in skills section
        var years = document.getElementsByClassName('skills-years-text');
        var currentYear = new Date().getFullYear();

        Array.prototype.forEach.call(years, function(element) {
            var difference = currentYear - element.dataset.startYear;
            var suffix = (difference > 1) ? ' Years' : ' Year';
            element.innerHTML = difference + suffix;
        });

        // Set mobile menu external link listeners
        // Have to do this because preventDefault somehow prevents links from being clicked on mobile Safari
        var externalLinks = document.getElementsByClassName('external-link');

        Array.prototype.forEach.call(externalLinks, function(link) {

            var redirect = true;

            link.addEventListener('touchstart', function() {
                redirect = true;
            });

            link.addEventListener('touchend', function() {
                if (redirect) window.location.href = link.href;
            });

            // Don't go to new page if user moved touch position
            link.addEventListener('touchmove', function() {
                redirect = false;
            });
        });

        // If we're not on mobile then attach the video sources
        // Mobile doesn't allow for auto play inline videos, so delete the video tags
        var projectVideos = document.getElementsByClassName('project-video');
        var isMobile = mobilecheck();
        var toRemove = [];

        Array.prototype.forEach.call(projectVideos, function(video) {
            if (!isMobile) {

                // Append IE tag to display correct loading animation
                if (detectIE() !== false) {
                    video.classList.add('ie');
                }

                // Use GET request to load entire video before showing user
                var req = new XMLHttpRequest();
                req.open('GET', video.dataset.url, true);
                req.responseType = 'blob';

                req.onload = function() {

                    // Only show if it returns a 200 code
                    if (this.status === 200) {
                        var videoBlob = this.response;
                        var vid = URL.createObjectURL(videoBlob);

                        video.src = vid;
                        video.classList.add('loaded');

                        // Remove loading circle from DOM
                        setTimeout(function() {
                            var childCircle = video.parentNode.getElementsByClassName('circle-load')[0];
                            var childStroke = video.parentNode.getElementsByClassName('stroke-load')[0];
                            video.parentNode.removeChild(childCircle);
                            video.parentNode.removeChild(childStroke);
                        }, 250);
                    }
                }

                req.send();

                video.addEventListener('mouseenter', function() {
                    video.play();
                });

                video.addEventListener('mouseleave', function() {
                    video.pause();
                })
            } else {
                toRemove.push(video);
                var childCircle = video.parentNode.getElementsByClassName('circle-load')[0];
                var childStroke = video.parentNode.getElementsByClassName('stroke-load')[0];
                video.parentNode.removeChild(childCircle);
                video.parentNode.removeChild(childStroke);
            }
        });

        // Removing in the forEach loop causes it to skip elements
        for (var i = 0; i < toRemove.length; i++) {
            toRemove[i].remove();
        }

        // Contact me form fields only display invalid after being interacted with
        var forms = document.getElementsByClassName('input');
        Array.prototype.forEach.call(forms, function(form) {
            form.addEventListener('blur', function(e) {
                e.target.classList.add('interacted');
            });
        });

        // Load copyright year
        document.getElementById('footer').innerHTML = '© ' + new Date().getFullYear() + ' Charlie Yin';
    });

    // Sidebar Listeners
    (function() {

        // Get content top positions
        helpers.updateContentTops();
        // Sidebar tab indicator length
        var indicatorLength = 0;
        // Top of sidebar
        var sidebarTop;
        // How far into the content the tabs activate
        var pageOffset = 0.4;
        // Whether to activate the sidebar scroll status
        var activateTabs = true;
        // Setting the sidebar appearance
        var setSidebar = function() {
            // Reset indicator length
            indicatorLength = 0;
            // Check which main sections scroll is past
            for (var i = 0; i < cache.contents.length; i++) {
                helpers.scrollToggle(cache.sidebarLinks[i], 'active', cache.contentTops[i] - window.innerHeight * pageOffset);
                // Change indicator length according to scroll position
                if (helpers.scroll() > cache.contentTops[i] - window.innerHeight * pageOffset) {
                    indicatorLength += cache.sidebarLinks[i].offsetHeight;
                }
            }
            // Set indicator length and position
            cache.sidebarIndicator.style.height = indicatorLength + 'px';
            cache.sidebarIndicator.style.top = 0 + 'px';
        };

        // Page load events
        window.addEventListener('load', function() {
            // Set sidebar on page load
            setSidebar();
            // Set sidebar top here after document loads to get accurate value
            sidebarTop = helpers.getElementTop(cache.sidebar.parentNode);
        });

        // Toggle sidebar activated tabs
        Array.prototype.forEach.call(cache.sidebarLinks, function(link) {
            // On mouseenter, cancel active state of other links except the one the mouse is on
            link.addEventListener('mouseenter', function(e) {
                // Get currently active link
                var activeLink = link;
                // Set indicator position and height
                cache.sidebarIndicator.style.height = activeLink.offsetHeight + 'px';
                cache.sidebarIndicator.style.top = activeLink.offsetTop + 'px';
                // Remove active states of all tabs
                Array.prototype.forEach.call(cache.sidebarLinks, function(link) {
                    link !== activeLink && link.classList.remove('active');
                });
                // Add active state to moused over link
                link.classList.add('active');
                // Remember not to switch on other tabs on scroll
                activateTabs = false;
            });
            // Remove active state of current link and restore scroll status
            link.addEventListener('mouseout', function(e) {
                link.classList.remove('active');
                // Since mouse isn't over the links, turn on all active links
                activateTabs = true;
                // Set sidebar appearance back to scroll status
                setSidebar();
            });
        });

        // Update sidebar position and link tops on resize
        window.addEventListener('resize', helpers.debounce(function() {
            // Update sidebar top position
            sidebarTop = helpers.getElementTop(cache.sidebar.parentNode);
            // Update link top positions
            helpers.updateContentTops();
            // Toggles sticky sidebar if resize caused scroll to go beyond sidebar
            helpers.scrollToggle(cache.sidebar, 'fixed-sidebar', sidebarTop);
            // Toggles link state if resize caused scroll to be in position
            if (activateTabs) {
                setSidebar();
            }
        }, 250));

        // Change element properties on scroll
        document.addEventListener('scroll', function() {
            // Toggles sticky sidebar
            helpers.scrollToggle(cache.sidebar, 'fixed-sidebar', sidebarTop);
            // Toggle sidebar activated tabs
            if (activateTabs) {
                // Set sidebar appearance
                setSidebar();
            }
        });
    })();

    // Content scroll position listeners
    (function() {

        // How far into each content will cause it to appear
        var pageOffset = 0.6;

        // Updates pageOffset, so content appears at different point for portrait/landscape screen ratios
        var updatePageOffset = function() {

            // Client width/height polyfills
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            pageOffset = (width / height > 1) ? 0.6 : 0.85;
        };

        // Check to see if each content should appear based on current scroll position
        var toggleContents = function() {
            for (var i = 0; i < cache.contentTops.length; i++) {
                // Toggle check function for each cell
                // contentCells[i + 1] because frontpage is also a content-cell (need to exclude it)
                helpers.scrollToggle(cache.contentCells[i + 1], 'hidden', cache.contentTops[i] - window.innerHeight * pageOffset, true);
            }
        };

        // Toggles the sidebar
        var toggleSidebar = function() {
            helpers.scrollToggle(cache.sidebar, 'hidden', cache.contentTops[0] - window.innerHeight * pageOffset, true);
        }

        // Check position on initial load
        window.addEventListener('load', function() {
            // Initialize pageOffset
            updatePageOffset();
            // Toggle main contents
            toggleContents();
            // Toggle sidebar
            toggleSidebar();
        });

        // Reload items on resize based on scroll position
        window.addEventListener('resize', function() {
            // Update pageOffset
            updatePageOffset();
            // Update content top positions
            helpers.updateContentTops();
            // Toggle main contents
            toggleContents();
            // Toggle sidebar
            toggleSidebar();
        });

        document.addEventListener('scroll', function() {
            // Toggle main contents
            toggleContents();
            // Toggle sidebar
            toggleSidebar();
        });
    })();

    // Alternating subtitle
    (function() {

        // Get list of children
        var titles = document.getElementById('subtitle').children;
        // Initiate counter
        var curr = 0;
        // Cache subtitle location and array length
        var subBox = titles[curr].getBoundingClientRect().top + window.pageYOffset + titles[curr].offsetHeight;
        var length = titles.length;

        // Show beginning subtitle
        titles[curr].classList.add('active');
        // Set height of containing div (All subtitles have same height)
        titles[curr].parentNode.setAttribute('style', 'height:' + titles[curr].offsetHeight + 'px');
        // Start loop to change up titles
        setInterval(function() {
            // Cycle through subtitles only if subtitles are visible
            // Get current element
            if (window.pageYOffset < subBox) {
                // Deactivate current title
                titles[curr].classList.remove('active');
                // Increment curr and mod by array length to cycle curr between 0 and array length
                curr = ++curr % length;
                // Activate next title
                titles[curr].classList.add('active');
            }
        }, 2500);
    })();

    // Mobile menu listeners
    (function() {

        // Caching related elements
        var menuIconContainer = document.getElementById('mobile-menu-icon-container');
        var menuContentWrapper = document.getElementById('mobile-menu-content-wrapper');
        var dragger = document.getElementById('mobile-menu-dragger');
        var menuLinks = document.getElementsByClassName('mobile-menu-link');
        var body = document.getElementsByTagName('body')[0];

        // Used to remember where our position was before the menu was clicked
        var scrollBeforeMenu;
        var scrollKept = false;

        // Used to record which link we should highlight in the mobile menu
        var currentContent;
        var currentLink;

        // Used to determine scroll direction
        var pastScroll = helpers.scroll();
        var scrollDir = 0;
        var enableHideMenu = true;

        // 200 ms menu transition
        var transitionTime = 200;

        // CSS set screen sizes
        var screenSizes = {
            small: 640,
            mid: 1000,
            big: 1200
        };

        // Debounced scroll event
        var scrollEvent = helpers.throttle(function() {

            // Determine scroll direction
            var currScroll = helpers.scroll();
            var scroll = currScroll - pastScroll;

            // Moving average prevents skipping of icon
            scrollDir = scroll * 0.7 + scrollDir * 0.3;
            pastScroll = currScroll;

            // Prevent icon from hiding when coming out of menu
            if (enableHideMenu && window.innerWidth <= screenSizes.big) {
                // Hide or show mobile menu icon depending on scroll direction
                if (scrollDir < 0 || currScroll <= window.innerHeight / 2) {
                    menuIconContainer.classList.remove('hide-icon-container');
                } else {
                    menuIconContainer.classList.add('hide-icon-container');
                }
            } else {
                enableHideMenu = true;
                scrollDir = 0;
            }
        }, 20);

        // Listen for click events on the mobile icon
        menuIconContainer.addEventListener('click', function() {

            // Remove previous active link
            if (currentLink) currentLink.classList.remove('active');

            // Toggle the menu and icon
            helpers.classToggle(menuIconContainer, 'show-menu');

            // Check whether body scrolling is already disabled
            if (!helpers.hasClass(body, 'disable-scroll')) {

                // If it isn't, record current scroll location
                scrollBeforeMenu = helpers.scroll();
                scrollKept = true;

                for (var i = 0; i < cache.contentMarkers.length; i++) {
                    // If we're past a certain point in any given section, record it as the current section
                    if (scrollBeforeMenu > helpers.getElementTop(cache.contentMarkers[i]) - window.innerHeight * 0.5) {
                        currentContent = cache.contentMarkers[i];
                    } else {
                        break;
                    }
                }

                // Highlight the link corresponding to the current content
                for (var i = 0; i < menuLinks.length; i++) {

                    var hash = menuLinks[i].hash;

                    if (hash && currentContent.id === menuLinks[i].hash.substring(1)) {
                        menuLinks[i].classList.add('active');
                        currentLink = menuLinks[i];
                        break
                    }
                }

                // To prevent user from seeing the page jump
                setTimeout(function() {
                    body.classList.add('disable-scroll');
                }, transitionTime);

            } else {
                // Re-enable scroll and scroll to the remembered position
                body.classList.remove('disable-scroll');
                window.scrollTo(0, scrollBeforeMenu);
                scrollKept = false;
                enableHideMenu = false;
            }
        });

        // Listen for click events on mobile menu links
        Array.prototype.forEach.call(menuLinks, function(link) {

            var menuLinksEvent = function(e) {
                // Close mobile menu and move to hash location
                if(link.hash) {
                    menuIconContainer.classList.remove('show-menu');
                    body.classList.remove('disable-scroll');
                    window.scrollTo(0, helpers.getElementTop(document.getElementById(link.hash.substring(1))));
                    location.hash = link.hash
                    scrollKept = false;
                    currentLink.classList.remove('active');
                }
            };

            // Add click event for each link
            link.addEventListener('click', menuLinksEvent);

            // For mobile touch devices not registering click event
            link.addEventListener('touchend', menuLinksEvent);
        });

        // Listen for resize events
        window.addEventListener('resize', function() {
            // Exit mobile menu if width is greater than specified size
            if (window.innerWidth > screenSizes.big && scrollKept) {
                menuIconContainer.classList.remove('show-menu');
                body.classList.remove('disable-scroll');
                // Scroll to remembered position
                window.scrollTo(0, scrollBeforeMenu);
                scrollKept = false;
            }
        });

        // Show icon on initial load
        window.addEventListener('load', function() {
            // Only listen for scroll on page load to show icon on load
            enableHideMenu = false;
            setTimeout(function() {
                // Listen for scroll events
                document.addEventListener('scroll', scrollEvent);
            }, 100);
        });
    })();
})();
