document.addEventListener('DOMContentLoaded', () => {
    const entradaMarkdown = document.getElementById('entrada-markdown');
    const salidaHtml = document.getElementById('salida-html');


    // FUNCIÓN PRINCIPAL:
    function convertirMarkdown(texto) {
        if (!texto) return '';

        let html = texto;        

         // Títulos (H1, H2, H3):
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');


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
    // function convertirMarkdown(texto){
    //     if (!texto) return '';
    //     let lineas = texto.split('\n');
    //     let enLista = false;
    //     let htmlProcesado = '';

    //     for (let i = 0; i < lineas.length; i++){
    //         let linea = lineas[i].trim();

    //         if (linea === ''){
    //             if (enLista){
    //                 htmlProcesado += '</ul>';
    //                 enLista = false;
    //             }
    //             continue;
    //         }

    //         // Títulos:
    //         if (linea.startsWith('### ')){
    //             if (enLista) { htmlProcesado += '</ul>'; enLista = false; }
    //             htmlProcesado += `<h3>${linea.replace('### ', '')}</h3>`;
    //             continue;
    //         }
    //         if (linea.startsWith('## ')){
    //             if (enLista) { htmlProcesado += '</ul>'; enLista = false; }
    //             htmlProcesado += `<h2>${linea.replace('## ', '')}</h2>`;
    //             continue;
    //         }
    //         if (linea.startsWith('# ')){
    //             if (enLista) { htmlProcesado += '</ul>'; enLista = false; }
    //             htmlProcesado += `<h1>${linea.replace('# ', '')}</h1>`;
    //             continue;
    //         }

    //         // Listas:
    //         if (linea.startsWith('- ') || linea.startsWith('* ')){
    //             if (!enLista){
    //                 htmlProcesado += '<ul>';
    //                 enLista = true;
    //             }
    //             let contenidoLista = linea.substring(2);
    //             // Aplicamos formatos internos de negrita/cursiva
    //         }
    //     }
    // }


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
    


    

    
