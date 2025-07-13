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
  initWeb3Forms(); // Add Web3Forms handling
  
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

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
  
  // Initialize all revamped section functionality
  initImpactSection();
  initSuccessStoriesSection();
  initInsightsSection();
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
    typewriterElements.forEach(element => {
      // Make sure the element is visible
      element.style.visibility = 'visible';
      
      // Animation is now controlled by CSS
      // Add a class after animation to ensure the cursor stays
      setTimeout(() => {
        element.classList.add('typewriter-completed');
      }, 3700); // Slightly longer than the animation duration to ensure it completes
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
    '1StopFirm-Logo.png',
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
  // Simple navigation handling without forced refreshes
  // Let the browser handle navigation naturally
  console.log('Navigation initialized - using browser default navigation');
}

// Handle back/forward navigation without forced refresh
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // Page was restored from back/forward cache
    // Just reinitialize animations instead of reloading
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
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

/*--------------------------------------------------------------
# Revamped Sections JavaScript - Modern Interactions
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Impact Section Functionality
--------------------------------------------------------------*/

function initImpactSection() {
  // Animated counters
  const counters = document.querySelectorAll('.metric-counter');
  const progressBars = document.querySelectorAll('.progress-fill');
  
  // Create Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  // Create Intersection Observer for progress bars
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBar(entry.target);
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  // Observe counters
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // Observe progress bars
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

function animateCounter(counter) {
  const targetValue = counter.getAttribute('data-target');
  const isDecimal = counter.getAttribute('data-decimal') === 'true';
  const target = parseFloat(targetValue);
  const duration = 2000; // 2 seconds
  const steps = 60; // 60 steps for smooth animation
  const increment = target / steps;
  const stepDuration = duration / steps;
  
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Handle different number formats
    if (isDecimal) {
      counter.textContent = current.toFixed(1);
    } else if (target >= 100) {
      counter.textContent = Math.floor(current);
    } else {
      counter.textContent = Math.floor(current);
    }
  }, stepDuration);
}

function animateProgressBar(bar) {
  const progress = bar.getAttribute('data-progress');
  
  setTimeout(() => {
    bar.style.width = progress + '%';
  }, 300);
}

/*--------------------------------------------------------------
# Success Stories Section Functionality
--------------------------------------------------------------*/

function initSuccessStoriesSection() {
  const storyTabs = document.querySelectorAll('.story-tab');
  const stories = document.querySelectorAll('.success-story');
  
  storyTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetStory = this.getAttribute('data-story');
      
      // Remove active class from all tabs and stories
      storyTabs.forEach(t => t.classList.remove('active'));
      stories.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show target story
      const targetStoryElement = document.querySelector(`[data-story="${targetStory}"].success-story`);
      if (targetStoryElement) {
        targetStoryElement.classList.add('active');
        
        // Animate metric circles
        const metricCircles = targetStoryElement.querySelectorAll('.metric-circle');
        setTimeout(() => {
          metricCircles.forEach(circle => {
            const percentage = circle.getAttribute('data-percentage');
            if (percentage) {
              animateMetricCircle(circle, percentage);
            }
          });
        }, 300);
      }
    });
  });
  
  // Initialize first story
  const firstStory = document.querySelector('.success-story.active');
  if (firstStory) {
    const metricCircles = firstStory.querySelectorAll('.metric-circle');
    setTimeout(() => {
      metricCircles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        if (percentage) {
          animateMetricCircle(circle, percentage);
        }
      });
    }, 1000);
  }
}

function animateMetricCircle(circle, percentage) {
  const targetPercentage = Math.min(percentage, 100); // Cap at 100%
  const degrees = (targetPercentage / 100) * 360;
  
  // Create conic gradient animation
  let currentDegrees = 0;
  const duration = 1500; // 1.5 seconds
  const steps = 60;
  const increment = degrees / steps;
  const stepDuration = duration / steps;
  
  const timer = setInterval(() => {
    currentDegrees += increment;
    
    if (currentDegrees >= degrees) {
      currentDegrees = degrees;
      clearInterval(timer);
    }
    
    circle.style.background = `conic-gradient(from 0deg, #7047eb ${currentDegrees}deg, #e9ecef ${currentDegrees}deg)`;
  }, stepDuration);
}

// Case study modal functionality (placeholder)
function openCaseStudy(storyType) {
  // This would open a modal or navigate to a detailed case study page
  console.log(`Opening case study for: ${storyType}`);
  // Implementation would depend on your modal/routing system
}

/*--------------------------------------------------------------
# Insights Section Functionality
--------------------------------------------------------------*/

function initInsightsSection() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const insightCards = document.querySelectorAll('.insight-card');
  
  // Filter functionality
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Filter cards
      filterInsightCards(category, insightCards);
    });
  });
  
  // Like button functionality
  const likeBtns = document.querySelectorAll('.engagement-btn.like');
  likeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const count = this.querySelector('span');
      const currentCount = parseInt(count.textContent);
      
      if (icon.classList.contains('far')) {
        // Like
        icon.classList.remove('far');
        icon.classList.add('fas');
        count.textContent = currentCount + 1;
        this.style.color = '#ff3366';
      } else {
        // Unlike
        icon.classList.remove('fas');
        icon.classList.add('far');
        count.textContent = currentCount - 1;
        this.style.color = '#999';
      }
    });
  });
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email) {
        // Simulate newsletter signup
        showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
        this.reset();
      }
    });
  }
}

function filterInsightCards(category, cards) {
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp 0.6s ease-out';
    } else {
      card.style.display = 'none';
    }
  });
}

/*--------------------------------------------------------------
# Utility Functions
--------------------------------------------------------------*/

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Add close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    removeNotification(notification);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

/*--------------------------------------------------------------
# Enhanced Animations and Effects
--------------------------------------------------------------*/

// Parallax effect for floating elements
function initParallaxEffects() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Initialize parallax effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initParallaxEffects();
});

// Smooth scroll enhancement for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('a[href^="#"]');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

/*--------------------------------------------------------------
# Performance Optimizations
--------------------------------------------------------------*/

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Initialize Web3Forms handling for all forms
 * Provides smooth form submission with loading states
 */
function initWeb3Forms() {
  // Find all forms that use Web3Forms
  const forms = document.querySelectorAll('form[action*="web3forms.com"]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      // Just show loading state, let Web3Forms handle the actual submission
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Add loading class for additional styling
        submitBtn.classList.add('loading');
        form.classList.add('submitting');
      }
    });
  });
  
  // Handle form validation feedback
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error') && this.value.trim() !== '') {
          this.classList.remove('error');
        }
      });
    });
  });
  
  // Add CSS for form states if not already present
  if (!document.querySelector('#web3forms-styles')) {
    const style = document.createElement('style');
    style.id = 'web3forms-styles';
    style.textContent = `
      /* Web3Forms Loading States */
      form.submitting {
        opacity: 0.8;
        pointer-events: none;
      }
      
      button.loading {
        position: relative;
        background: #ccc !important;
        cursor: not-allowed !important;
      }
      
      .form-error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
      }
      
      .spinner {
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Success state for thank you page */
      .form-success-message {
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);
  }
}

// Optimized scroll handling
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

/*--------------------------------------------------------------
# Accessibility Enhancements
--------------------------------------------------------------*/

// Add keyboard navigation for tabs
document.addEventListener('DOMContentLoaded', function() {
  const allTabs = document.querySelectorAll('.story-tab, .filter-tab');
  
  allTabs.forEach(tab => {
    // Make tabs focusable
    tab.setAttribute('tabindex', '0');
    
    // Add keyboard event listeners
    tab.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

// Add ARIA labels for better accessibility
document.addEventListener('DOMContentLoaded', function() {
  const metricCards = document.querySelectorAll('.impact-metric-card');
  metricCards.forEach(card => {
    const label = card.querySelector('.metric-label');
    if (label) {
      card.setAttribute('aria-label', `Metric: ${label.textContent}`);
    }
  });
  
  const insightCards = document.querySelectorAll('.insight-card');
  insightCards.forEach(card => {
    const title = card.querySelector('.card-title');
    if (title) {
      card.setAttribute('aria-label', `Article: ${title.textContent}`);
    }
  });
});

/*--------------------------------------------------------------
# Error Handling and Fallbacks
--------------------------------------------------------------*/

// Fallback for browsers that don't support Intersection Observer
if (!window.IntersectionObserver) {
  document.addEventListener('DOMContentLoaded', function() {
    // Trigger animations immediately for older browsers
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach(counter => {
      setTimeout(() => animateCounter(counter), 1000);
    });
    
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
      setTimeout(() => animateProgressBar(bar), 1500);
    });
  });
}

// Console message for development
console.log('🚀 1StopFirm - Revamped UI/UX sections loaded successfully!');
console.log('✨ Features: Animated counters, Interactive stories, Smart filtering, Enhanced accessibility'); 