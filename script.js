let slideIndex = 1; // Índice de la diapositiva actual
let autoSlideInterval; // Variable para almacenar el ID del intervalo de auto-slide

// --- Funcionalidad del Carrusel ---

// Función para mostrar las diapositivas
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");

    // Reinicia el índice si se va más allá de la última o primera diapositiva
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Oculta todas las diapositivas (moverlas fuera de la vista)
    for (i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
    }

    // Remueve la clase 'active' de todos los puntos
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Si hay puntos, activa el punto de la diapositiva actual
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active";
    }
}

// Función para avanzar o retroceder diapositivas
function plusSlides(n) {
    // Detiene el auto-slide al interactuar manualmente
    clearInterval(autoSlideInterval);
    showSlides(slideIndex += n);
    // Reinicia el auto-slide después de un breve retraso
    startAutoSlide();
}

// Función para ir a una diapositiva específica al hacer clic en un punto
function currentSlide(n) {
    // Detiene el auto-slide al interactuar manualmente
    clearInterval(autoSlideInterval);
    showSlides(slideIndex = n);
    // Reinicia el auto-slide después de un breve retraso
    startAutoSlide();
}

// Función para iniciar el movimiento automático del carrusel
function startAutoSlide() {
    // Limpia cualquier intervalo existente antes de iniciar uno nuevo
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        plusSlides(1); // Avanza una diapositiva
    }, 1000); // Cambia cada 1 segundo (1000 milisegundos)
}

// --- Funcionalidad del Menú de Navegación Responsive ---

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar carrusel
    showSlides(slideIndex);
    startAutoSlide();

    // Funcionalidad del menú de hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navMainWrapper = document.querySelector('.nav-main-wrapper'); // Contenedor del menú y botones

    if (menuToggle && navMainWrapper) {
        menuToggle.addEventListener('click', () => {
            navMainWrapper.classList.toggle('is-open'); // Clase para mostrar/ocultar
            menuToggle.classList.toggle('is-active'); // Clase para animar el icono
        });

        // Opcional: Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navMainWrapper.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInsideNav && navMainWrapper.classList.contains('is-open')) {
                navMainWrapper.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
            }
        });

        // Opcional: Cerrar el menú si se hace clic en un enlace de navegación
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMainWrapper.classList.contains('is-open')) {
                    navMainWrapper.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                }
            });
        });
    }
});
