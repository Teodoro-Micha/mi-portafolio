document.addEventListener('DOMContentLoaded', () => {
    const FILAS = 6;
    const COLUMNAS = 7;
    const VACIO = 0;
    const JUGADOR = 1;
    const PITER = 2;


    let tablero = Array(FILAS).fill(null).map(() => Array(COLUMNAS).fill(VACIO));
    let turnoActual = JUGADOR;
    let juegoActivo = true;


    const elementoTablero = document.getElementById('tablero-juego');
    const textoTurno = document.getElementById('texto-turno');
    const selectorDificultad = document.getElementById('selector-dificultad');
    const botonReiniciar = document.getElementById('boton-reiniciar');
    const panelMensajes = document.getElementById('panel-mensajes');
    const textoResultado = document.getElementById('texto-resultado');
    const botonNuevaPartida = document.getElementById('boton-nueva-partida');
});