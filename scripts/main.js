/**
 * Main JavaScript file for 1 Stop Firm website
 * Contains navigation, scroll animations, and interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initScrollAnimation();
  initBackToTop();
  initTypewriterEffect();
  initCounters();
  initProgressBars();
  initParallaxEffect();
  initCaseStudyTabs();
  initTestimonialSlider();
  initMobileMenu();
  initSmoothScroll();
  initAccessibility();
  
  // Mobile tap-to-flip for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      if (window.innerWidth <= 767) {
        card.classList.toggle('tapped');
      }
    });
  });

  // Add cache busting for resources
  addCacheBusting();

  // Preload critical assets
  preloadCriticalAssets();

  // Handle navigation events
  handleNavigation();
  
  // Optimize image loading
  optimizeImages();
});

/**
 * Navigation functionality
 * - Toggle mobile menu
 * - Change header on scroll
 * - Active link highlighting
 */
function initNavigation() {
  const header = document.getElementById('header');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  // Add transparency class to header initially
  header.classList.add('transparent');
  
  // Toggle mobile menu
  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Change header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  });
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for internal links
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Close mobile menu if open
          if (navbarToggle.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
          
          // Smooth scroll to target section
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, null, targetId);
        }
      }
    });
  });
  
  // Highlight active navigation link based on scroll position
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  // Get current scroll position
  const scrollPosition = window.scrollY + 150;
  
  // Find the current active section
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to corresponding link
      const activeLink = document.querySelector(`.navbar-menu a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

/**
 * Scroll animations using Intersection Observer
 * Add animation classes when elements come into viewport
 */
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Back to Top button functionality
 */
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Typewriter effect for hero headline
 */
function initTypewriterEffect() {
  const typewriterElements = document.querySelectorAll('.typewriter');
  
  if (typewriterElements.length > 0) {
    // Add animation classes to enable the effect
    typewriterElements.forEach(element => {
      element.style.visibility = 'visible';
    });
  }
}

/**
 * Counter animation for statistics
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (counter) => {
    // Get the target number from the data attribute
    const target = parseInt(counter.getAttribute('data-count'), 10);
    
    // Get format options
    const formatString = counter.getAttribute('data-format');
    let format = {};
    
    if (formatString) {
      try {
        format = JSON.parse(formatString);
      } catch (e) {
        console.error('Invalid format string:', formatString);
      }
    }
    
    // Check if it's already animated
    if (counter.classList.contains('counted')) {
      counter.classList.remove('counted');
      counter.textContent = '0';
    }
    
    // Set starting point
    let currentValue = 0;
    
    // Calculate step based on target value
    const step = Math.max(1, Math.floor(target / 20));
    
    // Start the animation
    function updateCounter(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }
      
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      currentValue = Math.min(Math.floor(progress * target), target);
      
      // Format the number
      let formattedValue = currentValue.toString();
      
      if (format.comma) {
        formattedValue = currentValue.toLocaleString();
      }
      
      if (format.prefix) {
        formattedValue = format.prefix + formattedValue;
      }
      
      if (format.suffix) {
        formattedValue = formattedValue + format.suffix;
      }
      
      counter.textContent = formattedValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.classList.add('counted');
      }
    }
    
    let startTime = null;
    const duration = 2000; // ms
    
    requestAnimationFrame(updateCounter);
  };

  // Use Intersection Observer to trigger counter when visible
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '0px'
  });

  // Observe all counters
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/**
 * Animate progress bars when they come into view
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.result-progress');
  
  if (progressBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the target width from the style attribute
          const targetWidth = entry.target.style.width;
          
          // First reset to 0
          entry.target.style.width = '0';
          
          // Then animate to target width after a small delay
          setTimeout(() => {
            entry.target.style.width = targetWidth;
          }, 300);
          
          // Stop observing after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    // Observe all progress bars
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}

/**
 * Parallax effect for background elements
 */
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach(element => {
        const strength = 20; // Adjust this value to control the effect intensity
        const moveX = (mouseX - 0.5) * strength;
        const moveY = (mouseY - 0.5) * strength;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }
}

/**
 * Detect accessibility preferences and adjust animations
 */
function checkReducedMotionPreference() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.classList.add('reduced-motion');
  }
}

// Check for reduced motion preference
checkReducedMotionPreference();

/**
 * Case Study tab functionality
 */
function initCaseStudyTabs() {
  const caseTabs = document.querySelectorAll('.case-tab');
  const caseItems = document.querySelectorAll('.case-study-item');
  
  if (caseTabs.length > 0) {
    caseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        caseTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get target case study
        const targetId = tab.getAttribute('data-target');
        
        // Hide all case studies
        caseItems.forEach(item => {
          item.classList.remove('active');
          // Reset animation classes for content
          const content = item.querySelector('.case-study-content');
          const image = item.querySelector('.case-study-image');
          if (content) {
            content.classList.remove('active');
            content.classList.add('reveal-right');
          }
          if (image) {
            image.classList.remove('active');
            image.classList.add('reveal-left');
          }
        });
        
        // Show target case study
        const targetCase = document.getElementById(targetId);
        if (targetCase) {
          setTimeout(() => {
            targetCase.classList.add('active');
            
            // Trigger animations
            const content = targetCase.querySelector('.case-study-content');
            const image = targetCase.querySelector('.case-study-image');
            if (content) {
              setTimeout(() => {
                content.classList.add('active');
              }, 100);
            }
            if (image) {
              setTimeout(() => {
                image.classList.add('active');
              }, 100);
            }
          }, 300); // Small delay to allow fade out animation
        }
      });
    });
  }
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevButton = document.querySelector('.testimonial-arrow.prev');
  const nextButton = document.querySelector('.testimonial-arrow.next');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Function to update slide display
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.setAttribute('aria-selected', 'false');
    });
    
    // Show the current slide
    slides[index].classList.add('active');
    slides[index].setAttribute('aria-hidden', 'false');
    
    // Update the active dot
    dots[index].classList.add('active');
    dots[index].setAttribute('aria-selected', 'true');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Previous slide handler
  function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = totalSlides - 1;
    }
    showSlide(newIndex);
  }
  
  // Next slide handler
  function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= totalSlides) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }
  
  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Set up click events for prev/next buttons
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  
  // Auto-advance slides every 5 seconds
  const slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-advance on hover
  const sliderContainer = document.querySelector('.testimonial-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
    });
  }
  
  // Initialize the first slide
  showSlide(0);
}

/**
 * Mobile Menu Toggle
 * Handles the mobile menu toggle functionality
 */
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!mobileMenuToggle || !mainNav) return;
  
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Toggle ARIA attributes for accessibility
    const expanded = mainNav.classList.contains('active');
    this.setAttribute('aria-expanded', expanded);
    
    // Toggle body scroll
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mainNav.classList.contains('active') && 
      !mainNav.contains(event.target) && 
      !mobileMenuToggle.contains(event.target)) {
      mobileMenuToggle.click();
    }
  });
  
  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mainNav.classList.contains('active')) {
      mobileMenuToggle.click();
    }
  });
}

/**
 * Smooth Scroll
 * Adds smooth scrolling behavior to anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mainNav && mainNav.classList.contains('active') && mobileMenuToggle) {
          mobileMenuToggle.click();
        }
        
        // Calculate header height for offset
        const header = document.querySelector('.main-header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Scroll to target with offset
        const yOffset = -headerHeight - 20; // Extra 20px padding
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Accessibility Improvements
 * Adds various accessibility enhancements
 */
function initAccessibility() {
  // Add focus styles
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-user');
    }
  });
  
  // Remove focus styles when using mouse
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-user');
  });
  
  // Add missing ARIA labels to interactive elements
  document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(button => {
    if (!button.textContent.trim()) {
      console.warn('Button without label or text content found:', button);
    }
  });
  
  // Ensure proper contrast for placeholders
  document.querySelectorAll('input, textarea').forEach(field => {
    if (field.hasAttribute('placeholder')) {
      field.style.setProperty('--placeholder-opacity', '0.7');
    }
  });
}

// Add timestamp parameter to all resource URLs to prevent caching
function addCacheBusting() {
  const timestamp = new Date().getTime();
  
  // Add version to CSS files
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (!link.href.includes('?v=')) {
      link.href = link.href.split('?')[0] + '?v=' + timestamp;
    }
  });
  
  // Add version to images
  document.querySelectorAll('img').forEach(img => {
    if (img.src && !img.src.includes('http') && !img.src.includes('?v=')) {
      img.src = img.src.split('?')[0] + '?v=' + timestamp;
    }
  });
  
  // Add version to scripts
  document.querySelectorAll('script').forEach(script => {
    if (script.src && !script.src.includes('http') && !script.src.includes('?v=')) {
      script.src = script.src.split('?')[0] + '?v=' + timestamp;
    }
  });
}

// Preload critical assets to improve initial load time
function preloadCriticalAssets() {
  const assetsToPreload = [
    'styles/layout.css',
    'styles/components.css',
    'styles/animations.css',
    'Bold Purple _1SF_ Icon.png',
    'mcdonalds.png',
    'huawei.png',
    'firefox.png',
    'oracle.png'
  ];
  
  assetsToPreload.forEach(asset => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = asset + '?v=' + new Date().getTime();
    
    if (asset.endsWith('.css')) {
      preloadLink.as = 'style';
    } else if (asset.endsWith('.png') || asset.endsWith('.jpg') || asset.endsWith('.jpeg')) {
      preloadLink.as = 'image';
    }
    
    document.head.appendChild(preloadLink);
  });
}

// Handle page navigation with proper state management
function handleNavigation() {
  document.querySelectorAll('a').forEach(link => {
    // Only handle internal links that aren't anchors
    if (link.href.includes(window.location.origin) && !link.href.includes('#')) {
      link.addEventListener('click', function(e) {
        // Don't handle anchor links here
        if (this.getAttribute('href').startsWith('#')) return;
        
        e.preventDefault();
        const destination = this.href;
        
        // Show loading state
        document.body.classList.add('page-transitioning');
        
        // Fetch the new page
        fetch(destination + '?v=' + new Date().getTime(), {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        .then(response => response.text())
        .then(html => {
          // Update browser history
          window.history.pushState({}, '', destination);
          
          // Small delay to ensure smooth transition
          setTimeout(() => {
            window.location.href = destination;
          }, 200);
        })
        .catch(err => {
          console.error('Navigation error:', err);
          window.location.href = destination; // Fallback to regular navigation
        });
      });
    }
  });
}

// Force refresh on back/forward navigation
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // Page was restored from back/forward cache
    window.location.reload();
  }
});

// Add header styles on scroll
window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Optimize image loading
function optimizeImages() {
    // Set up lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src + '?v=' + new Date().getTime();
                        img.classList.add('loading');
                        img.onload = () => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        };
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Convert regular images to lazy-loaded images
        document.querySelectorAll('img:not(.no-lazy)').forEach(img => {
            if (!img.classList.contains('loaded') && !img.hasAttribute('data-src')) {
                const src = img.src;
                img.setAttribute('data-src', src);
                img.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width%3D"' + (img.width || 300) + '" height%3D"' + (img.height || 200) + '" %2F%3E';
                img.classList.add('img-placeholder');
                imageObserver.observe(img);
            }
        });
    }
    
    // Force images to load immediately if they're in viewport
    document.querySelectorAll('img.force-load').forEach(img => {
        if (img.hasAttribute('data-src')) {
            img.src = img.getAttribute('data-src') + '?v=' + new Date().getTime();
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    });
} 