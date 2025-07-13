// Performance Check Script
window.addEventListener('load', function() {
    // Basic performance metrics
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    
    console.log('Page Load Time:', pageLoadTime + 'ms');
    console.log('DOM Ready Time:', domReadyTime + 'ms');
    
    // Check if the page is running smoothly
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    
    function checkFrame() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            if (fps < 30) {
                console.warn('Low FPS detected:', fps);
            }
        }
        
        requestAnimationFrame(checkFrame);
    }
    
    requestAnimationFrame(checkFrame);
}); 