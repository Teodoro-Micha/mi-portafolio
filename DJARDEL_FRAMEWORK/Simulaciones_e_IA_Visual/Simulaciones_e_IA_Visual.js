document.addEventListener('DOMContentLoaded', () => {
    const FILAS = 6;
    const COLUMNAS = 7;
    const VACIO = 0;
    const JUGADOR = 1;
    const PITER = 2;
    // En todo el código, PITER representa a la IA.


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


    // TABLERO GRÁFICO:
    function crearTableroGrafico() {
        elementoTablero.innerHTML = '';
        for (let r = 0; r < FILAS; r++){
            for (let c = 0; c < COLUMNAS; c++){
                const casilla = document.createElement('div');
                casilla.classList.add('casilla');
                casilla.dataset.fila = r;
                casilla.dataset.columna = c;
                casilla.addEventListener('click', manejarClicCasilla);
                elementoTablero.appendChild(casilla);
            }
        }
    }


    // TURNOS:
    function manejarClicCasilla(e){
        if (!juegoActivo || turnoActual !== JUGADOR) return;

        const columna = parseInt(e.target.dataset.columna);
        const filaDisponible = obtenerFilaValida(tablero, columna);

        if (filaDisponible !== -1){
            hacerMovimiento(tablero, filaDisponible, columna, JUGADOR);
            actualizarGraficos();

            if (comprobarVictoria(tablero, JUGADOR)){
                finalizarJuego("¡Has Destronado a Piter Monarca!");
                return;
            }

            if (comprobarTableroLleno(tablero)){
                finalizarJuego("¡Empate Táctico!");
                return;
            }

            turnoActual = PITER;
            textoTurno.textContent = "Turno de Piter Monarca...";
            textoTurno.className = "turno-ia";

            // Pequeña pausa para simular pensamiento de PITER:
            setTimeout(turnoIA, 400);
        }
    }


    function turnoIA(){
        if (!juegoActivo) return;

        const dificultad = parseInt(selectorDificultad.value);
        let columnaElegida;

        if (dificultad === 1){
            // Fácil:
            columnaElegida = movimientoAleatorio(tablero);
        }else if (dificultad === 2){
            // Normal:
            columnaElegida = movimientoTactico(tablero);
        }else{
            // Imposible:
            columnaElegida = minimax(tablero, 4, -Infinity, Infinity, true).columna;
        }


        const filaDisponible = obtenerFilaValida(tablero, columnaElegida);
        if (filaDisponible !== -1){
            hacerMovimiento(tablero, filaDisponible, columnaElegida, IA);
            actualizarGraficos();

            if (comprobarVictoria(tablero, PITER)){
                finalizarJuego("PITER Monarca sigue siendo el REY");
                return;
            }

            if (comprobarTableroLleno(tablero)){
                finalizarJuego("¡Empate Táctico!");
                return;
            }


            // Nuevo turno del Jugador:
            turnoActual = JUGADOR;
            textoTurno.textContent = "Tu Turno (Fichas Rojas)";
            textoTurno.className = "turno-jugador";
        }
    }


    // LÓGICA Y FÍSICA:


});