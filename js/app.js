/* Tailwind self-hosted via css/tailwind.css — no CDN config needed */

animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// GSAP Animations
const initAnimations = () => {
    // Hero animations
    gsap.to("#hero-greeting", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.to("#hero-name", { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
    gsap.to("#hero-title", { opacity: 1, y: 0, duration: 0.8, delay: 0.6 });
    gsap.to("#hero-desc", { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
    gsap.to("#hero-cta", { opacity: 1, y: 0, duration: 0.8, delay: 1 });
    gsap.to("#hero-image", { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: "power2.out" });

    // Scroll animations
    gsap.utils.toArray('.reveal-text').forEach((text, i) => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.1
        });
    });

    // Skill bars animation
    gsap.utils.toArray('.skill-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
            },
            width: width,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.2
        });
    });
};

// Initialize everything
window.addEventListener('load', () => {
    initThreeJS();
    initAnimations();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
