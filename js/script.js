// Initialize AOS animation library
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Sticky navbar
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Skills animation
const progressBars = document.querySelectorAll('.progress');
const animateProgress = () => {
    progressBars.forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
};

// Trigger skills animation when section is in view
const skillsSection = document.querySelector('.skills');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(skillsSection);

// Projects tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Simple validation
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    }
    
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        contactForm.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('small');
    error.style.color = '#ff4444';
    error.textContent = message;
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('small');
    if (existingError) {
        formGroup.removeChild(existingError);
    }
    
    formGroup.appendChild(error);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        if (formGroup.contains(error)) {
            formGroup.removeChild(error);
        }
    }, 3000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Certifications carousel scroll
const certCarousel = document.querySelector('.cert-carousel');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

if (certCarousel && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
        certCarousel.scrollBy({ left: -340, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
        certCarousel.scrollBy({ left: 340, behavior: 'smooth' });
    });
    // Keyboard accessibility
    certCarousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') certCarousel.scrollBy({ left: -340, behavior: 'smooth' });
        if (e.key === 'ArrowRight') certCarousel.scrollBy({ left: 340, behavior: 'smooth' });
    });
}

// Flip card effect for certifications
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
    card.addEventListener('click', function (e) {
        // Prevent flipping if clicking a link
        if (e.target.closest('a')) return;
        card.classList.toggle('flipped');
    });
    card.addEventListener('keypress', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
            card.classList.toggle('flipped');
        }
    });
    card.setAttribute('tabindex', '0');
});

// Smooth section reveal on scroll
function revealSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    const trigger = window.innerHeight * 0.88;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < trigger) {
            section.classList.add('section-visible');
        } else {
            section.classList.remove('section-visible');
        }
    });
}
window.addEventListener('scroll', revealSectionsOnScroll);
window.addEventListener('DOMContentLoaded', revealSectionsOnScroll);
