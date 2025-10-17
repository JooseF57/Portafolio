/* ================================================================
   PORTAFOLIO PROFESIONAL - JAVASCRIPT
   Autor: Tu Nombre
   Fecha: 2025
   ================================================================ */

'use strict';

// ================================================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initParticles();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    initSkillBars();
    initNavigation();
    initRippleEffect();
    initProjectLinks();
    initTags();
    
    console.log('%c🚀 Portfolio cargado exitosamente!', 'color: #00f5ff; font-size: 20px; font-weight: bold;');
    console.log('%c💜 Desarrollado con pasión', 'color: #ff00ff; font-size: 14px;');
});


// ================================================================
// CURSOR PERSONALIZADO
// ================================================================
function initCursor() {
    const cursor = document.getElementById('cursor');
    
    if (!cursor) return;
    
    // Ocultar cursor en dispositivos táctiles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        return;
    }
    
    // Seguir el movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Expandir cursor al hacer hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .tag');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
}


// ================================================================
// PARTÍCULAS DE FONDO ANIMADAS
// ================================================================
function initParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    
    if (!bgAnimation) return;
    
    const particleCount = 50;
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        bgAnimation.appendChild(particle);
    }
    
    // Agregar animación flotante dinámica
    createFloatAnimation();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Propiedades aleatorias
    const size = Math.random() * 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Color aleatorio (cyan o magenta)
    particle.style.background = Math.random() > 0.5 
        ? 'rgba(0, 245, 255, 0.3)' 
        : 'rgba(255, 0, 255, 0.3)';
    
    // Animación con duración y delay aleatorios
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    particle.style.animationDelay = delay + 's';
    
    return particle;
}

function createFloatAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translate(0, 0); 
            }
            25% { 
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
            }
            50% { 
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
            }
            75% { 
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
            }
        }
    `;
    document.head.appendChild(style);
}


// ================================================================
// SMOOTH SCROLL ENTRE SECCIONES
// ================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil si está abierto
                const navLinks = document.getElementById('navLinks');
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}


// ================================================================
// ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
// ================================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
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
    
    // Observar elementos para animarlos al entrar en viewport
    const animatedElements = document.querySelectorAll('.project-card, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}


// ================================================================
// EFECTO PARALLAX EN HERO
// ================================================================
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = Math.max(0, 1 - scrolled / 700);
    }
}


// ================================================================
// ANIMACIÓN DE BARRAS DE HABILIDADES
// ================================================================
function initSkillBars() {
    // Animar barras al hacer hover en la categoría
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', () => {
            animateSkillBars(category);
        });
        
        category.addEventListener('mouseleave', () => {
            resetSkillBars(category);
        });
    });
    
    // Animar contadores de porcentaje al entrar en viewport
    initSkillCounters();
}

function animateSkillBars(category) {
    const progressBars = category.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const progress = bar.style.getPropertyValue('--progress');
        if (progress) {
            bar.style.width = progress;
        }
    });
}

function resetSkillBars(category) {
    const progressBars = category.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        bar.style.width = '0';
    });
}

function initSkillCounters() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentages = entry.target.querySelectorAll('.skill-name span:last-child');
                percentages.forEach(span => {
                    const target = parseInt(span.textContent);
                    if (!isNaN(target)) {
                        span.textContent = '0%';
                        setTimeout(() => animateCounter(span, target), 200);
                    }
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-category').forEach(cat => {
        skillObserver.observe(cat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1000; // 1 segundo
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, stepTime);
}


// ================================================================
// NAVEGACIÓN - GLASSMORPHISM Y MENÚ MÓVIL
// ================================================================
function initNavigation() {
    // Efecto glassmorphism al hacer scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const nav = document.querySelector('nav');
        
        if (!nav) return;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(17, 17, 17, 0.9)';
            nav.style.backdropFilter = 'blur(30px)';
        } else {
            nav.style.background = 'rgba(17, 17, 17, 0.7)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Cerrar menú móvil al hacer scroll
    window.addEventListener('scroll', () => {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
}

// Función global para toggle del menú móvil (llamada desde HTML)
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Hacer la función accesible globalmente
window.toggleMenu = toggleMenu;


// ================================================================
// EFECTO RIPPLE EN BOTONES
// ================================================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevenir múltiples ripples
            const existingRipple = this.querySelector('.ripple-effect');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            createRipple(e, this);
        });
    });
}

function createRipple(event, button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}


// ================================================================
// ANIMACIONES EN ENLACES DE PROYECTOS
// ================================================================
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-secondary)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--accent)';
        });
    });
}


// ================================================================
// ANIMACIÓN DE TAGS DE TECNOLOGÍAS
// ================================================================
function initTags() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.background = 'rgba(0, 245, 255, 0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(0, 245, 255, 0.1)';
        });
    });
}


// ================================================================
// LAZY LOADING PARA IMÁGENES (OPCIONAL)
// ================================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


// ================================================================
// PREVENIR SCROLL HORIZONTAL
// ================================================================
document.body.style.overflowX = 'hidden';


// ================================================================
// PERFORMANCE - RESPETAR PREFERENCIAS DE MOVIMIENTO
// ================================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}


// ================================================================
// UTILIDADES ADICIONALES
// ================================================================

// Detectar si el usuario está en la parte superior de la página
function isAtTop() {
    return window.pageYOffset === 0;
}

// Detectar si el usuario llegó al final de la página
function isAtBottom() {
    return (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
}

// Throttle function para optimizar eventos de scroll
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

// Debounce function para optimizar eventos de resize
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


// ================================================================
// CONSOLE LOG FINAL
// ================================================================
console.log('%c📧 Contacto: tu@email.com', 'color: #b4b4b4; font-size: 12px;');
console.log('%c⚡ Performance optimizado', 'color: #43e97b; font-size: 12px;');