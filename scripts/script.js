// ========== VALIDACIONES DEL FORMULARIO ==========

// Obtener el formulario
const formSubmit = document.getElementById('formSubmit');

// Función para recortar espacios en blanco
function trimField(field) {
    if (field.type === 'text' || field.type === 'email' || field.type === 'number') {
        field.value = field.value.trim();
    } else if (field.tagName === 'TEXTAREA') {
        field.value = field.value.trim();
    }
}

// Función para validar que un campo no esté vacío
function isNotEmpty(value) {
    return value.trim().length > 0;
}

// Función para validar email básico
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar que solo sean números
function isValidNumber(number) {
    return /^\d+$/.test(number.trim());
}

// Función para validar teléfono (solo dígitos, entre 7 y 15 caracteres)
function isValidPhone(phone) {
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(phone.trim());
}

// Event listener en el submit del formulario
formSubmit.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores de los inputs
    const nameInput = document.querySelector('input[name="name"]');
    const phoneInput = document.querySelector('input[name="telefono"]');
    const emailInput = document.querySelector('input[type="email"]');
    const requestInput = document.querySelector('textarea[name="solicitud"]');

    // Recortar espacios
    trimField(nameInput);
    trimField(phoneInput);
    trimField(emailInput);
    trimField(requestInput);

    // Validar nombre
    if (!isNotEmpty(nameInput.value)) {
        alert('⚠️ Por favor, ingresa tu nombre');
        nameInput.focus();
        return;
    }

    if (nameInput.value.length < 3) {
        alert('⚠️ El nombre debe tener al menos 3 caracteres');
        nameInput.focus();
        return;
    }

    // Validar teléfono
    if (!isNotEmpty(phoneInput.value)) {
        alert('⚠️ Por favor, ingresa tu teléfono');
        phoneInput.focus();
        return;
    }

    if (!isValidPhone(phoneInput.value)) {
        alert('⚠️ El teléfono debe contener solo números (entre 7 y 15 dígitos)');
        phoneInput.focus();
        return;
    }

    // Validar email
    if (!isNotEmpty(emailInput.value)) {
        alert('⚠️ Por favor, ingresa tu correo');
        emailInput.focus();
        return;
    }

    if (!isValidEmail(emailInput.value)) {
        alert('⚠️ Por favor, ingresa un correo válido (ej: usuario@ejemplo.com)');
        emailInput.focus();
        return;
    }

    // Validar solicitud
    if (!isNotEmpty(requestInput.value)) {
        alert('⚠️ Por favor, describe cómo podemos ayudarte');
        requestInput.focus();
        return;
    }

    if (requestInput.value.length < 10) {
        alert('⚠️ La descripción debe tener al menos 10 caracteres');
        requestInput.focus();
        return;
    }

    // Si todas las validaciones pasan, mostrar modal de confirmación
    showConfirmationModal(nameInput.value, phoneInput.value, emailInput.value, requestInput.value);
});

// ========== MODAL DE CONFIRMACIÓN ==========

// Función para mostrar el modal de confirmación con los datos
function showConfirmationModal(name, phone, email, request) {
    // Crear el fondo oscuro (backdrop)
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // Crear el contenedor del modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(180deg, rgba(21,27,45,0.98), #151b2d);
        border: 1px solid rgba(108,99,255,0.15);
        border-radius: 16px;
        padding: 32px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        animation: slideUp 0.3s ease-out;
    `;

    // Añadir animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Título del modal
    const title = document.createElement('h2');
    title.textContent = '✅ Resumen de tu Solicitud';
    title.style.cssText = `
        color: #ffa101;
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-align: center;
        font-family: "Bruno Ace SC", sans-serif;
    `;

    // Contenedor de datos
    const dataContainer = document.createElement('div');
    dataContainer.style.cssText = `
        background: rgba(11, 15, 25, 0.8);
        border-radius: 10px;
        padding: 16px;
        margin-bottom: 20px;
        border-left: 4px solid #6C63FF;
    `;

    // Crear cada línea de dato
    const createDataRow = (label, value) => {
        const row = document.createElement('div');
        row.style.cssText = `
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        `;
        
        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        labelEl.style.cssText = `
            color: #6C63FF;
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        `;
        
        const valueEl = document.createElement('span');
        valueEl.textContent = value;
        valueEl.style.cssText = `
            color: #ccc;
            font-size: 1rem;
            word-break: break-word;
        `;
        
        row.appendChild(labelEl);
        row.appendChild(valueEl);
        return row;
    };

    // Agregar datos al contenedor
    dataContainer.appendChild(createDataRow('👤 Nombre', name));
    dataContainer.appendChild(createDataRow('📱 Teléfono', phone));
    dataContainer.appendChild(createDataRow('📧 Email', email));
    dataContainer.appendChild(createDataRow('📝 Solicitud', request));

    // Contenedor de botones
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 12px;
        justify-content: center;
    `;

    // Botón Cancelar
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.style.cssText = `
        background: #2a365c;
        color: #fff;
        border: 1px solid #6C63FF;
        padding: 10px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
    `;
    
    cancelBtn.onmouseover = () => cancelBtn.style.background = '#1f2849';
    cancelBtn.onmouseout = () => cancelBtn.style.background = '#2a365c';
    
    cancelBtn.addEventListener('click', () => {
        backdrop.remove();
    });

    // Botón Enviar
    const sendBtn = document.createElement('button');
    sendBtn.textContent = '✓ Enviar Formulario';
    sendBtn.style.cssText = `
        background: linear-gradient(135deg, #ffa101, #ff8a00);
        color: #111;
        border: none;
        padding: 10px 24px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
    `;
    
    sendBtn.onmouseover = () => sendBtn.style.transform = 'scale(1.05)';
    sendBtn.onmouseout = () => sendBtn.style.transform = 'scale(1)';
    
    sendBtn.addEventListener('click', () => {
        // Aquí es donde irían las acciones finales (enviar a servidor, etc.)
        alert('✅ ¡Formulario enviado correctamente!\n\nNos pondremos en contacto pronto.');
        formSubmit.reset();
        backdrop.remove();
    });

    // Agregar botones al contenedor
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(sendBtn);

    // Agregar todo al modal
    modal.appendChild(title);
    modal.appendChild(dataContainer);
    modal.appendChild(buttonContainer);

    // Agregar modal al backdrop
    backdrop.appendChild(modal);

    // Agregar backdrop al documento
    document.body.appendChild(backdrop);

    // Cerrar modal al hacer clic fuera de él
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    });
}

