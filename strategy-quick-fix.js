/**
 * Quick Fix Script for Strategy Consultation Page
 * Minimal script to fix visibility issues without modifying original files
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Quick fix script running...');
    
    // 1. Inject CSS variables
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary: #6d28d9 !important;
            --primary-dark: #5b21b6 !important;
            --secondary: #FF0080 !important;
            --secondary-dark: #CF006B !important;
            --accent: #00CFFD !important;
            --dark: #121212 !important;
            --light: #FFFFFF !important;
            --gray: #F4F7FC !important;
            --text: #333333 !important;
            --text-light: #777777 !important;
        }
    `;
    document.head.appendChild(style);
    
    // 2. Force initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            mirror: false
        });
    }
    
    // 3. Force all sections to be visible
    const selectors = [
        'section', '.section', 
        '#services', '#process', '#case-studies',
        '.services-grid', '.process-timeline', '.tabs-container',
        '.case-studies-section', '.cta-section'
    ];
    
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.display = 'block';
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    });
    
    // 4. Make all AOS elements visible regardless of animation
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
    });
    
    // 5. Initialize any tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        // Set first tab as active by default
        if (!document.querySelector('.tab-button.active')) {
            tabButtons[0].classList.add('active');
            
            const firstTabId = tabButtons[0].getAttribute('data-tab');
            const firstTabContent = document.getElementById(firstTabId);
            if (firstTabContent) {
                firstTabContent.classList.add('active');
            }
        }
    }
    
    console.log('Quick fix applied successfully!');
}); 