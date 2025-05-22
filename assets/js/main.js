/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);
//
class VerticalMouseDrivenCarousel {
    constructor(options = {}) {
        const defaults = {
            carousel: ".js-carousel",
            bgImg: ".js-carousel-bg-img",
            list: ".js-carousel-list",
            listItem: ".js-carousel-list-item"
        };

        this.config = Object.assign({}, defaults, options);
        this.posY = 0;
        this.init();
    }

    getElements() {
        this.carousel = document.querySelector(this.config.carousel);
        this.bgImgs = document.querySelectorAll(this.config.bgImg);
        this.listItems = document.querySelectorAll(this.config.listItem);
        this.list = document.querySelector(this.config.list);
    }

    init() {
        this.getElements();
        this.setupEventListeners();
        this.activateFirstItem();
    }

    setupEventListeners() {
        // Mouse move event
        this.carousel.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Mouse enter events for list items
        this.listItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => this.handleItemHover(e));
        });
    }

    activateFirstItem() {
        // Activate first item by default
        if (this.bgImgs.length > 0) {
            this.bgImgs[0].classList.add('is-visible');
        }
        if (this.listItems.length > 0) {
            this.listItems[0].style.opacity = 1;
        }
    }

    handleMouseMove(e) {
        const carouselRect = this.carousel.getBoundingClientRect();
        this.posY = e.clientY - carouselRect.top;
        const carouselHeight = carouselRect.height;
        const listHeight = this.list.scrollHeight;
        
        // Calculate offset based on mouse position
        const offset = -this.posY / carouselHeight * (listHeight - carouselHeight);
        
        // Animate list position
        gsap.to(this.list, {
            y: offset,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    handleItemHover(e) {
        const currentId = parseInt(e.currentTarget.dataset.itemId);
        
        // Update background image
        this.updateBackground(currentId);
        
        // Update list item opacities
        this.updateListItems(currentId);
    }

    updateBackground(currentId) {
        // Hide all background images
        gsap.to(this.bgImgs, {
            autoAlpha: 0,
            scale: 1.05,
            duration: 0.2
        });
        
        // Show current background image
        if (this.bgImgs[currentId]) {
            this.bgImgs[currentId].classList.add('is-visible');
            gsap.to(this.bgImgs[currentId], {
                autoAlpha: 1,
                scale: 1,
                duration: 0.6
            });
        }
    }

    updateListItems(currentId) {
        const totalItems = this.listItems.length;
        
        // Reset all items first
        gsap.to(this.listItems, {
            autoAlpha: 0.5,
            x: 0,
            duration: 0.5,
            ease: "power3.out"
        });
        
        // Highlight current item
        gsap.to(this.listItems[currentId], {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out"
        });
        
        // Animate items below current
        for (let i = 1; i < totalItems - currentId; i++) {
            const item = this.listItems[currentId + i];
            if (item) {
                const opacity = 0.5 / i;
                const offset = 5 * i;
                gsap.to(item, {
                    autoAlpha: opacity,
                    x: offset,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        }
        
        // Animate items above current
        for (let i = 1; i <= currentId; i++) {
            const item = this.listItems[currentId - i];
            if (item) {
                const opacity = 0.5 / i;
                const offset = 5 * i;
                gsap.to(item, {
                    autoAlpha: opacity,
                    x: offset,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        }
    }
}

// Initialize the carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VerticalMouseDrivenCarousel();
});