/**
 * Mobile App JavaScript Framework for 1StopFirm
 * Provides mobile-optimized interactions and app-like functionality
 */

class MobileApp {
    constructor() {
        this.isMenuOpen = false;
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTouchGestures();
        this.setupFormHandling();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.preventZoom();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.navbar-menu-toggle');
        const menuOverlay = document.querySelector('.mobile-menu-overlay');
        const menu = document.querySelector('.mobile-menu');
        const menuClose = document.querySelector('.mobile-menu-close');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => this.closeMenu());
        }

        if (menuClose) {
            menuClose.addEventListener('click', () => this.closeMenu());
        }

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Handle scroll events
        window.addEventListener('scroll', () => this.handleScroll());
    }

    setupTouchGestures() {
        // Swipe to close menu
        const menu = document.querySelector('.mobile-menu');
        if (menu) {
            menu.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
            });

            menu.addEventListener('touchmove', (e) => {
                const touchX = e.touches[0].clientX;
                const diffX = touchX - this.touchStartX;
                
                // If swiping right (closing gesture)
                if (diffX > 50 && this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        }

        // Pull to refresh gesture (optional)
        let startY = 0;
        let currentY = 0;
        let isPulling = false;

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (isPulling && window.scrollY === 0) {
                currentY = e.touches[0].clientY;
                const pullDistance = currentY - startY;
                
                if (pullDistance > 100) {
                    // Could implement pull-to-refresh here
                    // For now, just prevent default
                    e.preventDefault();
                }
            }
        });

        document.addEventListener('touchend', () => {
            isPulling = false;
        });
    }

    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add loading states to form submissions
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    this.setLoadingState(submitBtn, true);
                }
            });

            // Auto-resize textareas
            const textareas = form.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', () => this.autoResizeTextarea(textarea));
            });

            // Add floating labels effect
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => this.addFocusEffect(input));
                input.addEventListener('blur', () => this.removeFocusEffect(input));
            });
        });
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.mobile-navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slideInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    preventZoom() {
        // Prevent double-tap zoom on buttons and links
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Prevent pinch zoom
        document.addEventListener('gesturestart', (e) => e.preventDefault());
        document.addEventListener('gesturechange', (e) => e.preventDefault());
        document.addEventListener('gestureend', (e) => e.preventDefault());
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        const menuToggle = document.querySelector('.navbar-menu-toggle');
        const menuOverlay = document.querySelector('.mobile-menu-overlay');
        const menu = document.querySelector('.mobile-menu');

        if (menuToggle) menuToggle.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        if (menu) menu.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        this.isMenuOpen = true;

        // Add animation delay to menu items
        const menuLinks = document.querySelectorAll('.mobile-menu-link');
        menuLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.classList.add('animate-slideInDown');
        });
    }

    closeMenu() {
        const menuToggle = document.querySelector('.navbar-menu-toggle');
        const menuOverlay = document.querySelector('.mobile-menu-overlay');
        const menu = document.querySelector('.mobile-menu');

        if (menuToggle) menuToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (menu) menu.classList.remove('active');

        // Restore body scroll
        document.body.style.overflow = '';
        this.isMenuOpen = false;

        // Remove animation classes
        const menuLinks = document.querySelectorAll('.mobile-menu-link');
        menuLinks.forEach(link => {
            link.classList.remove('animate-slideInDown');
            link.style.animationDelay = '';
        });
    }

    handleResize() {
        // Close menu on orientation change
        if (this.isMenuOpen) {
            this.closeMenu();
        }

        // Adjust viewport height for mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    handleScroll() {
        const navbar = document.querySelector('.mobile-navbar');
        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Hide/show navbar on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                navbar?.classList.add('navbar-hidden');
            } else {
                // Scrolling up
                navbar?.classList.remove('navbar-hidden');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setLoadingState(button, loading) {
        if (loading) {
            button.disabled = true;
            button.innerHTML = `
                <span class="loading-spinner"></span>
                Sending...
            `;
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.classList.remove('loading');
        }
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    addFocusEffect(input) {
        const parent = input.closest('.form-group');
        if (parent) {
            parent.classList.add('focused');
        }
    }

    removeFocusEffect(input) {
        const parent = input.closest('.form-group');
        if (parent && !input.value) {
            parent.classList.remove('focused');
        }
    }

    // Utility methods
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;

        document.body.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);

        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
    }

    vibrate(pattern = [100]) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    // Share API integration
    async share(data) {
        if (navigator.share) {
            try {
                await navigator.share(data);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            if (navigator.clipboard && data.url) {
                await navigator.clipboard.writeText(data.url);
                this.showToast('Link copied to clipboard!');
            }
        }
    }
}

// Additional CSS for dynamic elements
const additionalCSS = `
    .mobile-navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }

    .mobile-navbar.navbar-hidden {
        transform: translateY(-100%);
    }

    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }

    .form-group.focused .form-label {
        color: var(--primary);
        transform: scale(0.9);
    }

    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gray-900);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: var(--shadow-xl);
        z-index: var(--z-tooltip);
        max-width: calc(100% - 40px);
        animation: slideInUp 0.3s ease-out;
    }

    .toast-info { background: var(--primary); }
    .toast-success { background: var(--accent); }
    .toast-error { background: var(--secondary); }

    .toast-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }

    .toast-close {
        background: none;
        border: none;
        color: currentColor;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }

    /* Enhanced mobile styles */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .animate-on-scroll.animate-slideInUp {
        opacity: 1;
        transform: translateY(0);
    }

    /* Mobile-specific hover states */
    @media (hover: none) and (pointer: coarse) {
        .btn:hover {
            transform: none;
        }
        
        .card:hover {
            transform: none;
        }
        
        .btn:active {
            transform: scale(0.98);
        }
        
        .card:active {
            transform: scale(0.99);
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileApp = new MobileApp();
    
    // Set initial viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileApp;
}
