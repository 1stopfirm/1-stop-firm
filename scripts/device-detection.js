// Device Detection Script
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent.toLowerCase());
const isDesktop = !isMobile && !isTablet;

// Add device-specific classes to body
document.body.classList.add(isMobile ? 'is-mobile' : isTablet ? 'is-tablet' : 'is-desktop');

// Export for other scripts
window.deviceInfo = {
    isMobile,
    isTablet,
    isDesktop
}; 