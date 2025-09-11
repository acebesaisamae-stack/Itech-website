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

// Burger Menu Functionality (robust / defensive)
if (burgerMenu && navLinks) {
    const toggleMenu = () => {
        const open = burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active', open);
        document.body.classList.toggle('menu-open', open);
        // set aria for accessibility
        burgerMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a navigation link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside (anywhere on document)
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            burgerMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            burgerMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Prevent clicks inside the nav links area from bubbling to document
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

burger.addEventListener('click', () => {
    burger.classList.toggle('active');   // animate burger into X
    navLinks.classList.toggle('active'); // show/hide nav links
    document.body.classList.toggle('menu-open'); // prevent background scroll
});

// Optional: close menu when a nav link is clicked (mobile only)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

burger.addEventListener('click', () => {
    burger.classList.toggle('active');   // burger ⇄ X
    navLinks.classList.toggle('active'); // show/hide menu
    document.body.classList.toggle('menu-open'); // lock scroll
});
