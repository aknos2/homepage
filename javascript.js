document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
      const projectCards = document.querySelectorAll('.project-cards');
      
      // Options for the observer
      const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.5 // Trigger when 50% of the element is visible
      };
      
      // Create an observer instance
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // If the card is intersecting (visible)
          if (entry.isIntersecting) {
            // Add a class that will trigger the animations
            entry.target.classList.add('animate-card');
          } else {
            // Remove the class when no longer visible
            entry.target.classList.remove('animate-card');
          }
        });
      }, observerOptions);
      
      // Start observing each project card
      projectCards.forEach(card => {
        observer.observe(card);
      });
    }
    
    const robot = document.querySelector('.walking-robot');
    
    if (!robot) return;
    
    const appearAt = 0.1; // Robot appears when scrolled 10% down the page
    const disappearAt = 0.35; // Robot disappears when scrolled 35% down the page
    
    function updateRobotVisibility() {
        // Calculate how far through the page we've scrolled (0 to 1)
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.scrollY / documentHeight;
        
        // Determine if robot should be visible
        if (scrollProgress >= appearAt && scrollProgress <= disappearAt) {
            // Show robot
            robot.style.transform = 'translateX(-100px)';
            robot.style.opacity = '1';
            
            // Optional: Add a small bouncing effect
            // const bounceAmount = Math.sin(Date.now() / 200) * 5;
            // robot.style.marginBottom = `${bounceAmount}px`;
        } else {
            // Hide robot
            robot.style.transform = 'translateX(150px)';
            robot.style.opacity = '0';
        }
    }
    
    // Initial state - hidden
    robot.style.transform = 'translateX(150px)';
    robot.style.opacity = '0';
    robot.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    
    // Add scroll event listener
    window.addEventListener('scroll', updateRobotVisibility);
    
    // Run once to set initial state
    updateRobotVisibility();
  });

