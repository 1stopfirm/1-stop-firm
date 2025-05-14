// Fade-in on scroll
const fadeEls = document.querySelectorAll('.service-card, .value-item, .testimonial-card');
const fadeInOnScroll = () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', () => {
  fadeEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s, transform 0.7s';
  });
  fadeInOnScroll();
});

// Simple testimonial carousel (auto-rotate)
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;
function showTestimonial(idx) {
  testimonials.forEach((el, i) => {
    el.style.display = i === idx ? 'block' : 'none';
  });
}
if (testimonials.length > 1) {
  showTestimonial(0);
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 4000);
} 