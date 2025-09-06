/**
 * Mobile Detection and Redirect Script for 1StopFirm
 * Redirects mobile users to 1stopfirm.com/mobile while keeping desktop/tablet users on main site
 */

(function() {
    'use strict';
    
    // Configuration
    const DESKTOP_DOMAIN = '1stopfirm.com';
    
    /**
     * Detect if device is mobile phone (not tablet)
     */
    function isMobilePhone() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            'mobile', 'android', 'iphone', 'ipod', 'blackberry', 
            'windows phone', 'opera mini', 'iemobile', 'webos'
        ];
        
        // Check for mobile keywords
        const hasMobileKeyword = mobileKeywords.some(keyword => 
            userAgent.includes(keyword)
        );
        
        // Exclude tablets (they should stay on desktop site)
        const isTablet = /tablet|ipad|playbook|silk/i.test(userAgent) ||
                         (userAgent.includes('android') && !userAgent.includes('mobile'));
        
        // Check screen size as additional validation
        const hasSmallScreen = window.screen.width <= 768;
        
        return hasMobileKeyword && !isTablet && hasSmallScreen;
    }
    
    /**
     * Check if user is already on mobile subdomain
     */
    function isOnMobileDomain() {
        return window.location.pathname === '/mobile' ||
               window.location.pathname.startsWith('/mobile/');
    }
    
    /**
     * Check if user is on desktop domain
     */
    function isOnDesktopDomain() {
        return window.location.hostname.includes(DESKTOP_DOMAIN) ||
               window.location.hostname === 'localhost' ||
               window.location.hostname.includes('127.0.0.1');
    }

    function isLocalhost() {
        return window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1');
    }
    
    /**
     * Get mobile URL equivalent of current page
     */
    function getMobileUrl() {
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        
        // Map desktop pages to mobile equivalents
        const pageMap = {
            // legacy .html
            '/index.html': '/mobile/',
            '/about.html': '/mobile/about.html',
            '/services.html': '/mobile/services.html',
            '/contact-us.html': '/mobile/contact.html',
            '/blogs.html': '/mobile/blogs.html',
            '/brand-development.html': '/mobile/brand-development.html',
            '/digital-marketing-service.html': '/mobile/digital-marketing.html',
            '/fresh-website-development.html': '/mobile/website-development.html',
            '/strategy-consultation.html': '/mobile/strategy-consultation.html',
            '/thank-you.html': '/mobile/thank-you.html',
            // clean slugs
            '/': '/mobile/',
            '/about': '/mobile/about.html',
            '/services': '/mobile/services.html',
            '/contact': '/mobile/contact.html',
            '/blogs': '/mobile/blogs.html',
            '/brand-development': '/mobile/brand-development.html',
            '/digital-marketing': '/mobile/digital-marketing.html',
            '/website-development': '/mobile/website-development.html',
            '/strategy-consultation': '/mobile/strategy-consultation.html',
            '/thank-you': '/mobile/thank-you.html'
        };
        
        // Prefer directory path for homepage to avoid index.html edge cases
        const mobilePath = pageMap[currentPath] || '/mobile/';
        
        // For development/local testing
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
            return `${window.location.protocol}//${window.location.host}${mobilePath}${currentSearch}${currentHash}`;
        }
        
        // For production: serve mobile under main domain /mobile
        return `https://${DESKTOP_DOMAIN}${mobilePath}${currentSearch}${currentHash}`;
    }

    /**
     * Enable local dev fallback so clean slugs work without server rewrites
     */
    function enableLocalSlugFallback() {
        if (!isLocalhost()) return;

        const slugToHtml = {
            '/': '/index.html',
            '/about': '/about.html',
            '/services': '/services.html',
            '/contact': '/contact-us.html',
            '/blogs': '/blogs.html',
            '/brand-development': '/brand-development.html',
            '/digital-marketing': '/digital-marketing-service.html',
            '/website-development': '/fresh-website-development.html',
            '/strategy-consultation': '/strategy-consultation.html',
            '/thank-you': '/thank-you.html'
        };

        // Rewrite link clicks at runtime
        document.addEventListener('click', function(event) {
            const anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
            try {
                const url = new URL(href, window.location.origin);
                const mapped = slugToHtml[url.pathname];
                if (mapped) {
                    event.preventDefault();
                    window.location.href = `${mapped}${url.search}${url.hash}`;
                }
            } catch (_) {
                // ignore malformed hrefs
            }
        }, true);

        // Optional: adjust existing anchor hrefs so status bar shows correct target
        const anchors = document.querySelectorAll('a[href^="/"]');
        anchors.forEach(a => {
            try {
                const url = new URL(a.getAttribute('href'), window.location.origin);
                const mapped = slugToHtml[url.pathname];
                if (mapped) {
                    a.setAttribute('href', `${mapped}${url.search}${url.hash}`);
                }
            } catch (_) {}
        });
    }
    
    /**
     * Perform redirect with smooth transition
     */
    function redirectToMobile() {
        const mobileUrl = getMobileUrl();
        
        // Add loading indicator
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: rgba(112, 71, 235, 0.9); 
                color: white; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                z-index: 9999; 
                font-family: Arial, sans-serif;
                flex-direction: column;
            ">
                <div style="font-size: 1.5rem; margin-bottom: 20px;">Redirecting to Mobile Site...</div>
                <div style="
                    width: 50px; 
                    height: 50px; 
                    border: 4px solid rgba(255,255,255,0.3); 
                    border-top: 4px solid white; 
                    border-radius: 50%; 
                    animation: spin 1s linear infinite;
                "></div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Redirect after brief delay for smooth UX
        setTimeout(() => {
            window.location.href = mobileUrl;
        }, 500);
    }
    
    /**
     * Initialize mobile detection and redirect
     */
    function init() {
        // Don't run if already on mobile domain
        if (isOnMobileDomain()) {
            return;
        }
        
        // Only redirect mobile phones when on main domain
        if (isMobilePhone() && isOnDesktopDomain()) {
            // Check if user manually chose desktop version (via URL parameter)
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('desktop') === 'true') {
                // Store preference and don't redirect
                sessionStorage.setItem('forceDesktop', 'true');
                return;
            }
            
            // Check if user previously chose desktop version
            if (sessionStorage.getItem('forceDesktop') === 'true') {
                return;
            }
            
            // Perform redirect
            redirectToMobile();
        }

        // Ensure local slug navigation works without server rewrites
        enableLocalSlugFallback();
    }
    
    // Run detection when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run on window load as backup
    window.addEventListener('load', function() {
        // Only run if not already redirected
        if (!document.body.querySelector('[style*="position: fixed"]')) {
            init();
        }
    });
    
})();
