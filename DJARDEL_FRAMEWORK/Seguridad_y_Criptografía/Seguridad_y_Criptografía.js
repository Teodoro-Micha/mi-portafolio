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
    const pizarraOverlay = document.getElementById('pizarra-overlay');
    const btnCerrarPizarra = document.getElementById('btn-cerrar-pizarra');
    const btnEntender = document.getElementById('btn-entender');
    const btnAbrirPizarra = document.getElementById('btn-abrir-pizarra'); 

    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';


    // CONTROL DE LA PIZARRA EXPLICATIVA:
    function cerrarPizarra() {
        if (pizarraOverlay) {
            pizarraOverlay.classList.add('oculto');
        }
    }

    // Reabrir la pizarra explicativa:
    function abrirPizarra() {
        if (pizarraOverlay) {
            pizarraOverlay.classList.remove('oculto'); 
        }
    }

    if (btnCerrarPizarra) {
        btnCerrarPizarra.addEventListener('click', cerrarPizarra);
    }

    if (btnEntender) {
        btnEntender.addEventListener('click', cerrarPizarra);
    }

    // Evento para reabrir:
    if (btnAbrirPizarra) {
        btnAbrirPizarra.addEventListener('click', abrirPizarra);
    }
    
    // Cerrar la pizarra si el usuario hace clic fuera de la misma:
    if (pizarraOverlay) {
        pizarraOverlay.addEventListener('click', (e) => {
            if (e.target === pizarraOverlay) {
                cerrarPizarra();
            }
        });
    }
    


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
    function obtenerBoveda() {
        const bovedaGuardada = localStorage.getItem('djardel_boveda');
        return bovedaGuardada ? JSON.parse(bovedaGuardada) : [];
    }

    function guardarBoveda(boveda) {
        localStorage.setItem('djardel_boveda', JSON.stringify(boveda));
    }

    function renderizarBoveda() {
        const boveda = obtenerBoveda();
        listaBoveda.innerHTML = '';

        if (boveda.length === 0) {
            listaBoveda.innerHTML = '<p class="mensaje-vacio">No hay contraseñas guardadas todavía.</p>';
            return;
        }


        boveda.forEach((item, index) => {
            // Creación de elementos con las clases que diseñadas en el CSS:
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-credencial';

            tarjeta.innerHTML = `
                <div class="info-credencial">
                    <span class="nombre-cuenta">${item.nombre}</span>
                    <span class="pass-oculta">${item.password}</span>
                </div>
                <div class="acciones-credencial">
                    <button class="btn-copiar-item" data-pass="${item.password}">Copiar</button>
                    <button class="btn-eliminar-item" data-index="${index}">Eliminar</button>
                </div>
            `;

            listaBoveda.appendChild(tarjeta);

            // Vincular eventos a los botones generados:
            activarEventosTarjetas();
        });
    }

    function activarEventosTarjetas() {
        // Copiar contraseña desde la tarjeta:
        document.querySelectorAll('.btn-copiar-item').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const passItem = e.target.getAttribute('data-pass');
                navigator.clipboard.writeText(passItem);

                const textoPrevio = e.target.textContent;
                e.target.textContent = 'Copiado';
                setTimeout(() => {
                    e.target.textContent = textoPrevio;
                }, 1500);
            });
        });


        // Eliminar credencial de la bóveda:
        document.querySelectorAll('.btn-eliminar-item').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const indice = e.target.getAttribute('data-index');
                let boveda = obtenerBoveda();

                boveda.splice(indice, 1);
                guardarBoveda(boveda);
                renderizarBoveda();
            });
        });
    }



    // GUARDAR NUEVA CREDENCIAL EN EL LOCALSTORAGE:
    btnGuardar.addEventListener('click', () => {
        const nombre = inputNombreCuenta.value.trim();
        const password = inputPassGenerada.value;


        if (!nombre) {
            alert('Por favor, ingresa un nombre para identificar la cuenta (Ej: GitHub).');
            return;
        }

        if (!password) {
            alert('No hay ninguna contraseña generada para guardar.');
            return;
        }

        let boveda = obtenerBoveda();
        boveda.push({ nombre, password });
        guardarBoveda(boveda);

        // Limpiar entrada y actualizar la vista de la bóveda:
        inputNombreCuenta.value = '';
        renderizarBoveda();
    });

    // Cargar la bóveda al iniciar la página:
    renderizarBoveda();

});