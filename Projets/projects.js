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