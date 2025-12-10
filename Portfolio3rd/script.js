// Enhanced F1 Portfolio JavaScript

class F1Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupMetricsDashboard();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupPitStopNavigation();
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Simulate loading process
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.startAnimations();
            }, 500);
        }, 2000);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            // Header background effect
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Update active navigation
            this.updateActiveNavigation();
            
            // Animate elements on scroll
            this.animateOnScroll();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const pitIndicators = document.querySelectorAll('.pit-indicator');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Update pit indicators
        pitIndicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (indicator.getAttribute('data-section') === currentSection) {
                indicator.classList.add('active');
            }
        });
    }

    setupAnimations() {
        // Initialize typing animation
        this.setupTypingAnimation();
        
        // Initialize progress bars
        this.setupProgressBars();
    }

    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;
        
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(typingElement);
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.tech-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = level + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    setupMetricsDashboard() {
        const controlBtns = document.querySelectorAll('.control-btn');
        const metricCards = document.querySelectorAll('.metric-card');
        
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const metric = btn.getAttribute('data-metric');
                
                // Update active button
                controlBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show/hide metric cards
                metricCards.forEach(card => {
                    if (card.getAttribute('data-metric') === metric || metric === 'all') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset labels
            const labels = contactForm.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.left = '1rem';
                label.style.fontSize = '1rem';
                label.style.background = 'transparent';
                label.style.color = '#ccc';
            });
        });
        
        // Add floating label functionality
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            input.addEventListener('focus', () => {
                label.style.top = '-0.5rem';
                label.style.left = '0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.background = 'var(--f1-dark)';
                label.style.color = 'var(--f1-red)';
                label.style.padding = '0 0.5rem';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.top = '1rem';
                    label.style.left = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.background = 'transparent';
                    label.style.color = '#ccc';
                    label.style.padding = '0';
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    setupPitStopNavigation() {
        const pitIndicators = document.querySelectorAll('.pit-indicator');
        
        pitIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const section = indicator.getAttribute('data-section');
                const targetElement = document.getElementById(section);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    animateOnScroll() {
        const animatedElements = document.querySelectorAll('.about-card, .metric-card');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    startAnimations() {
        // Start any initial animations after loading
        const animatedElements = document.querySelectorAll('.about-card, .metric-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        this.animateOnScroll();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--f1-red)' : '#ff4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new F1Portfolio();
});

// Add CSS for notifications
const notificationStyles = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
    }, 1500);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Navigation active state
const navLinks = document.querySelectorAll('.nav-link');
const pitIndicators = document.querySelectorAll('.pit-indicator');

function setActiveLink() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            pitIndicators.forEach(indicator => {
                indicator.classList.remove('active');
                if (indicator.getAttribute('data-section') === sectionId) {
                    indicator.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Smooth scrolling for navigation links
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

// Tech progress bars animation
function animateTechBars() {
    const techProgressBars = document.querySelectorAll('.tech-progress');
    techProgressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'about') {
                animateTechBars();
            }
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    // Add mobile menu styles
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--f1-dark)';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    } else {
        navLinks.style.display = 'none';
    }
});

// Pit stop navigation click handlers
pitIndicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
