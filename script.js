// ====================================
// DOCUMENT READY
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initAnimations();
    initCounters();
    initProjectFilters();
    initSkillBars();
    initScrollToTop();
});

// ====================================
// NAVBAR FUNCTIONALITY
// ====================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ====================================
// SCROLL ANIMATIONS
// ====================================
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ====================================
// COUNTER ANIMATION
// ====================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ====================================
// PROJECT FILTERS
// ====================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length === 0 || projectItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                // Hide all items first
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                // Show items that match the filter
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    }
                }, 300);
            });
        });
    });
}

// ====================================
// SKILL BARS ANIMATION
// ====================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBar = (bar) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-progress');
                if (skillBar) {
                    animateSkillBar(skillBar);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// ====================================
// SCROLL TO TOP BUTTON
// ====================================
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary);
                color: var(--white);
                border: none;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 5px 20px rgba(79, 133, 53, 0.4);
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 30px rgba(79, 133, 53, 0.6);
            }
            
            @media (max-width: 767px) {
                .scroll-to-top {
                    width: 45px;
                    height: 45px;
                    bottom: 20px;
                    right: 20px;
                    font-size: 18px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ====================================
// FORM VALIDATION & SUBMISSION
// ====================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Basic validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Remove previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (name && name.value.trim() === '') {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (email && email.value.trim() === '') {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject && subject.value === '') {
            showError(subject, 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        if (message && message.value.trim() === '') {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '13px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    input.style.borderColor = '#dc3545';
    
    // Remove error on input
    input.addEventListener('input', function() {
        errorDiv.remove();
        input.style.borderColor = '#ddd';
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ====================================
// HERO PARALLAX EFFECT
// ====================================
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const heroBg = heroSection.querySelector('.hero-bg');
        const heroContent = heroSection.querySelector('.hero-content');
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ====================================
// TYPING EFFECT FOR HERO SUBTITLE
// ====================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ====================================
// INTERACTIVE CARDS TILT EFFECT
// ====================================
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card, .cert-card, .subject-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize card tilt on desktop only
if (window.innerWidth > 768) {
    initCardTilt();
}

// ====================================
// LAZY LOADING IMAGES
// ====================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ====================================
// PRELOADER
// ====================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

// ====================================
// CURSOR TRAIL EFFECT (Optional - Desktop Only)
// ====================================
if (window.innerWidth > 1024) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);
    
    // Add styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-dot, .cursor-outline {
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            border-radius: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 9999;
        }
        
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--primary);
        }
        
        .cursor-outline {
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary);
        }
        
        body:hover .cursor-dot,
        body:hover .cursor-outline {
            opacity: 1;
        }
        
        a:hover ~ .cursor-dot,
        button:hover ~ .cursor-dot {
            transform: translate(-50%, -50%) scale(2);
        }
        
        a:hover ~ .cursor-outline,
        button:hover ~ .cursor-outline {
            transform: translate(-50%, -50%) scale(1.5);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursorOutline() {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursorOutline);
    }
    
    animateCursorOutline();
}

// ====================================
// TESTIMONIAL SLIDER (If needed)
// ====================================
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 3 && window.innerWidth < 768) {
        // Add touch swipe functionality for mobile
        let startX = 0;
        let currentIndex = 0;
        
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        document.querySelector('.testimonials-section').addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        document.querySelector('.testimonials-section').addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < testimonialCards.length - 1) {
                    // Swipe left
                    testimonialCards[currentIndex].style.display = 'none';
                    currentIndex++;
                    testimonialCards[currentIndex].style.display = 'block';
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right
                    testimonialCards[currentIndex].style.display = 'none';
                    currentIndex--;
                    testimonialCards[currentIndex].style.display = 'block';
                }
            }
        });
    }
}

initTestimonialSlider();

// ====================================
// CV DOWNLOAD TRACKING (Optional)
// ====================================
const cvDownloadBtn = document.querySelector('.btn-download');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('CV downloaded');
        
        // Optional: Show a thank you message
        setTimeout(() => {
            alert('Thank you for downloading my CV!');
        }, 100);
    });
}

// ====================================
// UTILITY FUNCTIONS
// ====================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
const handleScroll = throttle(function() {
    // Any scroll handlers here
}, 100);

window.addEventListener('scroll', handleScroll);

// Console message for developers
console.log('%c👨‍💻 Built with passion by Md. Faheemul Haque Fahim', 'color: #4F8535; font-size: 16px; font-weight: bold;');
console.log('%c🏗️ Civil Engineering Student | 🎓 University of Asia Pacific', 'color: #A8C4DE; font-size: 14px;');