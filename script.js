document.addEventListener('DOMContentLoaded', () => {
    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        // Simple check: if href matches the end of the current path
        if (currentPath.includes(link.getAttribute('href')) || (currentPath.endsWith('/') && link.getAttribute('href').includes('index.html'))) {
            link.classList.add('active');
        }
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
                reveal.classList.add('reveal'); // Ensure class is added if not present
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});
