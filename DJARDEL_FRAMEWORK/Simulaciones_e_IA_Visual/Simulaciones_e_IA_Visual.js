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
                finalizarJuego("¡Buen Juego, ahora puedes subir de nivel!");
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
            hacerMovimiento(tablero, filaDisponible, columnaElegida, PITER);
            actualizarGraficos();

            if (comprobarVictoria(tablero, PITER)){
                finalizarJuego("Has perdido, PITER Monarca sigue siendo el REY");
                return;
            }

            if (comprobarTableroLleno(tablero)){
                finalizarJuego("¡Empate Táctico, PITER Monarca sigue siendo el REY!");
                return;
            }


            // Nuevo turno del Jugador:
            turnoActual = JUGADOR;
            textoTurno.textContent = "Tu Turno (Fichas Rojas)";
            textoTurno.className = "turno-jugador";
        }
    }


    // LÓGICA Y FÍSICA:
    function obtenerFilaValida(tab, col){
        for (let r = FILAS - 1; r >= 0; r--){
            if (tab[r][col] === VACIO) return r;
        }
        return -1;
    }

    function hacerMovimiento(tab, fila, col, pieza){
        tab[fila][col] = pieza;
    }

    function obtenerColumnasValidas(tab){
        const validas = [];
        for (let c = 0; c < COLUMNAS; c++){
            if (tab[0][c] === VACIO) validas.push(c);
        }
        return validas;
    }

    function actualizarGraficos(){
        const casillas = elementoTablero.children;
        for (let r = 0; r < FILAS; r++){
            for (let c = 0; c < COLUMNAS; c++){
                const indice = r * COLUMNAS + c;
                const valor = tablero[r][c];
                casillas[indice].className = 'casilla';
                if (valor === JUGADOR) casillas[indice].classList.add('jugador');
                if (valor === PITER) casillas[indice].classList.add('ia');
            }
        }
    }




    // COMPROBACIÓN DE VICTORIA:
    function comprobarVictoria(tab, pieza){
        // Horizontal:
        for (let r = 0; r < FILAS; r++){
            for (let c = 0; c < COLUMNAS - 3; c++){
                if (tab[r][c] === pieza && tab[r][c+1] === pieza && tab[r][c+2] === pieza && tab[r][c+3] === pieza) return true;
            }
        }

        // Vertical:
        for (let r = 0; r < FILAS - 3; r++){
            for (let c = 0; c < COLUMNAS; c++){
                if (tab[r][c] === pieza && tab[r+1][c] === pieza && tab[r+2][c] === pieza && tab[r+3][c] === pieza) return true;
            }
        }

        // Diagonal Positiva:
        for (let r = 0; r < FILAS - 3; r++){
            for (let c = 0; c < COLUMNAS - 3; c++){
                if (tab[r][c] === pieza && tab[r+1][c+1] === pieza && tab[r+2][c+2] === pieza && tab[r+3][c+3] === pieza) return true;
            }
        }

        // Diagonal Negativa:
        for (let r = 3; r < FILAS; r++){
            for (let c = 0; c < COLUMNAS - 3; c++){
                if (tab[r][c] === pieza && tab[r-1][c+1] === pieza && tab[r-2][c+2] === pieza && tab[r-3][c+3] === pieza) return true;
            }
        }
        return false;
    }


    function comprobarTableroLleno(tab){
        return obtenerColumnasValidas(tab).length === 0;
    }






    // NIVELES DE DIFICULTAD:
    function movimientoAleatorio(tab){
        const validas = obtenerColumnasValidas(tab);
        return validas[Math.floor(Math.random() * validas.length)];
    }

    function movimientoTactico(tab){
        const validas = obtenerColumnasValidas(tab);
        // 1. Ganar si puede:
        for (let col of validas){
            const fila = obtenerFilaValida(tab, col);
            let copia = tab.map(arr => [...arr]);
            hacerMovimiento(copia, fila, col, PITER);
            if (comprobarVictoria(copia, PITER)) return col;
        }

        // 2. Bloqueamos al jugador si va a ganar:
        for (let col of validas){
            const fila = obtenerFilaValida(tab, col);
            let copia = tab.map(arr => [...arr]);
            hacerMovimiento(copia, fila, col, JUGADOR);
            if (comprobarVictoria(copia, JUGADOR)) return col;
        }
        return movimientoAleatorio(tab);
    }






    // ALGORITMO MINIMAX CON PODA ALFA - BETA:
    function minimax(tab, profundidad, alfa, beta, esMaximizando){
        const validas = obtenerColumnasValidas(tab);
        const esTerminal = comprobarVictoria(tab, JUGADOR) || comprobarVictoria(tab, PITER) || validas.length === 0;

        if (profundidad === 0 || esTerminal){
            if (esTerminal){
                if (comprobarVictoria(tab, PITER)) return { columna: null, puntuacion: 100000 };
                if (comprobarVictoria(tab, JUGADOR)) return { columna: null, puntuacion: -100000 };
                return { columna: null, puntuacion: 0 };
            }else{
                return { columna: null, puntuacion: evaluarPosicion(tab, PITER) };
            }
        }

        if (esMaximizando){
            let valorMax = -Infinity;
            let mejorColumna = validas[0];
            for (let col of validas){
                const fila = obtenerFilaValida(tab, col);
                let copiaTablero = tab.map(arr => [...arr]);
                hacerMovimiento(copiaTablero, fila, col, PITER);
                let nuevaPuntuacion = minimax(copiaTablero, profundidad - 1, alfa, beta, false).puntuacion;
                if (nuevaPuntuacion > valorMax){
                    valorMax = nuevaPuntuacion;
                    mejorColumna = col;
                }
                alfa = Math.max(alfa, valorMax);
                if (alfa >= beta) break;
            }
            return { columna: mejorColumna, puntuacion: valorMax };
        }else{
            let valorMin = Infinity;
            let mejorColumna = validas[0];
            for (let col of validas){
                const fila = obtenerFilaValida(tab, col);
                let copiaTablero = tab.map(arr => [...arr]);
                hacerMovimiento(copiaTablero, fila, col, JUGADOR);
                let nuevaPuntuacion = minimax(copiaTablero, profundidad - 1, alfa, beta, true).puntuacion;
                if (nuevaPuntuacion < valorMin){
                    valorMin = nuevaPuntuacion;
                    mejorColumna = col;
                }
                beta = Math.min(beta, valorMin);
                if (alfa >= beta) break;
            }
            return { columna: mejorColumna, puntuacion: valorMin };
        }
    }

    // Evaluamos heurísticamente el Tablero:
    function evaluarPosicion(tab, pieza){
        let puntuacion = 0;
        // Priorizamos la columna central:
        const arrayCentral = tab.map(fila => fila[Math.floor(COLUMNAS / 2)]);
        const conteoCentral = arrayCentral.filter(x => x === pieza).length;
        puntuacion += conteoCentral * 3;
        return puntuacion;
    }






    // CONTROL DE ESTADO DE FIN DE JUEGO:
    function finalizarJuego(mensaje){
        juegoActivo = false;
        textoResultado.textContent = mensaje;
        panelMensajes.classList.remove('panel-oculto');
    }

    function reiniciarJuego(){
        tablero = Array(FILAS).fill(null).map(() => Array(COLUMNAS).fill(VACIO));
        turnoActual = JUGADOR;
        juegoActivo = true;
        textoTurno.textContent = "Tu Turno (Fichas Rojas)";
        textoTurno.className = "turno-jugador";
        panelMensajes.classList.add('panel-oculto');
        crearTableroGrafico();
    }



    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonNuevaPartida.addEventListener('click', reiniciarJuego);


    // Arrancar Juego:
    crearTableroGrafico();
    
});