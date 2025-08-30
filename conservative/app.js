// Conservative Professional Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeResumeDownload();
    initializeContactForm();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active navigation based on scroll position
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

    // Add scroll effects to navigation bar
    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            nav.style.backgroundColor = '#ffffff';
            nav.style.backdropFilter = 'none';
        }
        updateActiveNavigation();
    }

    window.addEventListener('scroll', handleNavScroll);
    updateActiveNavigation();
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && navMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.skill-category, .highlight, .timeline-item, .project-card, .education-item, .cert-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progress = skillBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    skillBar.style.width = progress + '%';
                }, 300);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Resume download functionality
function initializeResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // You can link this to your actual resume file
            // For now, it will show an alert
            alert('Resume download feature - Link this to your actual resume PDF file');
            
            // Example implementation:
            // const link = document.createElement('a');
            // link.href = 'path/to/your/resume.pdf';
            // link.download = 'Shaun_Rufus_Kalurie_Resume.pdf';
            // link.click();
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Certification Modal Functions
function openCertModal(certId, title, subtitle) {
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('certModalTitle');
    const modalSubtitle = document.getElementById('certModalSubtitle');
    const modalImage = document.getElementById('certModalImage');
    
    // Set modal content
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    
    // Set image source based on certificate ID
    const imageMap = {
        'python-datascience': '../images/python for datascience,AI.png',
        'foundations-datascience': '../images/foundations of data sicence.png',
        'genai-llm': '../images/GenAI &LLM.png',
        'datascience-toolbox': '../images/datascience toolbox.png',
        'business-analyst': '../images/business analyst professional certificate.jpg',
        'ibm-python-project': '../images/IBM python project for datascience.png'
    };
    
    modalImage.src = imageMap[certId] || '';
    modalImage.alt = title;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target === modal) {
        closeCertModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertModal();
    }
});

// Utility functions
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

// Performance optimization
const debouncedScroll = debounce(function() {
    // Handle scroll events that don't need to fire constantly
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Console message for developers
console.log('🎯 Conservative Professional Portfolio loaded successfully!');
console.log('💼 Perfect for corporate recruiters and professional applications');
console.log('🔧 Built with clean, maintainable code');