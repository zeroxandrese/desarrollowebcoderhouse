// declaracion de variables a utilizar.
const URLPOST = "https://jsonplaceholder.typicode.com/posts";
nombreClienteObtenido = "";
correoClienteObtenido = "";
trabajoClienteObtenido = "";
descripcionTrabajoObtenido = "";
let infopost = "";

// informacion obtenida del formulario y almacenada en variables
let formularioContac = document.getElementById("formularioContacto");
document.onsubmit = function (evento) {
    evento.preventDefault();
    nombreClienteObtenido = nombreCliente.value;
    correoClienteObtenido = correoCliente.value;
    trabajoClienteObtenido = trabajoCliente.value;
    descripcionTrabajoObtenido = descripcionTrabajo.value;
    infopost = { nombre: nombreClienteObtenido, correo: correoClienteObtenido, trabajo: trabajoClienteObtenido, descripcion: descripcionTrabajoObtenido };
    $.post(URLPOST, infopost,
        function (respuesta, estado) {
            if (estado === "success") {
                $('#mendajeContactanos').prepend(`<div class="text-center mr-4" id="mensajeEnvioCorre" style="display: none">
                <h3>ESTIMADO ${respuesta.nombre} TU INFORMACION FUE ENVIADA DE MANERA EXITOSA.</h3>   
                </div>`);
                $('#mensajeEnvioCorre').slideDown(1500).delay(2000).slideUp(1500);
            } else {
                $('#mendajeContactanos').prepend(`<div class="text-center mr-4" id="mensajeEnvioCorre" style="display: none">POR FAVOR INTENTAR DE NUEVO, EL ENVÍO FUE FALLIDO</div>`);
                $('#mensajeEnvioCorre').slideDown(1500).delay(2000).slideUp(1500);
            }
        });
};