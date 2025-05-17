/**
 * Strategy Consultation Page Fix Script
 * This script aims to fix issues with the strategy-consultation.html page
 * without modifying the original HTML or CSS files.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Fix script loaded and running...');
    
    // 1. Fix CSS Variables if they're missing
    const cssVarsFix = `
        :root {
            --primary: #6d28d9;
            --primary-dark: #5b21b6;
            --secondary: #FF0080;
            --secondary-dark: #CF006B;
            --accent: #00CFFD;
            --dark: #121212;
            --light: #FFFFFF;
            --gray: #F4F7FC;
            --text: #333333;
            --text-light: #777777;
        }
    `;
    
    // Inject the CSS variables if they're not already defined
    const styleElement = document.createElement('style');
    styleElement.textContent = cssVarsFix;
    document.head.appendChild(styleElement);
    
    // 2. Fix AOS (Animate On Scroll) initialization
    if (typeof AOS !== 'undefined') {
        console.log('Initializing AOS...');
        AOS.init({
            duration: 800,
            once: true,
            mirror: false,
            easing: 'ease-in-out'
        });
    } else {
        console.error('AOS library not loaded!');
    }
    
    // 3. Make sure Particles.js is initialized
    if (typeof particlesJS !== 'undefined' && document.getElementById('hero-particles')) {
        console.log('Initializing particles...');
        particlesJS('hero-particles', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6d28d9" },
                shape: {
                    type: "circle",
                    stroke: { width: 0, color: "#000000" },
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6d28d9",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    } else {
        console.error('Particles.js library not loaded or hero-particles element not found!');
    }
    
    // 4. Initialize GSAP animations for floating cards if needed
    if (typeof gsap !== 'undefined') {
        console.log('Initializing GSAP animations...');
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            const duration = 3 + Math.random() * 2; // Between 3-5s
            const delay = index * 0.2;
            const distance = 15 + Math.random() * 15; // Between 15-30px
            
            gsap.to(card, {
                y: distance,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    } else {
        console.error('GSAP library not loaded!');
    }
    
    // 5. Fix tab functionality for case studies
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        console.log('Setting up tab functionality...');
        
        // Ensure the first tab is active by default
        if (!document.querySelector('.tab-button.active')) {
            tabButtons[0].classList.add('active');
            
            const firstTabId = tabButtons[0].getAttribute('data-tab');
            const firstTabContent = document.getElementById(firstTabId);
            if (firstTabContent) {
                firstTabContent.classList.add('active');
            }
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // 6. Force visibility on key section elements that might be hidden
    const sections = [
        '#services', 
        '#process', 
        '#case-studies',
        '.services-grid',
        '.process-timeline',
        '.tabs-container'
    ];
    
    sections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el) {
                console.log(`Ensuring visibility of ${selector}...`);
                el.style.display = el.tagName === 'SECTION' ? 'block' : '';
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            }
        });
    });
    
    // 7. Ensure all data-aos elements are visible if AOS isn't working
    const aosElements = document.querySelectorAll('[data-aos]');
    if (aosElements.length > 0) {
        console.log(`Found ${aosElements.length} AOS elements, ensuring visibility...`);
        
        aosElements.forEach(el => {
            // Remove AOS classes that might be causing issues
            el.classList.remove('aos-animate', 'aos-init');
            
            // Force element to be visible
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        });
    }
    
    console.log('Fix script completed!');
}); 