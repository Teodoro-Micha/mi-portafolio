// Buscamos el formulario en el HTML usando su ID:
const formulario = document.getElementById("formulario-contacto");

// Creamos el "escuchador"; le decimos al programa que esté atento al evento '"submit":

formulario.addEventListener("submit", function(Evento) {

    // Para evitar que el navegador limpie el formulario antes de que el pueda leerlo:
    Evento.preventDefault();

    // Recogemos los datos que el usuario ha escrito:
    const Datos = new FormData(formulario);

    const Nombre = Datos.get("nombre");
    const Email = Datos.get("correo");
    const Mensaje = Datos.get("mensaje");

    console.log("Formulario rellenado con éxito");
    console.log("Nombre introducido:", Nombre)
    console.log("Correo introducido:", Email);
    console.log("Mensaje introducido:", Mensaje);

    alert("Gracias, he recibido tu mensaje");

});