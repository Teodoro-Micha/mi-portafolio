document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-contacto');
    const inputsTexto = formulario.querySelectorAll('input[type="text"]');

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
        let hayErrores = false;

        // Validamos que los campos de texto no estén vacíos o solo con espacios:
        inputsTexto.forEach(input => {
            const valorLimpio = input.value.trim();

            if (valorLimpio === '') {
                hayErrores = true;
                marcarCampoInvalido(input, 'Este campo no puede estar vacío.');
            } else {
                limpiarErrorCampo(input);
                input.value = capitalizarPalabras(valorLimpio);
            }
        });

        // Si hay errores de validación,  evitamos el envío:
        if (hayErrores) {
            suceso.preventDefault();
        }
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

});



// Buscamos el formulario en el HTML usando su ID:
const formulario = document.getElementById("formulario-contacto");

// Creamos el "escuchador"; le decimos al programa que esté atento al evento '"submit":

formulario.addEventListener("submit", function(Evento) {

    // Para evitar que el navegador limpie el formulario antes de que el pueda leerlo:
    Evento.preventDefault();

    // Recogemos los datos que el usuario ha escrito:
    const Datos = new FormData(formulario);

    const Nombre = Datos.get("nombre");
    const Email = Datos.get("correo");
    const Mensaje = Datos.get("mensaje");

    console.log("Formulario rellenado con éxito");
    console.log("Nombre introducido:", Nombre)
    console.log("Correo introducido:", Email);
    console.log("Mensaje introducido:", Mensaje);

    alert("Gracias, he recibido tu mensaje");

});

