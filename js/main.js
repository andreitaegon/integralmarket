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
    const barajadas = [...todasLasTarjetas].sort(() => Math.random() - 0.5);
    barajadas.slice(0, MAX_TODOS).forEach(card => card.classList.remove('hidden'));
}

function mostrarFiltro(filtro) {
    ocultarTodas();
    const coinciden = todasLasTarjetas.filter(card =>
        card.getAttribute('data-category') === filtro
    );
    coinciden.forEach(card => card.classList.remove('hidden'));
}

mostrarTodos();

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
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// VALIDACIÓN Y ENVÍO CON EMAILJS
// ============================================

// ============================================
// VALIDACIÓN Y ENVÍO CON EMAILJS
// ============================================

emailjs.init('2qyPinaI397HkjdlA');

const form = document.getElementById('cotizacion-form');
const btnSubmit = document.getElementById('btn-submit');
const formMensaje = document.getElementById('form-mensaje');

function mostrarMensajeError(camposFaltantes) {
    formMensaje.className = 'form-mensaje';
    formMensaje.innerHTML = `
        <strong>⚠️ Por favor completa los siguientes campos:</strong>
        <ul>
            ${camposFaltantes.map(campo => `<li>${campo}</li>`).join('')}
        </ul>
    `;
    formMensaje.style.display = 'block';
    
    // Hacer scroll al mensaje
    formMensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function mostrarMensajeExito() {
    formMensaje.className = 'form-mensaje success';
    formMensaje.innerHTML = `
        <strong>✅ ¡Cotización enviada con éxito!</strong>
        Te responderemos lo más pronto posible.
    `;
    formMensaje.style.display = 'block';
    formMensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function ocultarMensaje() {
    formMensaje.style.display = 'none';
    formMensaje.innerHTML = '';
}

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        ocultarMensaje();

        const nombre   = document.getElementById('nombre');
        const empresa  = document.getElementById('empresa');
        const ciudad   = document.getElementById('ciudad');
        const whatsapp = document.getElementById('whatsapp');
        const correo   = document.getElementById('correo');
        const cantidad = document.getElementById('cantidad');
        const checkboxGroup = document.querySelector('.checkbox-group');

        let valido = true;
        let camposFaltantes = [];

        // Resetear estilos
        [nombre, empresa, ciudad, whatsapp, correo, cantidad].forEach(campo => {
            campo.style.borderColor = '#E5E7EB';
        });
        checkboxGroup.classList.remove('error');

        // Validar campos requeridos
        const camposObligatorios = [
            { campo: nombre,   nombre: 'Nombre completo' },
            { campo: empresa,  nombre: 'Empresa' },
            { campo: ciudad,   nombre: 'Ciudad' },
            { campo: whatsapp, nombre: 'WhatsApp' },
            { campo: correo,   nombre: 'Correo electrónico' },
            { campo: cantidad, nombre: 'Cantidad aproximada' }
        ];

        camposObligatorios.forEach(({ campo, nombre }) => {
            if (!campo.value.trim()) {
                campo.style.borderColor = '#EF4444';
                camposFaltantes.push(nombre);
                valido = false;
            } else {
                campo.style.borderColor = '#10B981';
            }
        });

        // Validar al menos un servicio
        const serviciosSeleccionados = Array.from(
            document.querySelectorAll('input[name="servicio"]:checked')
        ).map(cb => cb.value).join(', ');

        if (!serviciosSeleccionados) {
            checkboxGroup.classList.add('error');
            camposFaltantes.push('¿Qué necesitas? (selecciona al menos una opción)');
            valido = false;
        }

        // Validar formato email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo.value && !emailRegex.test(correo.value)) {
            correo.style.borderColor = '#EF4444';
            // Solo agregar si no estaba ya en la lista
            if (!camposFaltantes.includes('Correo electrónico')) {
                camposFaltantes.push('Correo electrónico (formato inválido)');
            }
            valido = false;
        }

        if (!valido) {
            mostrarMensajeError(camposFaltantes);
            btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Solicitar cotización gratuita';
            btnSubmit.style.backgroundColor = '';
            return;
        }

        // ── Recopilar valores opcionales ──
        const logoSeleccionado = document.querySelector('input[name="logo"]:checked');
        const logoValor  = logoSeleccionado ? logoSeleccionado.value : 'No especificado';
        const urgencia   = document.getElementById('urgencia').value || 'No especificado';
        const mensaje    = document.getElementById('mensaje').value || 'Sin mensaje adicional';

        const templateParams = {
            nombre:   nombre.value.trim(),
            empresa:  empresa.value.trim(),
            cargo:    document.getElementById('cargo').value.trim() || 'No indicado',
            ciudad:   ciudad.value.trim(),
            whatsapp: whatsapp.value.trim(),
            correo:   correo.value.trim(),
            servicio: serviciosSeleccionados,
            cantidad: cantidad.value,
            urgencia: urgencia,
            logo:     logoValor,
            mensaje:  mensaje
        };

        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btnSubmit.disabled = true;
        btnSubmit.style.backgroundColor = '#6B7280';

        emailjs.send('service_ftrsy1f', 'template_16kzi5h', templateParams)
            .then(function() {
                mostrarMensajeExito();
                btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Solicitar cotización gratuita';
                btnSubmit.style.backgroundColor = '';
                btnSubmit.disabled = false;
                form.reset();

                // Limpiar bordes de validación
                [nombre, empresa, ciudad, whatsapp, correo, cantidad].forEach(campo => {
                    campo.style.borderColor = '#E5E7EB';
                });
                checkboxGroup.classList.remove('error');

                // Ocultar mensaje de éxito después de 8 segundos
                setTimeout(() => {
                    ocultarMensaje();
                }, 8000);
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                formMensaje.className = 'form-mensaje';
                formMensaje.innerHTML = `
                    <strong>❌ Hubo un error al enviar</strong>
                    Por favor escríbenos directamente por WhatsApp: <a href="https://wa.me/573105583187">+57 310 558 3187</a>
                `;
                formMensaje.style.display = 'block';
                btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Solicitar cotización gratuita';
                btnSubmit.style.backgroundColor = '';
                btnSubmit.disabled = false;
            });
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
// ============================================
// AÑO DINÁMICO EN FOOTER
// ============================================
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}