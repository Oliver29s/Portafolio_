// Este script manejará el envío del formulario de contacto.

// Scripts movidos desde index.html

// Menú hamburguesa para móviles
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon'); // Nuevo icono de cerrar
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger'); // Seleccionar el contenedor de la hamburguesa

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('menu-open'); // Alternar la clase en el contenedor
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('menu-open'); // Asegurarse de quitar la clase al cerrar
    });
});

// Animación suave al desplazarse
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
        });
    });
});

// Efecto de aparición al desplazar
const observerOptions = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, observerOptions);

document
    .querySelectorAll(
        "section, .experience-card, .skill-category, .certificate-card"
    )
    .forEach((element) => {
        observer.observe(element);
    });

// Header que cambia al hacer scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Botón para volver arriba
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const messageText = document.getElementById('message-text');

const showMessage = (message, type) => {
    messageText.textContent = message;
    formMessage.className = 'form-message show ' + type; // Añadir tipo para estilos

    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 2000);
    }
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Reemplaza 'TU_URL_FORMSPREE' con la URL real de tu formulario de Formspree
    const formspreeUrl = 'https://formspree.io/f/mvgqkdpb'; 

    try {
        const response = await fetch(formspreeUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
            form.reset();
        } else {
            const data = await response.json();
            if (Object.hasOwnProperty.call(data, 'errors')) {
                showMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
            } else {
                showMessage('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
            }
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showMessage('Hubo un problema de conexión al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
    }
}); 