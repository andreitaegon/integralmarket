// ============================================
// FILTROS DEL PORTAFOLIO CON ALEATORIO
// ============================================
const filtros = document.querySelectorAll('.filtro-btn');
const todasLasTarjetas = Array.from(document.querySelectorAll('.producto-card'));
const MAX_TODOS = 8;

function ocultarTodas() {
    todasLasTarjetas.forEach(card => card.classList.add('hidden'));
}

function mostrarTodos() {
    ocultarTodas();

    // Toma TODAS las tarjetas, las baraja y muestra 8
    const barajadas = [...todasLasTarjetas]
        .sort(() => Math.random() - 0.5);

    barajadas.slice(0, MAX_TODOS)
        .forEach(card => card.classList.remove('hidden'));
}

function mostrarFiltro(filtro) {
    ocultarTodas();

    // Busca coincidencia exacta con la categoría
    const coinciden = todasLasTarjetas.filter(card =>
        card.getAttribute('data-category') === filtro
    );

    coinciden.forEach(card => card.classList.remove('hidden'));
}

// Inicializar con aleatorio al cargar
mostrarTodos();

// Eventos de los botones
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filtro = btn.getAttribute('data-filter');

        if (filtro === 'todos') {
            mostrarTodos();
        } else {
            mostrarFiltro(filtro);
        }
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
        const href = this.getAttribute('href');
		 // Si el href es solo "#" va al inicio
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        // Para el resto de enlaces busca el elemento
        const target = document.querySelector(href);
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

// ============================================
// CARRUSEL DE TESTIMONIOS
// ============================================
const wrapper = document.querySelector('.carrusel-slides-wrapper');
const slides = document.querySelectorAll('.carrusel-slide');
const dots = document.querySelectorAll('.carrusel-dot');
const btnPrev = document.querySelector('.carrusel-prev');
const btnNext = document.querySelector('.carrusel-next');

if (wrapper && slides.length > 0) {

    let slideActual = 0;
    const totalSlides = slides.length;

    function getSlidesVisibles() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function getTotalPasos() {
        return Math.ceil(totalSlides / getSlidesVisibles());
    }

    function irASlide(index) {
        const visibles = getSlidesVisibles();
        const totalPasos = getTotalPasos();

        if (index < 0) index = totalPasos - 1;
        if (index >= totalPasos) index = 0;

        slideActual = index;

        const anchoPorSlide = 100 / visibles;
        wrapper.style.transform =
            `translateX(-${slideActual * anchoPorSlide * visibles}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[slideActual]) {
            dots[slideActual].classList.add('active');
        }
    }

    btnPrev.addEventListener('click', () => {
        irASlide(slideActual - 1);
        resetAutoplay();
    });

    btnNext.addEventListener('click', () => {
        irASlide(slideActual + 1);
        resetAutoplay();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            irASlide(parseInt(dot.getAttribute('data-slide')));
            resetAutoplay();
        });
    });

    let autoPlay = setInterval(() => irASlide(slideActual + 1), 6000);

    function resetAutoplay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => irASlide(slideActual + 1), 6000);
    }

    let touchStartX = 0;

    wrapper.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    wrapper.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            irASlide(diff > 0 ? slideActual + 1 : slideActual - 1);
            resetAutoplay();
        }
    });

    window.addEventListener('resize', () => {
        irASlide(0);
    });

    irASlide(0);
}