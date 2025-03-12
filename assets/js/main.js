// Wait for DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    initApp();
});

/**
 * Initialize the main application functionality
 * This function will be called when the DOM is ready
 */
function initApp() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize PhotoSwipe Lightbox
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.gallery',
        children: 'a',
        pswpModule: PhotoSwipe
    });
    lightbox.init();

    // Setup smooth scrolling
    setupSmoothScroll();

    // Setup carousel animations
    setupCarouselAnimations();

    // Setup navbar transparency
    setupNavbarTransparency();

    // Log successful initialization
    console.log('Website loaded successfully with all libraries');
}

/**
 * Setup smooth scrolling behavior for navigation links
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only apply smooth scroll for same-page links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Setup carousel animations using Animate.css
 */
function setupCarouselAnimations() {
    const carousel = document.querySelector('#heroCarousel');
    
    if (carousel) {
        // Store original animation classes for each element
        const animatedElements = document.querySelectorAll('.animate__animated');
        animatedElements.forEach(el => {
            const originalClasses = Array.from(el.classList)
                .filter(className => className.startsWith('animate__'))
                .filter(className => className !== 'animate__animated');
            el.dataset.animations = originalClasses.join(' ');
        });

        // Handle slide change event
        carousel.addEventListener('slide.bs.carousel', event => {
            // Remove animations from previous slide with a delay
            const previousSlide = event.from;
            const previousCaption = document.querySelector(`.carousel-item:nth-child(${previousSlide + 1}) .carousel-caption`);
            if (previousCaption) {
                previousCaption.querySelectorAll('.animate__animated').forEach(el => {
                    // Get the animation classes
                    const animationClasses = el.dataset.animations.split(' ');
                    
                    // Add fade out animation
                    el.classList.add('animate__fadeOut');
                    
                    // Remove previous animation classes after fade out
                    setTimeout(() => {
                        el.classList.remove('animate__fadeOut', ...animationClasses);
                        el.style.opacity = '0';
                    }, 500);
                });
            }
        });

        // Handle slid event (after slide transition is completed)
        carousel.addEventListener('slid.bs.carousel', event => {
            // Add animations to new active slide
            const activeSlide = event.to;
            const activeCaption = document.querySelector(`.carousel-item:nth-child(${activeSlide + 1}) .carousel-caption`);
            if (activeCaption) {
                activeCaption.querySelectorAll('.animate__animated').forEach(el => {
                    // Get original animation classes
                    const animationClasses = el.dataset.animations.split(' ');
                    
                    // Reset opacity and add animations with a slight delay
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.classList.add(...animationClasses);
                    }, 100);
                });
            }
        });

        // Trigger animations for initial slide
        const initialCaption = document.querySelector('.carousel-item.active .carousel-caption');
        if (initialCaption) {
            initialCaption.querySelectorAll('.animate__animated').forEach(el => {
                el.style.opacity = '1';
                const animationClasses = el.dataset.animations.split(' ');
                el.classList.add(...animationClasses);
            });
        }

        // Pause carousel on hover
        carousel.addEventListener('mouseenter', () => {
            bootstrap.Carousel.getInstance(carousel).pause();
        });

        carousel.addEventListener('mouseleave', () => {
            bootstrap.Carousel.getInstance(carousel).cycle();
        });
    }
}

/**
 * Setup navbar transparency and color change on scroll
 */
function setupNavbarTransparency() {
    const navbar = document.querySelector('.navbar');
    const SCROLL_THRESHOLD = 100;

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > SCROLL_THRESHOLD) {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
        });
    }
}

/**
 * Show a success message using SweetAlert2
 * @param {string} title - The title of the message
 * @param {string} text - The message text
 */
function showSuccess(title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonColor: '#3085d6'
    });
}

/**
 * Show an error message using SweetAlert2
 * @param {string} title - The title of the error
 * @param {string} text - The error message
 */
function showError(title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#d33'
    });
}