document.addEventListener('DOMContentLoaded', () => {
    inicializarAnimacionesTarjetas();
    inicializarZonaDescanso();
});

// Entrada de las tarjetas del menú al cargar:
function inicializarAnimacionesTarjetas(){
    const tarjetas = document.querySelectorAll('.tarjeta-api');

    tarjetas.forEach((tarjeta, index) => {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(20px)';
        tarjeta.style.transition = 'all 0.4s ease-out';

        setTimeout(() => {
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}


// Gestión de la Zona de Descanso:
const frasesDescanso = [
    "Si tu código funciona a la primera, probablemente olvidaste validar algo. Tómate un respiro.",
    "Los mejores bugs se encuentran cuando dejas de mirar la pantalla durante cinco minutos.",
    "Un buen sistema no es el que nunca falla, sino el que se recupera con elegancia.",
    "Hora de estirar la espalda y darle un sorbo al café antes de seguir conectando APIs.",
    "La arquitectura limpia hoy ahorra horas de depuración mañana.",
    "Incluso los servidores más rápidos necesitan un buen mantenimiento de vez en cuando."
];

function inicializarZonaDescanso() {
    const botonDescanso = document.getElementById('botonZonaDescanso');

    if (!botonDescanso) return;

    botonDescanso.addEventListener('click', async () => {
        const indiceAleatorio = Math.floor(Math.random() * frasesDescanso.length);
        const consejo = frasesDescanso[indiceAleatorio];
        mostrarModalDescanso(consejo);
    });
}

// Ventana modal para la Zona de Descanso:
function mostrarModalDescanso(mensaje) {
    // Si ya existe un modal, lo eliminamos:
    const modalExistente = document.getElementById('modalDescanso');
    if (modalExistente) modalExistente.remove();

    // Modal en pantalla:
    const modalHTML = `
        <div id="modalDescanso" class="estilo-modal-overlay">
            <div class="estilo-modal-contenido">
                <h3><i class="fa-solid fa-mug-hot"></i> Zona de Descanso</h3>
                <p>"${mensaje}"</p>
                <button id="cerrarModal" class="boton-descanso">Cerrar</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Cerrar modal en pantalla:
    document.getElementById('cerrarModal').addEventListener('click', () => {
        document.getElementById('modalDescanso').remove();
    });
}