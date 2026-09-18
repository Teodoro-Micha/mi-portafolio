// ESTADO GLOBAL DE LA WEB:
let productosTotales = [];
let carrito = JSON.parse(localStorage.getItem("carrito_compras")) || [];

let paginaActual = 1;
const productosPorPagina = 6;


const contenedorProductos = document.getElementById("cuadricula-productos");
const plantillaProducto = document.getElementById("plantilla-tarjeta-producto");
const cargador = document.getElementById("cargador");
const contenedorError = document.getElementById("mensaje-error");
const textoError = document.getElementById("texto-error");

const entradaBusqueda = document.getElementById("entrada-busqueda");
const selectorCategoria = document.getElementById("selector-categoria");
const botonLimpiarFiltros = document.getElementById("boton-limpiar-filtros");

// Clima:
const elementoCiudad = document.getElementById("clima-ciudad");
const elementoTemperatura = document.getElementById("clima-temperatura");
const elementoIconoClima = document.getElementById("clima-icono");




// INICIALIZACIÓN:
document.addEventListener('DOMContentLoaded', () => {
    inicializarCarritoUI();
    obtenerClima();
    obtenerProductos();
    configurarEventos();
});

function configurarEventos() {
    document.getElementById("boton-prev").addEventListener('click', () => {
        if (paginaActual > 1) {
        paginaActual--;
        renderizarProductos(productosTotales);
        }
    });

    document.getElementById("boton-next").addEventListener('click', () => {
        const totalPaginas = Math.ceil(productosTotales.length / productosPorPagina);
        if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarProductos(productosTotales);
        }
    });

    entradaBusqueda.addEventListener("input", aplicarFiltros);
    selectorCategoria.addEventListener("change", aplicarFiltros);
    botonLimpiarFiltros.addEventListener("click", reiniciarFiltros);
}





// PETICIÓN DE DATOS AL SERVIDOR (API):
// API de Productos (FakeStore API):
async function obtenerProductos() {
    mostrarCargador(true);
    ocultarError();

    try {
        const respuesta = await fetch("https://dummyjson.com/products?limit=100");
        
        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        productosTotales = datos.products;

        poblarCategorias(productosTotales);
        renderizarProductos(productosTotales);

    } catch (error) {
        console.error("Error al obtener productos:", error);
        mostrarError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.");
    } finally {
        mostrarCargador(false);
    }
}

// API del Clima (Open-Meteo):
async function obtenerClima() {
    try {
        // Coordenadas por defecto; Tanger - Marruecos:
        const latitud = 35.7595;
        const longitud = -5.8340;
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;

        const respuesta = await fetch(urlClima);
        if (!respuesta.ok) throw new Error('Error al obtener el clima');

        const datos = await respuesta.json();
        actualizarWidgetClima(datos.current_weather);
    } catch (error) {
        console.error('Error del clima:', error);
        elementoCiudad.textContent = "Clima no disponible";
    }
}





// FILTRADO Y BÚSQUEDA:
function aplicarFiltros() {
    paginaActual = 1;

    const textoBusqueda = entradaBusqueda.value.toLowerCase().trim();
    const categoriaSeleccionada = selectorCategoria.value;

    const productosFiltrados = productosTotales.filter(producto => {
        const coincideTitulo = producto.title.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = categoriaSeleccionada === "todos" || producto.category === categoriaSeleccionada;

        return coincideTitulo && coincideCategoria;
    });

    if (productosFiltrados.length === 0) {
        mostrarError("No se encontraron productos que coincidan con tu búsqueda.");
        renderizarProductos([]);
    } else {
        ocultarError();
        renderizarProductos(productosFiltrados);
    }
}


function reiniciarFiltros() {
    entradaBusqueda.value = '';
    selectorCategoria.value = 'todos';
    ocultarError();
    renderizarProductos(productosTotales);
}

function poblarCategorias(productos) {
    const categoriasUnicas = [...new Set(productos.map(p => p.category))];
    
    // Todas las categorías como primera opción, borrando lo que hubiera antes:
    selectorCategoria.innerHTML = '<option value="todos">Todas las categorías</option>';

    categoriasUnicas.forEach(categoria => {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        selectorCategoria.appendChild(opcion);
    });
}



// RENDERIZADO Y DIBUJO EN EL DOM:
function obtenerProductosPaginados(listaProductos) {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    return listaProductos.slice(inicio, fin);
}

function actualizarPaginacionUI(totalProductos) {
    const totalPaginas = Math.ceil(totalProductos.length / productosPorPagina) || 1;
    document.getElementById("texto-pagina").textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    document.getElementById("boton-prev").disabled = paginaActual === 1;
    document.getElementById("boton-next").disabled = paginaActual === totalPaginas;
}


function renderizarProductos(productos) {
    contenedorProductos.innerHTML = '';

    const productosAMostrar = obtenerProductosPaginados(productos);

    productosAMostrar.forEach(producto => {
        // Clonamos plantilla HTML:
        const clon = plantillaProducto.content.cloneNode(true);

        // Insertamos  los datos:
        const imagen = clon.querySelector(".imagen-producto");

        let urlImagen = "https://placehold.co/300x300?text=Sin+Imagen";
        if (producto.images && producto.images.length > 0) {
            // Limpiamos corchetes, comillas y barras invertidas que envía la API de Platzi:
            let urlLimpia = producto.images[0].replace(/[\[\]\\"]/g, "");
        
            // Verificamos que empiece por http/https:
            if (urlLimpia.startsWith("http")) {
                urlImagen = urlLimpia;
            }
        }
        imagen.src = producto.thumbnail;
        imagen.onerror = function() {
            this.onerror = null;
            this.src = "https://placehold.co/300x300?text=Sin+Imagen";
        };
        imagen.alt = producto.title;


        clon.querySelector(".producto-categoria").textContent = producto.category;
        clon.querySelector(".producto-titulo").textContent = producto.title;
        clon.querySelector(".producto-precio").textContent = `$${producto.price.toFixed(2)}`;

        // Botón Añadir al Carrito:
        const botonAgregar = clon.querySelector(".boton-agregar-carrito");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));

        contenedorProductos.appendChild(clon);
    });

    actualizarPaginacionUI(productos);
}


function actualizarWidgetClima(clima) {
    elementoCiudad.textContent = "Tánger, MA";
    elementoTemperatura.textContent = `${Math.round(clima.temperature)}°C`;
    elementoIconoClima.textContent = obtenerIconoClima(clima.weathercode);
}

function obtenerIconoClima(codigo) {
    if (codigo === 0) return "☀️";
    if (codigo >= 1 && codigo <= 3) return "🌤️";
    if (codigo >= 45 && codigo <= 48) return "🌫️";
    if (codigo >= 51 && codigo <= 67) return "🌧️";
    if (codigo >= 71) return "❄️";
    return "🌡️";
}




// CARRITO Y ALMACENAMIENTO PERMANENTE:
function agregarAlCarrito(producto) {
    carrito.push(producto);
    guardarCarritoLocalStorage();
    actualizarContadorCarritoUI();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito_compras");
    actualizarContadorCarritoUI();
}

function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito_compras", JSON.stringify(carrito));
}

function inicializarCarritoUI() {
    actualizarContadorCarritoUI();

    const botonVaciar = document.getElementById("boton-vaciar-carrito");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("El carrito ya está vacío.");
                return;
            }
            if (confirm("¿Seguro que deseas vaciar el carrito?")) {
                vaciarCarrito();
            }
        });
    }
}

function actualizarContadorCarritoUI() {
    const contadorBadge = document.getElementById("badge-carrito");
    if (contadorBadge) {
        contadorBadge.textContent = carrito.length;
    }
}




// MANEJO DE LOADER & ERRORES:
function mostrarCargador(mostrar) {
    if (mostrar) {
        cargador.classList.remove("oculto");
    } else {
        cargador.classList.add("oculto");
    }
}

function mostrarError(mensaje) {
    textoError.textContent = mensaje;
    contenedorError.classList.remove("oculto");
}

function ocultarError() {
    contenedorError.classList.add("oculto");
}