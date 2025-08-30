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
