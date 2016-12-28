// Instanciamos el objeto principal
var oBiblioteca = new Biblioteca();
oBiblioteca.altaUsuario(new Usuario("1", "Miguel", "Ramirez Ramos", "654321398"));
oBiblioteca.altaUsuario(new Usuario("2", "Marta", "Morales Guerrero", "722345643"));
oBiblioteca.altaUsuario(new Usuario("3", "Rocio", "Rodriguez Sanz", "614523573"));
oBiblioteca.altaUsuario(new Usuario("4", "Pablo", "Ruiz Lopez", "648131374"));
oBiblioteca.altaUsuario(new Usuario("5", "Juan", "Perez Perez", "647813573"));

oBiblioteca.altaArticulo(new Libro(1, "Diario de Ana Frank", "Ana Frank", 217));
oBiblioteca.altaArticulo(new Libro(2, "Los pilares de la Tierra", "Ken Follett", 1300));
oBiblioteca.altaArticulo(new Libro(3, "La Casa de Bernarda Alba", "Federico García Lorca", 288));
oBiblioteca.altaArticulo(new Libro(4, "Don Quijote de la Mancha", "Miguel de Cervantes Saavedra", 1429));

oBiblioteca.altaArticulo(new DVD(5, "In Time", new Date(2011, 10, 28), true));
oBiblioteca.altaArticulo(new DVD(6, "Lo Imposible", new Date(2012, 10, 11), false));
oBiblioteca.altaArticulo(new DVD(7, "El niño con el pijama de rayas", new Date(2006, 01, 05), true));
oBiblioteca.altaArticulo(new DVD(8, "Deadpool", new Date(2016, 02, 12), false));

//FUNCION ALTA USUARIO
function altaUsuario() {
    ocultarFormularios();
    top.frames[0].document.getElementById("altaUsuario").style.display = "block";
    top.frames[0].document.frmAltaUsuario.reset();
}

//FUNCION ALTA ARTICULO
function altaArticulo() {
    ocultarFormularios();
    top.frames[0].document.getElementById("altaArticulo").style.display = "block";
    top.frames[0].document.frmAltaArticulo.reset();
    top.frames[0].document.getElementById("libro").style.display = "block";
    top.frames[0].document.getElementById("dvd").style.display = "none";
}

//FUNCION ALTA PRESTAMO
function altaPrestamo() {
    ocultarFormularios();
    top.frames[0].document.getElementById("altaPrestamo").style.display = "block";
    top.frames[0].document.frmAltaPrestamo.reset();

    var f = new Date();
    var actual = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
    top.frames[0].document.getElementById("fechaInicio").value = actual;

    //var usuario = top.frames[0].document.frmAltaPrestamo.txtIdUsuario;
    var usuario = top.frames[0].document.getElementById("usuario");

    for (var i = 0; i < oBiblioteca.usuarios.length; i++) {
        usuario.options[i] = new Option(oBiblioteca.usuarios[i].idUsuario + " " + oBiblioteca.usuarios[i].nombre + " " + oBiblioteca.usuarios[i].apellidos);
    }

    var articulo = top.frames[0].document.frmAltaPrestamo.listaArticulos;


    var articulosDelCombo = [];
    var oForm = top.frames[0].document.frmAltaPrestamo;
    var lista = oForm.listaArticulos;

    if (lista[0].text == "nada") {
        articulosDelCombo = oBiblioteca.catalogo;
        for (var i = 0; i < articulosDelCombo.length; i++) {
            if (articulosDelCombo[i] instanceof DVD) {
                articulo.options[i] = new Option("D " +articulosDelCombo[i].idArticulo+ " " + articulosDelCombo[i].titulo);
            }
            else {
                articulo.options[i] = new Option("L " +articulosDelCombo[i].idArticulo+ " " + articulosDelCombo[i].titulo);
            }
        }
    }
    else {
        var j = 0;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].selected != true) {
                articulosDelCombo[j] = lista[i].text;
                j++;
            }
        }

        for (var i = 0; i < articulosDelCombo.length; i++) {
            articulo.options[i] = new Option(articulosDelCombo[i]);
        }

    }
}


//FUNCION DEVOLVER PRESTAMO
function devolverPrestamo() {
    ocultarFormularios();
    top.frames[0].document.getElementById("devolverPrestamo").style.display = "block";
    top.frames[0].document.frmDevolverPrestamo.reset();
}

function actualizarCombo() {
    var oForm = top.frames[0].document.frmAltaPrestamo;
    var lista = oForm.listaArticulos;

    var seleccionados = [];
    for (var i = 0; i < lista.options.length; ++i) {
        seleccionados[i] = lista.options[i].selected;
    }

    i = lista.options.length;
    while (i--) {
        //actualizamos combo
        if (seleccionados[i]) {
            lista.remove(i);
        }
    }
}

function añadirArticuloDevueltoYActualizaFecha(oNuevoPrestamoDevuelto){
    var articulo = top.frames[0].document.frmAltaPrestamo.listaArticulos;
    //alert(articulo.length);
    var i = articulo.length;
        //alert(oNuevoPrestamo.idPrestamo);
    var oPrestamo= new Prestamo (oNuevoPrestamoDevuelto.idPrestamo, oNuevoPrestamoDevuelto.idUsuario, oNuevoPrestamoDevuelto.articulos, oNuevoPrestamoDevuelto.fechaInicio, oNuevoPrestamoDevuelto.fechaFin);

    for(var j=0; j<oPrestamo.articulos.length;j++){
        if (oPrestamo.articulos[i] instanceof DVD) {
            articulo.options[i] = new Option(oPrestamo.articulos[j]);
        }
        else {
            articulo.options[i] = new Option(oPrestamo.articulos[j]);
        }
        i++;
    }
    oNuevoPrestamoDevuelto.fechaFin= new Date();
}

//FUNCION LISTAR USUARIOS
function listarUsuarios() {
    /* var oVentana = open();
     oVentana.document.body.innerHTML = oBiblioteca.listadoUsuarios();*/
    open("popupUsuarios.html");
}

//FUNCION LISTAR ARTICULOS
function listarArticulos() {
    open("popupArticulos.html");
}


//FUNCION LISTAR PRESTAMOS POR FECHA
function listarPrestamos() {
    ocultarFormularios();
    top.frames[0].document.getElementById("listarPrestamosFecha").style.display = "block";
    top.frames[0].document.frmListarPrestamosFecha.reset();
}

//FUNCION LISTAR PRESTAMOS POR USUARIO
function listarPrestamosUsuario() {
    ocultarFormularios();
    top.frames[0].document.getElementById("listarPrestamosUsuario").style.display = "block";
    top.frames[0].document.frmListarPrestamosUsuario.reset();
}

//FUNCION LISTAR ARTICULOS POR TIPO
function listarArticulosPorTipo() {
    ocultarFormularios();
    top.frames[0].document.getElementById("listarArticulosPorTipo").style.display = "block";
    top.frames[0].document.frmListarArticulosPorTipo.reset();
}


//FUNCION ACEPTAR ALTA USUARIO
function aceptarAltaUsuario() {
    var oForm = top.frames[0].document.frmAltaUsuario;
    var sMensaje = "";
    var idUsuario = oForm.txtIdUsuario.value.trim();
    var sNombre = oForm.txtNombre.value.trim();
    var sApellidos = oForm.txtApellidos.value.trim();
    var iTelefono = parseInt(oForm.txtTelefono.value.trim());

    var oUsuario = new Usuario(idUsuario, sNombre, sApellidos, iTelefono);

    var sMensaje = oBiblioteca.altaUsuario(oUsuario);
    mensaje(sMensaje);
}

//FUNCION ACEPTAR ALTA ARTICULO
function aceptarAltaArticulo() {
    var oForm = top.frames[0].document.frmAltaArticulo;
    var sMensaje = "";
    if (oForm.rbtTipo.value == "libro") {
        var idArticulo = parseInt(oForm.txtIdArticulo.value.trim());
        var sTitulo = oForm.txtTitulo.value.trim();
        var sAutor = oForm.txtAutor.value.trim();
        var iPaginas = parseInt(oForm.txtPaginas.value.trim());

        var oLibro = new Libro(idArticulo, sTitulo, sAutor, iPaginas);

        // Agregar el Libro al objeto oBiblioteca
        sMensaje = oBiblioteca.altaArticulo(oLibro);
        añadirArticuloCombo(oLibro);
    }
    else { // Es DVD
        var idArticulo = parseInt(oForm.txtIdArticulo.value.trim());
        var sTitulo = oForm.txtTitulo.value.trim();
        var dFechaEstrenoForm = oForm.txtFechaEstreno.value.trim();
        var dFechaEstreno = convertirFecha(dFechaEstrenoForm);

        var bSubtitulada = oForm.subtitulada.checked;

        var oDVD = new DVD(idArticulo, sTitulo, dFechaEstreno, bSubtitulada);

        // Agregar el DVD al objeto oBiblioteca
        sMensaje = oBiblioteca.altaArticulo(oDVD);
        añadirArticuloCombo(oDVD);
    }
    mensaje(sMensaje);
}

function añadirArticuloCombo(oArticulo) {
    var articulo = top.frames[0].document.frmAltaPrestamo.listaArticulos;
    var i = articulo.length;
    var j = 0;
    var bEnc = false;

    // Busco por idArticulo
    while (j < articulo.length && bEnc == false) {
        var res = articulo[j].text.split(" ");
        if (res[1] == oArticulo.idArticulo) {
            bEnc = true;
        }
        j++;
    }

    if (bEnc == false) {
        if (oArticulo instanceof DVD) {
            articulo.options[i] = new Option("D " +oArticulo.idArticulo+ " " + oArticulo.titulo);
        }
        else {
            articulo.options[i] = new Option("L " +oArticulo.idArticulo+ " " + oArticulo.titulo);
        }
    }
}


//FUNCION ACEPTAR ALTA PRESTAMO
function aceptarAltaPrestamo() {
    var oForm = top.frames[0].document.frmAltaPrestamo;
    var sMensaje = "";

    var idPrestamo = parseInt(oForm.txtIdPrestamo.value.trim());
    var idUsuario = parseInt(oForm.txtIdUsuario.value.trim());


    lista = oForm.listaArticulos;
    var articulos = [];
    var j = 0;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].selected == true) {
            articulos[j] = lista[i].text;
            j++;
        }
    }

    var dFechaInicioForm = oForm.txtFechaInicio.value.trim();
    var dFechaInicio = convertirFecha(dFechaInicioForm);

    var dFechaFinForm = oForm.txtFechaFin.value.trim();
    var dFechaFin = convertirFecha(dFechaFinForm);

    var oPrestamo = new Prestamo(idPrestamo, idUsuario, articulos, dFechaInicio, dFechaFin);

    var sMensaje = oBiblioteca.altaPrestamo(oPrestamo);
    mensaje(sMensaje);
}

//FUNCION ACEPTAR DEVOLVER PRESTAMO
function aceptarDevolverPrestamo() {
    var oForm = top.frames[0].document.frmDevolverPrestamo;
    var sMensaje = "";
    var idPrestamo = parseInt(oForm.txtIdPrestamo.value.trim());
    var sMensaje = oBiblioteca.devolverPrestamo(idPrestamo);
    mensaje(sMensaje);
}


//FUNCION ACEPTAR LISTAR PRETAMOS POR FECHA
function aceptarListarPrestamosFecha() {
    var oForm = top.frames[0].document.frmListarPrestamosFecha;
    var sMensaje = "";
    var dFechaInicioForm = oForm.txtFechaInicio.value.trim();
    var dFechaInicio = convertirFecha(dFechaInicioForm);

    var dFechaFinForm = oForm.txtFechaFin.value.trim();
    var dFechaFin = convertirFecha(dFechaFinForm);


    var sMensaje = oBiblioteca.listadoPrestamosfecha(dFechaInicio,dFechaFin);

    var oCapa = top.frames[1][0].document.getElementById("capa");
    oCapa.innerHTML = sMensaje;
}

//FUNCION ACEPTAR LISTAR PRETAMOS DE USUARIO
function aceptarListarPrestamosUsuario() {
    var oForm = top.frames[0].document.frmListarPrestamosUsuario;
    var sMensaje = "";
    var idUsuario = parseInt(oForm.txtIdUsuario.value.trim());
    var sMensaje = oBiblioteca.listadoPrestamosUsuario(idUsuario);

    var oCapa = top.frames[1][0].document.getElementById("capa");
    oCapa.innerHTML = sMensaje;
}

//FUNCION ACEPTAR LISTAR TIPO DE ARTICULO
function aceptarListarArticulosPorTipo() {
    var oForm = top.frames[0].document.frmListarArticulosPorTipo;
    var sMensaje = "";
    var sTipo= oForm.rbtTipo.value.trim();
    var sMensaje = oBiblioteca.listadoArticulosTipo(sTipo);

    var oCapa = top.frames[1][0].document.getElementById("capa");
    oCapa.innerHTML = sMensaje;
}

function convertirFecha(dFecha) {
    var dia = dFecha.substring(0, 2);
    var mes = dFecha.substring(3, 5);
    var anno = dFecha.substring(6, 10);

    var fecha = new Date(anno, mes-1, dia);
    return fecha;
}

//FUNCION OCULTAR FORMULARIOS
function ocultarFormularios() {
    top.frames[0].document.getElementById("altaUsuario").style.display = "none";
    top.frames[0].document.getElementById("altaArticulo").style.display = "none";
    top.frames[0].document.getElementById("altaPrestamo").style.display = "none";
    top.frames[0].document.getElementById("devolverPrestamo").style.display = "none";
    top.frames[0].document.getElementById("listarPrestamosFecha").style.display = "none";
    top.frames[0].document.getElementById("listarPrestamosUsuario").style.display = "none";
    top.frames[0].document.getElementById("listarArticulosPorTipo").style.display = "none";
    var oCapa = top.frames[1][0].document.getElementById("capa");
    oCapa.innerHTML = "";
}

function mensaje(mensaje) {
    top.frames[0].document.getElementById("fondo").style.display="block";
    top.frames[0].document.getElementById("dentro").innerHTML=mensaje;
    top.frames[0].document.getElementById("dentro").innerHTML+="<br><br><input type='button' name='btnAceptar' onclick='volverMenu()' value='Aceptar'/>"
    var oForm= top.frames[1][1].document.frmMenu;
    oForm.btnAltaUsuario.disabled = ! oForm.btnAltaUsuario.disabled;
    oForm.btnAltaArticulo.disabled = ! oForm.btnAltaArticulo.disabled;
    oForm.btnAltaPrestamo.disabled = ! oForm.btnAltaPrestamo.disabled;
    oForm.btnDevolverPrestamo.disabled = ! oForm.btnDevolverPrestamo.disabled;
    oForm.btnListadoUsuarios.disabled = ! oForm.btnListadoUsuarios.disabled;
    oForm.btnListadoArticulos.disabled = ! oForm.btnListadoArticulos.disabled;
    oForm.btnListadoPrestamos.disabled = ! oForm.btnListadoPrestamos.disabled;
    oForm.btnListadoPrestamosUsuario.disabled = ! oForm.btnListadoPrestamosUsuario.disabled;
    oForm.btnListadoTipoArticulos.disabled = ! oForm.btnListadoTipoArticulos.disabled;
}