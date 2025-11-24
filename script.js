// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu after clicking
        navMenu.classList.remove('active');
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Portfolio filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Typing effect for home section
const typingText = document.querySelector('.typing-text');
const textArray = ['Full Stack Developer', 'Web Designer', 'UI/UX Enthusiast', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
setTimeout(typeEffect, 1000);

// Animate skill bars on scroll
let skillBarsAnimated = false;
const animateSkillBars = () => {
    if (skillBarsAnimated) return;
    
    const skillsSection = document.querySelector('.skills-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const sectionTop = skillsSection.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    
    if (scrollPosition > sectionTop + 100) {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+%)/)?.[1] || '0%';
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
        
        skillBarsAnimated = true;
        // Remove event listener after animation
        window.removeEventListener('scroll', animateSkillBars);
    }
};

window.addEventListener('scroll', animateSkillBars);

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll to top button (optional enhancement)
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'scroll-to-top';
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize scroll to top button
createScrollToTopBtn();

// Add fade-in animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Prevent home section from fading in since it's visible on load
document.querySelector('.home-section').style.opacity = '1';
document.querySelector('.home-section').style.transform = 'translateY(0)';

console.log('Portfolio website loaded successfully!');
