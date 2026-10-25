document.addEventListener('DOMContentLoaded', () => {
    const entradaMarkdown = document.getElementById('entrada-markdown');
    const salidaHtml = document.getElementById('salida-html');

    const pizarraOverlay = document.getElementById('pizarra-overlay');
    const btnCerrarPizarra = document.getElementById('btn-cerrar-pizarra');
    const btnEntender = document.getElementById('btn-entender');
    const btnAbrirPizarra = document.getElementById('btn-abrir-pizarra'); 



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
                cerrarPizarra(e);}
        });
    
    }




    // FUNCIÓN PRINCIPAL:
    function convertirMarkdown(texto) {
        if (!texto) return '';

        let html = texto;        

         // Títulos (H1, H2, H3):
        html = html.replace(/^###\s*(.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^##\s*(.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^#\s*(.*$)/gim, '<h1>$1</h1>');


         // Negrita y Cursiva:
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        

         // Transformamos líneas que empiezan por - o * en elementos de lista <li>:
        html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');


         // Agrupamos elementos <li> consecutivos dentro de una lista desordenada <ul>:
        html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
        html = html.replace(/<\/ul>\s*<ul>/g, '');


         // Limpieza de etiquetas <ul> múltiples adyacentes:
        html = html.replace(/<\/ul>\s*<ul>/g, '');


         // Convertimos el resto de líneas en párrafos <p>:
        let lineas = html.split('\n');
        let htmlProcesado = lineas.map(linea => {
            linea = linea.trim();
            if (linea.startsWith('<h1') || linea.startsWith('<h2') || linea.startsWith('<h3') ||
                linea.startsWith('<ul') || linea.startsWith('<li') || linea.startsWith('</ul') || linea === '') {
                return linea;
            }
            return `<p>${linea}</p>`;
        }).join('');
                
        return htmlProcesado; 
    }


    // EVENTO INPUT:
    function actualizarVistaPrevia() {
        const textoUsuario = entradaMarkdown.value;
        const resultadoHTML = convertirMarkdown(textoUsuario);
        salidaHtml.innerHTML = resultadoHTML;
    }

    // Escuchar los cambios mientras el usuario escribe:
    entradaMarkdown.addEventListener('input', actualizarVistaPrevia);


    // INICIO CON EL TEXTO DE EJEMPLO POR DEFECTO:
    actualizarVistaPrevia();


});
    


    

    
