// DOM Elements
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');
const sections = document.querySelectorAll('.section');
const nav = document.querySelector('nav');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.section, .member, .goal-card, .project-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease-out';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
// Trigger initial reveal
revealOnScroll();

// Add hover effects to team members
const teamMembers = document.querySelectorAll('.member');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'scale(1.05)';
        member.style.transition = 'transform 0.3s ease';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'scale(1)';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('#home');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add active state to navigation links
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing effect variables and function
let textToType = "Empowering Innovation Through Technology";
let charIndex = 0;
let isTyping = true;
let cursorVisible = true;

function typeWriter() {
    if (charIndex < textToType.length && isTyping) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Cursor blinking
setInterval(() => {
    cursorVisible = !cursorVisible;
    cursor.style.opacity = cursorVisible ? '1' : '0';
}, 500);

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Burger Menu Functionality
burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent body scroll when menu is open
    document.body.style.overflow = burgerMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Prevent clicks inside nav-links from closing the menu
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});
