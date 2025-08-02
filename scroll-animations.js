document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Adjust this value as needed
    });

    document.querySelectorAll('section, .hero-content, .hero-image, .experience-card, .skill-category, .certificate-card, .contact-info, .contact-form').forEach(element => {
        element.classList.add('hidden');
        observer.observe(element);
    });
});