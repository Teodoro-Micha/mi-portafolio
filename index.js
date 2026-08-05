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
    formulario.addEventListener("submit", async (suceso) => {
        suceso.preventDefault();
        
        const nombreValido = inputNombre.value.trim();
        const mensajeValido = inputMensaje.value.trim();
        const correoValido = inputCorreo.value.trim();

        // Validamos que los campos de texto no estén vacíos o solo con espacios:
        if (nombreValido === '') {
            alert('Por favor, ingresa tu nombre.');
            inputNombre.focus();
            return;
        }

        
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

        
        const formData = new FormData(formulario);

        try {
            const response = await fetch("https://formspree.io/f/xjgnqzpp", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
            });

        if (response.ok) {
            alert('¡Mensaje enviado con éxito!');
            formulario.reset();
        } else {
        alert('Hubo un problema al enviar el mensaje.');
        }
        } catch (error) {
            alert("Error de conexión. Inténtalo de nuevo más tarde.");
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

    function esCorreoValido(correo) {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronCorreo.test(correo);
    }
});
    


// CHATBOT CON IA PARA EL PORTAFOLIO:
    

    //const CONTEXTO_TEODORO = `
    //Eres el asistente virtual oficial de Teodoro Micha en su portafolio web. 
    //Información clave sobre Teodoro:
    //- Profesión: Desarrollador informático enfocado en tecnología y rentabilidad empresarial.
    //- Habilidades: Desarrollo web (HTML, CSS, JS), arquitectura de software. versátil con un posgrado en Filosofía, posee excepcionales habilidades lógicas y analíticas. Técnico especializado en Gestión Empresarial con experiencia en optimización de procesos, actualmente estudia Desarrollo de Software. Es bilingüe (español nativo), se orienta a la resolución de problemas complejos y a la ética profesional. 
    //- Responde siempre de forma amable, profesional y breve (máximo 3 frases).
    //- Si te preguntan algo no relacionado con Teodoro, di amablemente que solo respondes sobre su perfil.
    //Profesional con un perfil híbrido único que combina la solidez técnica del Desarrollo Informático con la visión estratégica de la Gestión de Empresas. Especializado en diseñar e implementar soluciones de software eficientes que responden directamente a las necesidades operativas y financieras del negocio. Capacidad demostrada para analizar métricas de rendimiento, optimizar procesos y gestionar proyectos tecnológicos alineando la tecnología con los objetivos corporativos.
    //Formación Académica: Técnico Superior en Desarrollo Informático (TSDI) ooe el Groupe des Instituts Ibn Khaldoun De Gestion et d’informatique (Groupe IKI) | [2025 - Actualidad] Especialización en desarrollo de aplicaciones web y de escritorio. Diseño, gestión y optimización de bases de datos relacionales. Metodologías ágiles de desarrollo de software. Sigue estudiando desarrollo informatico, en el proximo año Teodoro se gradua como Técnico Especialista en Desarrollo Informático. Es Técnico Superior en Gestión de Empresas por Institut de Gestion et de Formation Professionnelle (IGFP) | [2023 - 2025]: Administración, contabilidad, finanzas y gestión de recursos humanos. Análisis de procesos de negocio y optimización del rendimiento operativo. Control de calidad, atención al cliente y gestión de incidencias.
    //Competencias y Habilidades: en Desarrollo Informático & Tecnología; Lenguajes de Programación y Marcado: HTML5, CSS3, JavaScript, Python; Bases de Datos: Microsoft Access (Diseño relacional y consultas avanzadas); Herramientas y Entornos: Git, GitHub, entornos de desarrollo integrado (IDE); Soporte Técnico: Mantenimiento de software, recuperación de archivos borrados (USB, Discos duros, Tarjetas SD); Gestión Ofimática Avanzada e Información: Microsoft Office (Word, Excel, PowerPoint, Access).
    //Gestión de Empresas & Habilidades Blandas: Gestión de Operaciones: Análisis de métricas clave (recontacto, resolución en primer contacto, eficiencia); Atención al Cliente: Gestión de clientes difíciles, resolución de conflictos y soporte técnico especializado; Gestión de Proyectos: Planificación, asignación de recursos y control de plazos; Comunicación Fuerte: Capacidad para actuar como puente entre el equipo técnico y la administración del negocio.
    //Proyectos Destacados: CONVERSIÓN A PAGINA WEB DE MI TESINA COMO TÉCNICO SUPERIOR EN GESTION DE EMPRESAS, tesina titulada Estrategias globales para atraer, seleccionar y retener talento en los centros de llamadas, basado en Estrategias globales para atraer, seleccionar y retener talento en los centros de llamadas; este Portafolio Web Profesional Independiente basado en Creación de una estructura web limpia y accesible utilizando exclusivamente HTML semántico para garantizar un rendimiento óptimo y una separación estricta de la lógica de diseño.
    //Experiencia Profesional: Asesor / Agente de Servicio al Cliente y Soporte Técnico en la empresa Konecta [Agosto - 2024] - Actualidad,su trabajo consiste en Atención directa y gestión de incidencias técnicas complejas relacionadas con servicios y software; Monitoreo y mejora activa de métricas críticas de rendimiento individual y de equipo (reducción del porcentaje de recontacto y optimización de soluciones efectivas); Colaboración estrecha con supervisores y equipos operativos para refinar los flujos de comunicación con el cliente. También es Técnico Independiente de Mantenimiento Informático Autónomo / Freelance  desde 2025; se basa en Diagnóstico y reparación de fallas de software, almacenamiento de datos y mantenimiento preventivo para clientes particulares y comerciales; Gestión integral del pequeño negocio: presupuestos, atención al cliente y facturación.
    `;





