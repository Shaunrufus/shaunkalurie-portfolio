// Interactive Portfolio JavaScript - Creative/Tech Features

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initTerminalAnimation();
    initContactForm();
    initParticleBackground();
});

// Navigation functionality with active states
function initNavigation() {
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavigation() {
        let current = 'home';
        const scrollY = window.pageYOffset;
        const offset = 100;

        if (scrollY < 50) {
            current = 'home';
        } else {
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - offset;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(15px)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.1)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.boxShadow = 'none';
        }
        updateActiveNavigation();
    }

    window.addEventListener('scroll', handleNavScroll);
    updateActiveNavigation();
}

// Enhanced mobile menu with animations
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add body scroll lock when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && navMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling with enhanced easing
function initSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                // Smooth scroll with custom easing
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Add a subtle glow effect to the target section
                targetElement.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.2)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 1000);
            }
        });
    });
}

// Advanced scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.skill-item, .achievement-card, .project-card, .cert-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Add elements to observe
    const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .achievement-card, .degree-card, .about-intro');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Animated skill bars with enhanced effects
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                    skillBar.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
                }, 300);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Animated counter for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        // Add a glow effect when animation completes
                        counter.style.textShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
                        setTimeout(() => {
                            counter.style.textShadow = '';
                        }, 500);
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Enhanced terminal animation
function initTerminalAnimation() {
    const terminal = document.querySelector('.terminal');
    
    if (terminal) {
        const terminalObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start terminal typing animation
                    const codeLines = terminal.querySelectorAll('.code-line');
                    
                    codeLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.style.opacity = '1';
                            // Add typing sound effect (you can add audio if desired)
                            line.style.borderRight = '2px solid #00ff88';
                            setTimeout(() => {
                                line.style.borderRight = 'none';
                            }, 100);
                        }, index * 500);
                    });
                    
                    terminalObserver.unobserve(terminal);
                }
            });
        }, { threshold: 0.5 });

        terminalObserver.observe(terminal);
    }
}

// Enhanced contact form with validation and animations
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form field animations
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            input.addEventListener('focus', function() {
                group.style.transform = 'scale(1.02)';
                group.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                group.style.transform = 'scale(1)';
                group.style.boxShadow = '';
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Enhanced validation
            if (!validateForm(name, email, subject, message)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function validateForm(name, email, subject, message) {
    const errors = [];
    
    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!subject || subject.length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    if (!message || message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(text, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.innerHTML = text;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px;
        background: ${type === 'success' ? 'var(--gradient-primary)' : 'linear-gradient(135deg, #ff0088, #ff4444)'};
        color: ${type === 'success' ? 'var(--bg-primary)' : 'white'};
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 5000);
}

// Enhanced particle background system
function initParticleBackground() {
    const particles = document.querySelectorAll('.particle');
    
    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add random movement
    particles.forEach(particle => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            particle.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000);
    });
}

// Keyboard shortcuts for power users
document.addEventListener('keydown', function(e) {
    // Press 'h' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.altKey) {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'p' to go to projects
    if (e.key === 'p' && !e.ctrlKey && !e.altKey) {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'c' to go to contact
    if (e.key === 'c' && !e.ctrlKey && !e.altKey) {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Performance optimization
let ticking = false;

function optimizedScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Handle scroll events here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', optimizedScrollHandler);

// Preload animations
function preloadAnimations() {
    // Preload any heavy animations or images
    const animationElements = document.querySelectorAll('[class*="animate"]');
    animationElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
}

// Initialize preloading
window.addEventListener('load', preloadAnimations);

// Easter egg - Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konami)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add rainbow effect to the entire page
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add CSS for rainbow effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show easter egg message
    showMessage('🎉 Konami Code activated! You found the easter egg! 🎉', 'success');
    
    // Remove effect after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        document.head.removeChild(style);
    }, 5000);
}

// Console messages for developers
console.log('%c🚀 Interactive Portfolio Loaded! ', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%c🎨 Built with love for creative tech roles', 'color: #0088ff; font-size: 14px;');
console.log('%c⌨️  Try keyboard shortcuts: h (home), p (projects), c (contact)', 'color: #ff0088; font-size: 12px;');
console.log('%c🎮 Easter egg: Try the Konami code!', 'color: #00ff88; font-size: 12px;');

// Export functions for potential external use
window.InteractivePortfolio = {
    initNavigation,
    initSkillBars,
    initCounterAnimation,
    showMessage
};