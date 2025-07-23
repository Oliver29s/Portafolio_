// Este script manejará el envío del formulario de contacto.

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