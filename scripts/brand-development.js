// Brand Development Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize service cards
    initServiceCards();
    
    // Initialize process steps
    initProcessSteps();
    
    // Initialize portfolio items
    initPortfolio();
    
    // Initialize testimonial slider if available
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize portfolio filter tabs
    initPortfolioTabs();
    
    // Initialize case study tabs
    initCaseStudyTabs();
    
    console.log("DOM fully loaded");
    
    // Direct handlers for testimonial navigation
    const nextButton = document.querySelector('.testimonial-next');
    if (nextButton) {
        console.log("Adding direct click handler to next button");
        nextButton.onclick = function() {
            manualTestimonialNavigation('next');
        };
    }
    
    const prevButton = document.querySelector('.testimonial-prev');
    if (prevButton) {
        console.log("Adding direct click handler to prev button");
        prevButton.onclick = function() {
            manualTestimonialNavigation('prev');
        };
    }
    
    // Manual navigation between testimonials
    window.manualTestimonialNavigation = function(direction) {
        console.log("Manual navigation triggered: " + direction);
        
        const testimonials = document.querySelectorAll('.testimonial-slide');
        if (!testimonials.length) {
            console.log("No testimonials found");
            return;
        }
        
        // Find the currently active testimonial
        let activeIndex = 0;
        testimonials.forEach((slide, index) => {
            if (slide.style.display === 'block') {
                activeIndex = index;
            }
        });
        
        // Hide current testimonial
        testimonials[activeIndex].style.display = 'none';
        
        // Calculate new index
        let newIndex;
        if (direction === 'next') {
            newIndex = (activeIndex + 1) % testimonials.length;
        } else {
            newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
        }
        
        // Update indicators
        const indicators = document.querySelectorAll('.testimonial-indicator');
        if (indicators.length) {
            indicators.forEach(ind => ind.style.background = 'rgba(255, 62, 108, 0.3)');
            indicators[newIndex].style.background = '#ff3e6c';
        }
        
        // Show new testimonial
        testimonials[newIndex].style.display = 'block';
        console.log("Showing testimonial " + (newIndex + 1));
    };
});

// Function to initialize animations
function initAnimations() {
    // Animate hero section elements
    gsap.fromTo('.hero-badge', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    });
    
    gsap.fromTo('.hero h1', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });
    
    gsap.fromTo('.hero-subtitle', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out'
    });
    
    gsap.fromTo('.cta-container', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    gsap.fromTo('.hero-clients', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power2.out'
    });
    
    gsap.fromTo('.hero-image', {
        opacity: 0,
        scale: 0.9
    }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    // Create particles for hero section
    createParticles();
}

// Function to create particles in hero section
function createParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position, size and opacity
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${duration}s ${delay}s infinite alternate ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// Function to initialize service cards
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Reset card on mouse leave after a delay
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.classList.remove('flipped');
            }, 1000);
        });
    });
    
    // Stagger animation for cards on scroll
    gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.service-overview',
            start: 'top 80%',
        }
    });
}

// Function to initialize process steps
function initProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            processSteps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked step
            this.classList.add('active');
            
            // Update the process visual if applicable
            updateProcessVisual(index);
        });
        
        // Initial animation on scroll
        gsap.from(step, {
            opacity: 0,
            x: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.process-section',
                start: 'top 80%',
            }
        });
    });
    
    // Set first step as active by default
    if (processSteps.length > 0) {
        processSteps[0].classList.add('active');
    }
}

// Function to update process visual based on active step
function updateProcessVisual(stepIndex) {
    const processAnimation = document.getElementById('process-animation');
    
    if (processAnimation) {
        // Placeholder for animation logic based on step
        // Could control a Lottie animation or change images
        
        // Example: If we had different Lottie animations for each step
        /*
        switch(stepIndex) {
            case 0:
                processAnimation.load('animations/process-step1.json');
                break;
            case 1:
                processAnimation.load('animations/process-step2.json');
                break;
            // Additional cases for each step
        }
        */
    }
}

// Function to initialize portfolio items
function initPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        // Stagger animation for portfolio items
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.portfolio-section',
                start: 'top 80%',
            }
        });
    });
}

// Function to initialize testimonial slider
function initTestimonialSlider() {
    console.log("Initializing testimonial slider");
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    let currentSlide = 0;
    
    console.log("Found " + testimonialSlides.length + " testimonial slides");
    
    // Function to show a specific slide
    function showSlide(index) {
        console.log("Showing slide " + index);
        
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.style.background = 'rgba(255, 62, 108, 0.3)';
            indicator.classList.remove('active');
        });
        
        // Show the current slide
        if (testimonialSlides[index]) {
            testimonialSlides[index].style.display = 'block';
            
            // Fade in animation
            testimonialSlides[index].style.opacity = '0';
            setTimeout(() => {
                testimonialSlides[index].style.opacity = '1';
                testimonialSlides[index].style.transition = 'opacity 0.5s ease-in-out';
            }, 50);
        }
        
        // Update the indicator
        if (indicators[index]) {
            indicators[index].style.background = '#ff3e6c';
            indicators[index].classList.add('active');
        }
    }
    
    // Make sure the slides have the right display property initially
    testimonialSlides.forEach((slide, idx) => {
        if (idx === 0) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
    
    // Next button click handler
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            console.log("Next button clicked");
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    
    // Previous button click handler
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            console.log("Previous button clicked");
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log("Indicator " + index + " clicked");
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Initialize with first slide
    showSlide(0);
}

// Function to initialize scroll animations
function initScrollAnimations() {
    // Animate section headers on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            }
        });
    });
    
    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.portfolio-section',
                start: 'top 80%',
            }
        });
    });
    
    // Animate testimonials
    if (document.querySelector('.testimonials-section')) {
        gsap.from('.testimonial-slide', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: 'top 80%',
            }
        });
    }
    
    // Animate CTA section
    if (document.querySelector('.cta-section')) {
        gsap.from('.cta-content', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 80%',
            }
        });
    }
}

// Function for custom particle effect (optional enhancement)
function createParticleEffect(container) {
    if (!container) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);
    
    // Particle configuration
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Portfolio filter tabs
function initPortfolioTabs() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Case study tabs functionality
function initCaseStudyTabs() {
    const caseTabs = document.querySelectorAll('.case-tab');
    const casePanels = document.querySelectorAll('.case-study-panel');
    
    caseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            caseTabs.forEach(t => t.classList.remove('active'));
            caseTabs.forEach(t => t.style.color = '#666');
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.style.color = '#ff3e6c';
            
            // Hide all panels
            casePanels.forEach(panel => {
                panel.style.display = 'none';
            });
            
            // Show the corresponding panel
            const panelId = this.getAttribute('data-case');
            document.getElementById(panelId).style.display = 'block';
            
            // Add a fade-in animation
            document.getElementById(panelId).style.opacity = 0;
            document.getElementById(panelId).style.transition = 'opacity 0.5s ease-in-out';
            
            setTimeout(() => {
                document.getElementById(panelId).style.opacity = 1;
            }, 50);
        });
    });
}

// Manual navigation for indicator clicks
window.manualTestimonialIndicatorClick = function(index) {
    console.log("Manual indicator click: " + index);
    
    const testimonials = document.querySelectorAll('.testimonial-slide');
    if (!testimonials.length) {
        console.log("No testimonials found");
        return;
    }
    
    // Hide all testimonials
    testimonials.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Update indicators
    const indicators = document.querySelectorAll('.testimonial-indicator');
    if (indicators.length) {
        indicators.forEach(ind => {
            ind.style.background = 'rgba(255, 62, 108, 0.3)';
            ind.classList.remove('active');
        });
        
        // Update active indicator
        if (indicators[index]) {
            indicators[index].style.background = '#ff3e6c';
            indicators[index].classList.add('active');
        }
    }
    
    // Show selected testimonial
    if (testimonials[index]) {
        testimonials[index].style.display = 'block';
        
        // Fade in animation
        testimonials[index].style.opacity = '0';
        setTimeout(() => {
            testimonials[index].style.opacity = '1';
            testimonials[index].style.transition = 'opacity 0.5s ease-in-out';
        }, 50);
        
        console.log("Showing testimonial " + (index + 1));
    }
}; 