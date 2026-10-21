document.addEventListener('DOMContentLoaded', () => {
    const inputPassGenerada = document.getElementById('pass-generada');
    const btnCopiar = document.getElementById('btn-copiar');
    const rangoLongitud = document.getElementById('longitud');
    const valorLongitud = document.getElementById('valor-longitud');
    const checkMayus = document.getElementById('incluir-mayus');
    const checkNums = document.getElementById('incluir-nums');
    const checkSimbolos = document.getElementById('incluir-simbolos');
    const btnGenerar = document.getElementById('btn-generar');
    const inputNombreCuenta = document.getElementById('nombre-cuenta');
    const btnGuardar = document.getElementById('btn-guardar');
    const listaBoveda = document.getElementById('lista-boveda');


    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';


    // ACTUALIZAR EL VALOR NUMÉRICO DE LA LONGITUD EN VIVO:
    rangoLongitud.addEventListener('input', () => {
        valorLongitud.textContent = rangoLongitud.value;
    });


    // FUNCIÓN PRINCIPAL DE GENERACIÓN DE CONTRASEÑA SEGURAS:
    function generarContrasena() {
        let caracteresPermitidos = letrasMinusculas;

        if (checkMayus.checked) caracteresPermitidos += letrasMayusculas;
        if (checkNums.checked) caracteresPermitidos += numeros;
        if (checkSimbolos.checked) caracteresPermitidos += simbolos;

        const longitud = parseInt(rangoLongitud.value);
        let password = '';

        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
            password += caracteresPermitidos[indiceAleatorio];
        }

        inputPassGenerada.value = password;
    }

    // GENERAR UNA CONTRASEÑA AL CARGAR LA PÁGINA:
    generarContrasena();

    // EVENTO BOTÓN "GENERAR NUEVA CONTRASEÑA:"
    btnGenerar.addEventListener('click', generarContrasena); 


    // COPIAR CONTRASEÑA PRINCIPAL AL PORTAPAPELES:
    btnCopiar.addEventListener('click', () => {
        if (!inputPassGenerada.value) return;

        navigator.clipboard.writeText(inputPassGenerada.value);
        const textoOriginal = btnCopiar.textContent;
        btnCopiar.textContent = '¡Copiado!';

        setTimeout(() => {
            btnCopiar.textContent = textoOriginal;
        }, 2000);
    });






    // GESTIÓN DE LA BÓVEDA LOCAL:

});