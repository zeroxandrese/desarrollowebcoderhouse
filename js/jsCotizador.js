
// declaracion de variables a utilizar 
let valorfinal = "";
const manoObra = 60;
let padre2 = "";
let mercancia2 = "";
let padre3 = "";
let idObtenido = "";
let altoObtenido = "";
let anchoObtenido = "";
let profundidadObtenido = "";
let dato = "";
var colorAnterior = "";
var materialAnterior = "";
var precioAnterior = "";
var imagenAnterior = "";
var valorFinalAnterior = "";
const ProductosComprados = [];
const melaminess = [];
const IDS = "";


// declaracion de funciones constructoras a utilizar 
function melamines(color, espesor, ancho, alto, material, precio, imagen, idPlancha) {
    this.color = color;
    this.espesor = espesor;
    this.ancho = ancho;
    this.alto = alto;
    this.material = material;
    this.precio = precio;
    this.imagen = imagen;
    this.idPlancha = idPlancha;
}

function productoComprado(muebleColor, muebleValor, muebleMaterial, muebleImagen) {
    this.muebleColor = muebleColor;
    this.muebleValor = muebleValor;
    this.muebleMaterial = muebleMaterial;
    this.muebleImagen = muebleImagen;
}

// inclusion de informacion en el array de productos mediante solicitud get
$(document).ready(function () {
    $.getJSON("data/melaminess.json",
        function (datos, estado) {
            if (estado === "success") {
                let solicitados = datos;
                for (const dato of solicitados) {
                    melaminess.push(new melamines(dato.color, dato.espesor, dato.ancho, dato.alto, dato.material, dato.precio, dato.imagen, dato.idPlancha));
                }
            }
        });
});

// muestra de productos a partir del cards
let boton = document.getElementById("btnProductos");
boton.onclick = funcionMuestraProducto;
function funcionMuestraProducto(e) {
    melaminess.forEach(item => {
        $('#muestaMelamines').append(`<div class ="col-6"><h4>${item.color} - IDPRODUCTO:${item.idPlancha}</h3>
                                <p>MATERIAL:${item.material} - PRECIO:${item.precio} SOLES</p>
                                <img src='${item.imagen}' width='160' height='150'></div>`);
    });
}

//mensaje de id incorrecto.
$('#mensajeAnadido').prepend(`<div class="text-center mr-4" id="mensajeEliminacion" style="display: none">
 <h3>EL ID DEL PRODUCTO INGRESADO NO SE ENCUENTRA REGISTRADO.</h3>
 <h3>INTENTELO DE NUEVO.</h3>     
</div>`);
$('#mensajeEliminacion').css("background-color", "red");
$('#mensajeEliminacion').animate({
    right: '200px',
    height: '100px',
    opacity: '0.8',
});

// cotizacion del mueble y calculos correspondiente con muestra en el dom
let formularioC = document.getElementById("formularioCotizar");
document.onsubmit = function (evento) {
    evento.preventDefault();
    idObtenido = idMaterial.value;
    altoObtenido = altoMueble.value;
    anchoObtenido = anchoMueble.value;
    profundidadObtenido = profundidadMueble.value;
    if (idObtenido > 4) {
        $('#botonComprar').attr("disabled", true);
        $('#mensajeEliminacion').slideDown(1500).delay(2000).slideUp(1500);
    } else {
        $('#botonComprar').attr("disabled", null);
        dato = melaminess.find(elemento => elemento.idPlancha == idObtenido);
        valorfinal = (((altoObtenido * anchoObtenido * profundidadObtenido) / (dato.ancho * dato.alto)) * dato.precio) + manoObra;
        $('#muestaMelamines').html(`<div class="col-12 text-center">
                                        <h3>EL VALOR APROXIMADO DE TU MUEBLE SERIA DE ${Math.trunc(valorfinal)} SOLES</h3>
                                        <h4>EL MATERIAL QUE ELEGISTE PARA TU MUEBLE ES</h4>
                                        <h5>${dato.color}</h5>
                                        <p>MATERIAL:${dato.material} - PRECIO:${dato.precio} SOLES</p>
                                        <img src='${dato.imagen}' width='250' height='200'></div>`);

    }
}

//mensaje de añadido al carrito
$('#mensajeAnadido').prepend(`<div class="text-center mr-4" id="mensajeAñadido" style="display: none">
 <h3>TU PRODUCTO SE HA AÑADIDO DE MANERA EXITOSA AL CARRITO DE COMPRAS.</h3>                          
</div>`);
$('#mensajeAñadido').css("background-color", "green");
$('#mensajeAñadido').animate({
    right: '200px',
    height: '100px',
    opacity: '0.8',
});
$("#botonComprar").click(() => {
    $('#mensajeAñadido').slideDown(1500).delay(2000).slideUp(1500);
});

//funcion comprar y añadido al carrito, la informacion se convierte en json para el guardado en el localstorage
if (idObtenido > 4) {
    $('#botonComprar').attr("disabled", true);
} else {
    $('#botonComprar').attr("disabled", null);
    $('#botonComprar').on('click', function () {
        $('#bodyCarrito').append(`<tr>
        <td>${dato.color}</td>
        <td>${Math.trunc(valorfinal)}</td>
        <td>${dato.material}</td>
        <td>
        <img src='${dato.imagen}' width='80px' height='80px'>
        </td>
        </tr>`);
        ProductosComprados.push(new productoComprado(dato.color, valorfinal, dato.material, dato.imagen));
        materialAnterior = localStorage.setItem('materialRecuperado', JSON.stringify(dato.material));
        colorAnterior = localStorage.setItem('colorRecuperado', JSON.stringify(dato.color));
        imagenAnterior = localStorage.setItem('imagenRecuperado', JSON.stringify(dato.imagen));
        valorFinalAnterior = localStorage.setItem('valorRecuperado', JSON.stringify(valorfinal));
    });
}

// recuperacion de la informacion en json y agregado al carrito
materialAnterior = JSON.parse(localStorage.getItem('materialRecuperado'));
if (materialAnterior != null) {
    $(document).ready(function () {
        materialAnterior = JSON.parse(localStorage.getItem('materialRecuperado'));
        colorAnterior = JSON.parse(localStorage.getItem('colorRecuperado'));
        precioAnterior = JSON.parse(localStorage.getItem('precioRecuperado'));
        imagenAnterior = JSON.parse(localStorage.getItem('imagenRecuperado'));
        valorFinalAnterior = JSON.parse(localStorage.getItem('valorRecuperado'));
        $('#Recuperacion').prepend(`<h3 align="center">NO OLVIDES QUE TIENES UNA COMPRA EN EL CARRITO DE TU ULTIMA VISITA</h3>`);
        $('#bodyCarrito').append(`<tr>
        <td>${colorAnterior}</td>
        <td>${Math.trunc(valorFinalAnterior)}</td>
        <td>${materialAnterior}</td>
        <td>
        <img src='${imagenAnterior}' width='80px' height='80px'>
        </td>
        </tr>`);
    });
} else {
    document.getElementById('Recuperacion').style.display = "none";
}

// funcion para eliminar informacion del carrito y reiniciar el storage
$('#vaciarCarrito').on('click', function () {
    let eliminar = document.getElementById('bodyCarrito');
    eliminar.parentNode.removeChild(eliminar);
    localStorage.clear();
    ProductosComprados = [];
});
