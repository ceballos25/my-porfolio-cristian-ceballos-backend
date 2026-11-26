/* Tailwind self-hosted via css/tailwind.css — no CDN config needed */

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Three.js Background Animation
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles with brighter colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
        posArray[i + 2] = (Math.random() - 0.5) * 50;

        // Cyan and purple colors
        if (Math.random() > 0.5) {
            colorsArray[i] = 0.13;
            colorsArray[i + 1] = 0.83;
            colorsArray[i + 2] = 0.93;
        } else {
            colorsArray[i] = 0.66;
            colorsArray[i + 1] = 0.33;
            colorsArray[i + 2] = 0.97;
        }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.x += mouseY * 0.0003;
        particlesMesh.rotation.y += mouseX * 0.0003;
        renderer.render(scene, camera);
    };

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
