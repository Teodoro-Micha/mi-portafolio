📝 Estado del Proyecto y Contexto:
El trabajo ha sido iniciado en clase durante una sesión práctica de una hora y media. Actualmente se encuentra en desarrollo. El profesor ha permitido llevar el proyecto a casa para completarlo detalladamente y realizar la entrega una vez finalizado por completo.

📋 Enunciado:
Desarrollar una página web funcional, cuidada y cercana a la maqueta proporcionada, titulada:
"Candidature en ligne – Offre de stage" (Candidatura en línea – Oferta de prácticas).
Contenido del proyecto:
	index.html
	css/style.css
	js/script.js

🛠️ Requisitos Técnicos Obligatorios:
HTML:
Estructura General
Crear una página que contenga:
	Un <header> con:
		Un título principal.
		Un texto corto de presentación.
	Un <main> que contenga el formulario de candidatura.
	Un <footer> que contenga:
		El nombre de la empresa.
		Un copyright.

Formulario estructurado en 3 fieldsets


CSS:
El diseño visual debe aplicar las siguientes directrices estructurales:
	Uso de propiedades como margin-bottom y border-radius (coins arrondis).
	Etiquetas <legend> en negrita.
	Etiquetas <label> con un ancho fijo para facilitar el alineamiento.
	Elementos <input>, <select> y <textarea> con:
		padding interno.
		Bordes redondeados (border-radius).
	Estilo visual específico para el estado :focus.
	Botón de Envoyer (Enviar) con un color de fondo diferente y destacado.

Para pantallas con un ancho inferior a 768px:
	Los <label> deben pasar a colocarse justo encima de los campos de texto.
	Los campos de entrada (input, etc.) deben ocupar todo el ancho disponible.


JavaScript:
Crear una función llamada verifierCandidature() que se ejecute de manera automática en el momento del envío del formulario (submit).
Esta función debe realizar obligatoriamente las siguientes validaciones:
	1. Verificar que los campos Nom (Apellido), Prénom (Nombre) y Email no estén vacíos.
	2. Verificar que el email contenga el carácter @.
	3. Verificar que el campo de Motivation contenga al menos 10 caracteres.
	4. Verificar que la casilla de verificación (checkbox) de certif esté seleccionada/marcada.
	5. Mostrar un mensaje con alert() en caso de error e impedir el envío automático del formulario si alguna validación falla.