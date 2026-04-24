// ============================================
// FILTROS DEL PORTAFOLIO
// ============================================
const filtros = document.querySelectorAll('.filtro-btn');
const productos = document.querySelectorAll('.producto-card');

filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        // Actualizar botón activo
        filtros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtrar productos
        const filtro = btn.getAttribute('data-filter');

        productos.forEach(producto => {
            const categorias = producto.getAttribute('data-category');

            if (filtro === 'todos') {
                producto.classList.remove('hidden');
            } else if (categorias && categorias.includes(filtro)) {
                producto.classList.remove('hidden');
            } else {
                producto.classList.add('hidden');
            }
        });
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// MENÚ HAMBURGUESA
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// ANIMACIÓN DE ENTRADA EN SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a tarjetas
document.querySelectorAll(
    '.estandar-card, .servicio-card, .producto-card, .diferenciador-card, .testimonio-card'
).forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// BOTÓN VOLVER ARRIBA
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// VALIDACIÓN BÁSICA DEL FORMULARIO
// ============================================
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const whatsapp = form.querySelector('input[type="tel"]');

        let valido = true;

        [nombre, email, whatsapp].forEach(campo => {
            if (campo && !campo.value.trim()) {
                campo.style.borderColor = '#EF4444';
                valido = false;
            } else if (campo) {
                campo.style.borderColor = '#10B981';
            }
        });

        if (valido) {
            const btn = form.querySelector('.form-submit');
            btn.textContent = '✅ ¡Cotización enviada!';
            btn.style.backgroundColor = '#10B981';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Solicitar cotización gratuita';
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        }
    });
}