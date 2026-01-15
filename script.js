/**
 * REYHAN SINGH - Main Website Script
 * Focused on smooth interactions and aesthetic reveals.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBILE NAVIGATION LOGIC ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        const toggleMenu = (state) => {
            const isOpen = state !== undefined ? state : !navMenu.classList.contains('active');

            menuToggle.classList.toggle('active', isOpen);
            navMenu.classList.toggle('active', isOpen);

            // Prevent scrolling background when menu is open
            body.style.overflow = isOpen ? 'hidden' : 'initial';
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // --- 2. ACTIVE LINK HIGHLIGHTING ---
    // Handle paths more robustly for different folder structures
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if path ends with href or contains it (handles ../ folders)
        if (currentPath.includes(href.replace('../', '')) && href !== '../index.html') {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && href.includes('index.html')) {
            link.classList.add('active');
        }
    });

    // --- 3. SCROLL REVEAL & HEADER AESTHETICS ---
    const reveals = document.querySelectorAll('.reveal');
    const header = document.querySelector('header');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        // Reveal Elements Animation
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });

        // Dynamic Header Styling (Add shadow/blur when scrolling down)
        if (header) {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                header.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            } else {
                header.style.boxShadow = 'none';
                header.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
        }
    };

    // --- 4. SMOOTH SCROLLING ---
    // Makes internal anchor links scroll smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize on Scroll & Load
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
});