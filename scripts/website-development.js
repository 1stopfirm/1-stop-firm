// Force immediate visibility regardless of when DOM content loaded fires
(function() {
    console.log('Website Development script executing immediately');
    
    // Make all elements visible before DOM content loaded
    forceContentVisibility();
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Development page script loaded');
    
    // IMMEDIATELY make all content visible first
    forceContentVisibility();
    
    // Add cache busting to CSS files
    addVersionToCssFiles();
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Enable smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Hero section animations
    animateHeroSection();
    
    // Services section animations
    animateServicesSection();
    
    // Process section animations
    animateProcessSection();
    
    // Portfolio section animations
    animatePortfolioSection();
    
    // Testimonials section animations
    animateTestimonialsSection();
    
    // Code Animation in Hero Section
    initCodeAnimation();
    
    // 3D Effect for Service Cards (for modern browsers)
    initServiceCards3DEffect();
    
    // Initialize Three.js background for process section
    initProcessBackground();
});

// Also run when window is loaded to ensure all resources are available
window.addEventListener('load', function() {
    console.log('Window loaded - forcing content visibility again');
    forceContentVisibility();
});

// Function to force all content to be immediately visible without waiting for animations
function forceContentVisibility() {
    // Make all elements visible immediately
    document.querySelectorAll('.webdev-service-card, .webdev-portfolio-item, .webdev-testimonial').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
    });
    
    // Force visibility for service cards, portfolio items, and testimonials
    document.querySelectorAll('.webdev-services-grid, .webdev-portfolio-grid, .webdev-testimonials-grid').forEach(grid => {
        if (grid) {
            grid.style.opacity = '1';
            grid.style.visibility = 'visible';
            
            // Force child elements to be visible
            Array.from(grid.children).forEach(child => {
                child.style.opacity = '1';
                child.style.transform = 'none';
                child.style.visibility = 'visible';
            });
        }
    });
    
    // Force visibility on all sections and their content
    document.querySelectorAll('section').forEach(section => {
        // Set immediate visibility
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        
        // Set all child elements to be visible
        Array.from(section.querySelectorAll('*')).forEach(child => {
            if (child.style) {
                child.style.opacity = '1';
                child.style.visibility = 'visible';
                // Remove any transforms that might hide the element
                child.style.transform = 'none';
            }
        });
    });
    
    // Force GSAP animations to complete immediately
    if (window.gsap) {
        gsap.set(".webdev-services-grid, .webdev-service-card, .webdev-portfolio-grid, .webdev-portfolio-item, .webdev-testimonials-grid, .webdev-testimonial", {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            visibility: "visible",
            duration: 0
        });
    }
}

// Function to add version parameter to CSS files to prevent caching
function addVersionToCssFiles() {
    const timestamp = new Date().getTime();
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (link.href.includes('styles/')) {
            link.href = link.href.split('?')[0] + '?v=' + timestamp;
        }
    });
    
    // Also add version to image sources to prevent caching
    document.querySelectorAll('img').forEach(img => {
        if (img.src && !img.src.includes('http')) {
            img.src = img.src.split('?')[0] + '?v=' + timestamp;
        }
    });
}

// Hero section animations - MODIFIED to make content immediately visible
function animateHeroSection() {
    // First make everything visible immediately
    const heroContent = document.querySelector('.webdev-hero-content');
    if (heroContent) {
        // Force immediate visibility
        gsap.set(heroContent.querySelector('h1'), { opacity: 1, y: 0 });
        gsap.set(heroContent.querySelector('.webdev-hero-subtitle'), { opacity: 1, y: 0 });
        gsap.set(heroContent.querySelectorAll('.webdev-hero-feature'), { opacity: 1, y: 0 });
        gsap.set(heroContent.querySelectorAll('.cta-container a'), { opacity: 1, y: 0 });
        
        // Then add subtle animations for a nice effect (but content is already visible)
        gsap.from(heroContent.querySelector('h1'), {
            duration: 1,
            y: 50,
            ease: 'power3.out',
            clearProps: 'all'
        });
        
        gsap.from(heroContent.querySelector('.webdev-hero-subtitle'), {
            duration: 1,
            y: 30,
            delay: 0.2,
            ease: 'power3.out',
            clearProps: 'all'
        });
        
        const heroFeatures = heroContent.querySelectorAll('.webdev-hero-feature');
        gsap.from(heroFeatures, {
            duration: 0.8,
            y: 20,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power3.out',
            clearProps: 'all'
        });
        
        const heroCTAs = heroContent.querySelectorAll('.cta-container a');
        gsap.from(heroCTAs, {
            duration: 0.8,
            y: 20,
            stagger: 0.15,
            delay: 0.2,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }
    
    // Animate floating shapes
    const shapes = document.querySelectorAll('.webdev-shape');
    if (shapes.length) {
        gsap.to(shapes, {
            y: 20,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: 0.2
        });
    }
}

// Services section animations - MODIFIED to make content immediately visible
function animateServicesSection() {
    const servicesTitle = document.querySelector('.webdev-services-title');
    const servicesDescription = document.querySelector('.webdev-services-description');
    const serviceCards = document.querySelectorAll('.webdev-service-card');
    
    // First force everything to be visible
    if (servicesTitle && servicesDescription) {
        gsap.set(servicesTitle, { opacity: 1, y: 0 });
        gsap.set(servicesDescription, { opacity: 1, y: 0 });
    }
    
    if (serviceCards.length) {
        gsap.set(serviceCards, { opacity: 1, y: 0 });
    }
    
    // Then add subtle animations with no delay (content already visible)
    if (servicesTitle && servicesDescription) {
        gsap.from(servicesTitle, {
            duration: 0.8,
            y: 30,
            ease: 'power3.out',
            clearProps: 'all'
        });
        
        gsap.from(servicesDescription, {
            duration: 0.8,
            y: 30,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }
    
    if (serviceCards.length) {
        gsap.from(serviceCards, {
            duration: 0.8,
            y: 25,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }
}

// Process section animations - MODIFIED to make content immediately visible
function animateProcessSection() {
    const processSteps = document.querySelectorAll('.webdev-process-step');
    
    // First force all content to be visible
    if (processSteps.length) {
        processSteps.forEach((step) => {
            const stepNumber = step.querySelector('.webdev-process-step-number');
            const stepContent = step.querySelector('.webdev-process-step-content');
            const stepImage = step.querySelector('.webdev-process-step-image');
            
            if (stepNumber) gsap.set(stepNumber, { opacity: 1, scale: 1 });
            if (stepContent) gsap.set(stepContent, { opacity: 1, x: 0 });
            if (stepImage) gsap.set(stepImage, { opacity: 1, y: 0 });
        });
        
        // Animate with no delay (content already visible)
        processSteps.forEach((step, index) => {
            const stepNumber = step.querySelector('.webdev-process-step-number');
            const stepContent = step.querySelector('.webdev-process-step-content');
            
            if (stepNumber && stepContent) {
                gsap.from(stepNumber, {
                    duration: 0.6,
                    scale: 0.8,
                    ease: 'back.out(1.7)',
                    clearProps: 'all'
                });
                
                gsap.from(stepContent, {
                    duration: 0.8,
                    x: index % 2 === 0 ? -20 : 20,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
                
                const stepImage = step.querySelector('.webdev-process-step-image');
                if (stepImage) {
                    gsap.from(stepImage, {
                        duration: 1,
                        y: 15,
                        ease: 'power3.out',
                        clearProps: 'all'
                    });
                }
            }
        });
    }
}

// Portfolio section animations - MODIFIED to make content immediately visible
function animatePortfolioSection() {
    const portfolioItems = document.querySelectorAll('.webdev-portfolio-item');
    
    // First force all items to be visible
    if (portfolioItems.length) {
        gsap.set(portfolioItems, { opacity: 1, y: 0 });
        
        // Add subtle animation with no delay
        gsap.from(portfolioItems, {
            duration: 0.8,
            y: 20,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }
}

// Testimonials section animations - MODIFIED to make content immediately visible
function animateTestimonialsSection() {
    const testimonials = document.querySelectorAll('.webdev-testimonial');
    
    // First force all testimonials to be visible
    if (testimonials.length) {
        gsap.set(testimonials, { opacity: 1, y: 0 });
        
        // Add subtle animation with no delay
        gsap.from(testimonials, {
            duration: 0.8,
            y: 20,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }
}

// Code Animation in Hero Section
function initCodeAnimation() {
    const codeWindow = document.querySelector('.webdev-code-window');
    
    if (!codeWindow) return;
    
    // Example code to animate
    const codeLines = [
        { text: '<span class="webdev-code-element">&lt;!DOCTYPE <span class="webdev-code-keyword">html</span>&gt;</span>', delay: 0 },
        { text: '<span class="webdev-code-element">&lt;html <span class="webdev-code-keyword">lang</span>=<span class="webdev-code-string">"en"</span>&gt;</span>', delay: 0.5 },
        { text: '<span class="webdev-code-element">&lt;head&gt;</span>', delay: 0.8 },
        { text: '  <span class="webdev-code-element">&lt;meta <span class="webdev-code-keyword">charset</span>=<span class="webdev-code-string">"UTF-8"</span>&gt;</span>', delay: 1.1 },
        { text: '  <span class="webdev-code-element">&lt;meta <span class="webdev-code-keyword">name</span>=<span class="webdev-code-string">"viewport"</span> <span class="webdev-code-keyword">content</span>=<span class="webdev-code-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>', delay: 1.4 },
        { text: '  <span class="webdev-code-element">&lt;title&gt;</span>Modern Website<span class="webdev-code-element">&lt;/title&gt;</span>', delay: 1.7 },
        { text: '  <span class="webdev-code-element">&lt;link <span class="webdev-code-keyword">rel</span>=<span class="webdev-code-string">"stylesheet"</span> <span class="webdev-code-keyword">href</span>=<span class="webdev-code-string">"styles.css"</span>&gt;</span>', delay: 2.0 },
        { text: '<span class="webdev-code-element">&lt;/head&gt;</span>', delay: 2.3 },
        { text: '<span class="webdev-code-element">&lt;body&gt;</span>', delay: 2.6 },
        { text: '  <span class="webdev-code-element">&lt;header <span class="webdev-code-keyword">class</span>=<span class="webdev-code-string">"hero"</span>&gt;</span>', delay: 2.9 },
        { text: '    <span class="webdev-code-element">&lt;nav&gt;</span>', delay: 3.2 },
        { text: '      <span class="webdev-code-comment">// Navigation items</span>', delay: 3.5 },
        { text: '    <span class="webdev-code-element">&lt;/nav&gt;</span>', delay: 3.8 },
        { text: '    <span class="webdev-code-element">&lt;div <span class="webdev-code-keyword">class</span>=<span class="webdev-code-string">"hero-content"</span>&gt;</span>', delay: 4.1 },
        { text: '      <span class="webdev-code-element">&lt;h1&gt;</span>Welcome to our Website<span class="webdev-code-element">&lt;/h1&gt;</span>', delay: 4.4 },
        { text: '      <span class="webdev-code-element">&lt;p&gt;</span>We build amazing web experiences<span class="webdev-code-element">&lt;/p&gt;</span>', delay: 4.7 },
        { text: '      <span class="webdev-code-element">&lt;button&gt;</span>Get Started<span class="webdev-code-element">&lt;/button&gt;</span>', delay: 5.0 },
        { text: '    <span class="webdev-code-element">&lt;/div&gt;</span>', delay: 5.3 },
        { text: '  <span class="webdev-code-element">&lt;/header&gt;</span>', delay: 5.6 },
        { text: '  <span class="webdev-code-comment">// More website content...</span>', delay: 5.9 },
        { text: '  <span class="webdev-code-element">&lt;script <span class="webdev-code-keyword">src</span>=<span class="webdev-code-string">"script.js"</span>&gt;&lt;/script&gt;</span>', delay: 6.2 },
        { text: '<span class="webdev-code-element">&lt;/body&gt;</span>', delay: 6.5 },
        { text: '<span class="webdev-code-element">&lt;/html&gt;</span>', delay: 6.8 }
    ];
    
    // Create code header
    const codeHeader = document.createElement('div');
    codeHeader.className = 'webdev-code-header';
    
    const codeDots = document.createElement('div');
    codeDots.className = 'webdev-code-dots';
    
    const dotRed = document.createElement('div');
    dotRed.className = 'webdev-code-dot webdev-code-dot-red';
    
    const dotYellow = document.createElement('div');
    dotYellow.className = 'webdev-code-dot webdev-code-dot-yellow';
    
    const dotGreen = document.createElement('div');
    dotGreen.className = 'webdev-code-dot webdev-code-dot-green';
    
    codeDots.appendChild(dotRed);
    codeDots.appendChild(dotYellow);
    codeDots.appendChild(dotGreen);
    
    const codeTitle = document.createElement('div');
    codeTitle.className = 'webdev-code-title';
    codeTitle.textContent = 'index.html';
    
    codeHeader.appendChild(codeDots);
    codeHeader.appendChild(codeTitle);
    
    codeWindow.appendChild(codeHeader);
    
    // Animate code lines typing
    setTimeout(() => {
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                const lineElement = document.createElement('div');
                lineElement.className = 'webdev-code-line';
                lineElement.innerHTML = line.text;
                lineElement.style.animationDelay = `${index * 0.1}s`;
                codeWindow.appendChild(lineElement);
                
                // Add blinking cursor to the last line
                if (index === codeLines.length - 1) {
                    setTimeout(() => {
                        lineElement.innerHTML += '<span class="webdev-code-cursor"></span>';
                    }, 300);
                }
                
                // Auto-scroll the code window
                codeWindow.scrollTop = codeWindow.scrollHeight;
            }, line.delay * 1000);
        });
    }, 500);
    
    // Restart animation after a while
    setInterval(() => {
        const existingLines = codeWindow.querySelectorAll('.webdev-code-line');
        existingLines.forEach(line => line.remove());
        
        // Restart the animation
        setTimeout(() => {
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    const lineElement = document.createElement('div');
                    lineElement.className = 'webdev-code-line';
                    lineElement.innerHTML = line.text;
                    lineElement.style.animationDelay = `${index * 0.1}s`;
                    codeWindow.appendChild(lineElement);
                    
                    if (index === codeLines.length - 1) {
                        setTimeout(() => {
                            lineElement.innerHTML += '<span class="webdev-code-cursor"></span>';
                        }, 300);
                    }
                    
                    codeWindow.scrollTop = codeWindow.scrollHeight;
                }, line.delay * 1000);
            });
        }, 500);
    }, 20000); // Restart after 20 seconds
}

// 3D Effect for Service Cards
function initServiceCards3DEffect() {
    const cards = document.querySelectorAll('.webdev-service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const tiltX = deltaY * 10; // Max tilt 10deg
            const tiltY = -deltaX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-15px)';
            
            // Reset smoothly
            setTimeout(() => {
                this.style.transition = 'transform 0.5s ease';
                this.style.transform = '';
            }, 100);
            
            setTimeout(() => {
                this.style.transition = '';
            }, 600);
        });
    });
}

// Three.js background for process section
function initProcessBackground() {
    const processBg = document.querySelector('.webdev-process-bg');
    if (!processBg) return;
    
    const width = processBg.clientWidth;
    const height = processBg.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(width, height);
    processBg.appendChild(renderer.domElement);
    
    // Create grid of dots
    const dotGeometry = new THREE.BufferGeometry();
    const dotMaterial = new THREE.PointsMaterial({
        color: 0x4F46E5,
        size: 3,
        transparent: true,
        opacity: 0.5
    });
    
    const dotCount = 200;
    const positions = new Float32Array(dotCount * 3);
    
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;     // x
        positions[i + 1] = (Math.random() - 0.5) * 100; // y
        positions[i + 2] = (Math.random() - 0.5) * 100; // z
    }
    
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);
    
    camera.position.z = 50;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        dots.rotation.x += 0.0005;
        dots.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = processBg.clientWidth;
        const newHeight = processBg.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
    });
} 