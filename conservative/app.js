// Simple Conservative Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializeMobileNavigation();
});

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile navigation toggle
function initializeMobileNavigation() {
    // Add mobile-friendly navigation if needed
    const nav = document.querySelector('.navigation');
    if (nav) {
        nav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                // Close mobile menu if it exists
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
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

// Simple console message
console.log('🎯 Conservative Portfolio loaded successfully!');
console.log('💼 Simple, professional design for corporate applications');