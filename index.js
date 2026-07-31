document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById("formulario-contacto");
    const inputNombre = document.getElementById("nombre");
    const inputMensaje = document.getElementById("mensaje");
    const inputsTexto = [inputNombre];
    const inputCorreo = document.getElementById("correo");


    function capitalizarPalabras(texto) {
        return texto.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        })
    }

    function filtrarSoloLetras(texto) {
        return texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }


    inputsTexto.forEach(input => {
        // Bloqueamos y filtramos caracteres no permitidos mientras el usuario escribe:
        input.addEventListener("input", (suceso) => {
            const valorOriginal = suceso.target.value;
            const valorFiltrado = filtrarSoloLetras(valorOriginal);

            if (valorOriginal !== valorFiltrado){
            suceso.target.value = valorFiltrado;
            }
        });

        // Si sacamos el foco, que la primera letra aparezca en mayúscula:
        input.addEventListener("blur", (suceso) => {
            suceso.target.value = capitalizarPalabras(suceso.target.value.trim());
        });
    });

    //RESULTADOS AL ENVIAR:
    formulario.addEventListener("submit", (suceso) => {
        suceso.preventDefault();
        
        const nombreValido = inputNombre.value.trim();
        const mensajeValido = inputMensaje.value.trim();

        // Validamos que los campos de texto no estén vacíos o solo con espacios:
        if (nombreValido === '') {
            alert('Por favor, ingresa tu nombre.');
            inputNombre.focus();
            return;
        }

        const correoValido = inputCorreo.value.trim();
        if (correoValido === '') {
            alert("Por favor, ingresa tu correo electrónico.");
            inputCorreo.focus();
            return;
        }

        if (!esCorreoValido(correoValido)) {
            alert("Por favor, ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).");
            inputCorreo.focus();
            return;
        }

        // Que no sea posible aceptar menos de 10 caracteres:
        if (mensajeValido.length < 10) {
            alert('El mensaje es demasiado corto. Debe tener al menos 10 caracteres.');
            inputMensaje.focus();
            return;
        }

        // Si se cumplen todas las condiciones del formulario, se envía:
        alert('¡Mensaje enviado con éxito!');
        formulario.reset();
        
    });

    // Mostramos visualmente el input con error:
    function marcarCampoInvalido(input, mensaje) {
        input.style.borderColor = '#ef4444';
        input.focus();
    }

    // Mostramos el estilo original si el input es valido:
    function limpiarErrorCampo(input) {
        input.style.borderColor = '';
    }

    function esCorreoValido(correo) {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronCorreo.test(correo);
    }

});




