/**
 * Digital Marketing Service Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyNavigation();
    initGSAPAnimations();
    initLottieAnimations();
    initServiceCards();
    initProcessSteps();
    initStatCounters();
    initCaseStudyTabs();
    initTestimonialSlider();
    initPricingToggle();
    initFloatingContact();

    // Form submission handling
    document.getElementById('contactForm')?.addEventListener('submit', handleFormSubmit);
});

/**
 * Sticky Navigation
 * Changes the navigation style when scrolling
 */
function initStickyNavigation() {
    const header = document.getElementById('main-header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initial check in case page is loaded scrolled down
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    }
}

/**
 * GSAP Animations
 * Initializes scroll-triggered animations using GSAP
 */
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section text split animation
    const splitText = document.querySelector('.split-text');
    if (splitText) {
        const text = splitText.textContent;
        const newText = text.split('').map(char => {
            if (char === ' ') {
                return ' ';
            }
            return `<span class="char">${char}</span>`;
        }).join('');
        
        splitText.innerHTML = newText;
        
        gsap.from('.char', {
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 0.5,
            delay: 0.5
        });
    }
    
    // Particles in hero background
    const particles = document.getElementById('hero-particles');
    if (particles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particles.appendChild(particle);
            
            gsap.set(particle, {
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5
            });
            
            gsap.to(particle, {
                x: '+=' + (Math.random() * 100 - 50) + '%',
                y: '+=' + (Math.random() * 100 - 50) + '%',
                opacity: Math.random() * 0.5 + 0.3,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // Section animations
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        // Animate section headers
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
            gsap.from(sectionHeader, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionHeader,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });
}

/**
 * Lottie Animations
 * Initializes Lottie animations
 */
function initLottieAnimations() {
    // Hero animation
    const heroAnimation = document.getElementById('hero-animation');
    if (heroAnimation) {
        lottie.loadAnimation({
            container: heroAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets8.lottiefiles.com/packages/lf20_ksxv4zom.json' // Digital marketing animation
        });
    }
    
    // Process animation
    const processAnimation = document.getElementById('process-animation');
    if (processAnimation) {
        lottie.loadAnimation({
            container: processAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets5.lottiefiles.com/packages/lf20_syqnfe7c.json' // Process animation
        });
    }
}

/**
 * Service Cards Interaction
 * Adds animation and interaction to service cards
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Set initial positions for GSAP animation
        const cardFront = card.querySelector('.service-card-front');
        const cardBack = card.querySelector('.service-card-back');
        
        // Add ScrollTrigger animation
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

/**
 * Process Steps Interaction
 * Adds interaction to process steps and animation
 */
function initProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    const processVisual = document.querySelector('.process-visual');
    
    processSteps.forEach((step, index) => {
        // Add ScrollTrigger animation
        gsap.from(step, {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Add click event to switch active step
        step.addEventListener('click', () => {
            // Remove active class from all steps
            processSteps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked step
            step.classList.add('active');
            
            // Animate the process visual to match the active step
            gsap.to(processVisual, {
                scale: 1.02,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut'
            });
        });
    });
}

/**
 * Case Study Tabs
 * Manages the case study tab switching
 */
function initCaseStudyTabs() {
    const tabs = document.querySelectorAll('.case-tab');
    const panels = document.querySelectorAll('.case-study-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-case');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target panel
            panels.forEach(panel => {
                if (panel.id === target) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Stat Counters
 * Animates counting up to the target number when scrolled into view
 */
function initStatCounters() {
    const statElements = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function startCounting() {
        if (countersStarted) return;
        
        statElements.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in milliseconds
            
            // Use GSAP for smoother animation
            gsap.fromTo(stat, 
                { innerText: 0 }, 
                { 
                    innerText: targetValue,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.floor(this.targets()[0].innerText);
                    }
                }
            );
        });
        
        countersStarted = true;
    }
    
    // Start counting when stats section comes into view
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        ScrollTrigger.create({
            trigger: resultsSection,
            start: 'top 70%',
            onEnter: startCounting
        });
    }
}

/**
 * Testimonial Slider
 * Creates a simple slider for testimonials
 */
function initTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    
    // Clear existing dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        
        // Create dots for each slide
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', index);
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Initialize slider
    updateSlider();
    
    // Event listeners
    prevButton?.addEventListener('click', prevSlide);
    nextButton?.addEventListener('click', nextSlide);
    
    // Auto advance slides every 7 seconds
    let slideInterval = setInterval(nextSlide, 7000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 7000));
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe right
        }
    }
    
    function updateSlider() {
        // Use GSAP for smoother transitions
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                gsap.to(slide, {
                    opacity: 1,
                    display: 'block',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(slide, {
                    opacity: 0,
                    display: 'none',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        
        // Reset the timer when manually changing slides
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
    }
}

/**
 * Pricing Toggle
 * Switches between monthly and annual pricing
 */
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricingToggle');
    if (!pricingToggle) return;
    
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const annualPrices = document.querySelectorAll('.price-annual');
    
    pricingToggle.addEventListener('change', function() {
        if (this.checked) {
            // Show annual pricing
            gsap.to(monthlyPrices, { opacity: 0, display: 'none', duration: 0.3 });
            gsap.to(annualPrices, { opacity: 1, display: 'flex', duration: 0.3, delay: 0.1 });
        } else {
            // Show monthly pricing
            gsap.to(annualPrices, { opacity: 0, display: 'none', duration: 0.3 });
            gsap.to(monthlyPrices, { opacity: 1, display: 'flex', duration: 0.3, delay: 0.1 });
        }
    });
}

/**
 * Floating Contact Button
 * Handles click events for the floating contact button
 */
function initFloatingContact() {
    const floatingButton = document.querySelector('.floating-contact-btn');
    if (!floatingButton) return;
    
    floatingButton.addEventListener('click', function() {
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: contactSection,
                    offsetY: 100
                },
                ease: 'power2.inOut'
            });
        }
    });
    
    // Add animation effect
    gsap.to(floatingButton, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

/**
 * Form Submission
 * Handles the contact form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Form validation logic would go here
    
    // For demonstration purposes, show success message
    const form = event.target;
    const name = form.querySelector('#name').value;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('form-success');
    successMessage.innerHTML = `
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <h3>Thank you, ${name}!</h3>
        <p>Your request has been submitted successfully. One of our digital marketing experts will contact you within 24 hours to schedule your strategy session.</p>
    `;
    
    // Animate out the form
    gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
            form.style.display = 'none';
            form.parentNode.appendChild(successMessage);
            
            // Animate in the success message
            gsap.from(successMessage, {
                opacity: 0,
                y: 20,
                duration: 0.5
            });
        }
    });
    
    // In a real implementation, you would submit the form data to your backend here
} 