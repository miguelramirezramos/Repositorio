// objeto Articulo
function Articulo(idArticulo, sTitulo) {
    this.idArticulo = idArticulo;
    this.titulo = sTitulo;
}

Articulo.prototype.toHTMLRow = function () {
    return "<td>" + this.idArticulo + "</td>" + "<td>" + this.titulo + "</td>";
}

// objeto Libro
function Libro(idArticulo, sTitulo, sAutor, iPaginas) {
    Articulo.call(this, idArticulo, sTitulo);
    // Articulo.apply(this, [ idArticulo, sTitulo] );
    this.autor = sAutor;
    this.paginas = iPaginas;
}

// Aqui es donde heredamos propiedades y metodos
Libro.prototype = Object.create(Articulo.prototype);
Libro.prototype.constructor = Libro;

Libro.prototype.toHTMLRow = function () {
    return "<td>" + this.idArticulo + "</td>" + "<td>" + this.titulo + "</td>" + "<td>" + this.autor + "</td>" + "<td>" + this.paginas + "</td>";
}

// objeto DVD
function DVD(idArticulo, sTitulo, dFechaEstreno, bSubtitulada) {
    Articulo.call(this, idArticulo, sTitulo);
    // Articulo.apply(this, [ idArticulo, sTitulo] );
    this.fechaEstreno = dFechaEstreno;
    this.subtitulada = bSubtitulada;
}

// Aqui es donde heredamos propiedades y metodos
DVD.prototype = Object.create(Articulo.prototype);
DVD.prototype.constructor = DVD;

DVD.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.idArticulo + "</td>";
    sFila += "<td>" + this.titulo + "</td>";
    sFila += "<td>" + this.fechaEstreno.getDate() + "/" + this.fechaEstreno.getMonth() + "/" + this.fechaEstreno.getFullYear() + "</td>";
    sFila += "<td>" + (this.subtitulada == true ? "SI" : "NO") + "</td>";
    return sFila;
}


// objeto Usuario
function Usuario(idUsuario, sNombre, sApellidos, iTelefono) {
    this.idUsuario = idUsuario;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
}

Usuario.prototype.toHTMLRow = function () {
    return "<td>" + this.idUsuario + "</td>" + "<td>" + this.nombre + "</td>" + "<td>" + this.apellidos + "</td>" + "<td>" + this.telefono + "</td>";
}


// objeto Prestamo
function Prestamo(idPrestamo, idUsuario, articulos, dFechaInicio, dFechaFin) {
    this.idPrestamo = idPrestamo;
    Usuario.call(this, idUsuario);
    this.articulos = articulos;
    this.fechaInicio = dFechaInicio;
    this.fechaFin = dFechaFin;
}

// Aqui es donde heredamos propiedades y metodos
Prestamo.prototype = Object.create(Usuario.prototype);
Prestamo.prototype.constructor = Prestamo;

Prestamo.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.idPrestamo + "</td>";
    sFila += "<td>" + this.idUsuario + "</td>";
    sFila += "<td>";
    var i = 0;
    while (i < this.articulos.length) {
        if (this.articulos[i] != false) {
            sFila += this.articulos[i] + "<br>";
        }
        i++;
    }
    sFila += "</td>";
    sFila += "<td>" + this.fechaInicio.getDate() + "/" + (this.fechaInicio.getMonth()+1) + "/" + this.fechaInicio.getFullYear() + "</td>";
    sFila += "<td>" + this.fechaFin.getDate() + "/" + (this.fechaFin.getMonth()+1) + "/" + this.fechaFin.getFullYear() + "</td>";
    return sFila;
}

// objeto Biblioteca
function Biblioteca() {
    this.usuarios = [];
    this.catalogo = [];
    this.prestamos = [];
}


Biblioteca.prototype.altaUsuario = function (oUsuario) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por idUsuario
    while (i < this.usuarios.length && bEnc == false) {
        if (this.usuarios[i].idUsuario == oUsuario.idUsuario) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc == true) {
        sMensaje = "Usuario ya registrado";
    }
    else {
        this.usuarios.push(oUsuario);
        sMensaje = "Usuario dado de alta";
    }

    return sMensaje;
}


Biblioteca.prototype.altaArticulo = function (oArticulo) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por idArticulo
    while (i < this.catalogo.length && bEnc == false) {
        if (this.catalogo[i].idArticulo == oArticulo.idArticulo) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc == true) {
        sMensaje = "Articulo ya registrado";
    }
    else {
        this.catalogo.push(oArticulo);
        sMensaje = "Articulo dado de alta";
    }

    return sMensaje;
}


Biblioteca.prototype.altaPrestamo = function (oPrestamo) {
    var i = 0;
    var j = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por idPrestamo
    while (i < this.prestamos.length && bEnc == false) {
        if (this.prestamos[i].idPrestamo == oPrestamo.idPrestamo) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc == true) {
        sMensaje = "Prestamo ya registrado";
    }

    else {
        while (j < this.prestamos.length && bEnc == false) {
            if (this.prestamos[j].idUsuario == oPrestamo.idUsuario) {
                bEnc = true;
            }
            j++;
        }

        var fechaActual = new Date();
        if (bEnc == true && this.prestamos[j-1].fechaFin > fechaActual) {
            sMensaje = "No puedes tener mas de un prestamo en vigor";
        }
        else {
            var i = 0;
            contLibros = 0;
            contDVDs = 0;
            while (i < oPrestamo.articulos.length) {
                if (oPrestamo.articulos[i].substring(0, 1) == "L") {
                    contLibros++;
                }
                else {
                    contDVDs++;
                }
                i++;
            }
            if (contLibros > 2) {
                sMensaje = "No puede tomar prestados mas de dos Libros";
            }
            else {
                if (contDVDs > 2) {
                    sMensaje = "No puede tomar prestados mas de dos DVDs";
                }
                else {
                    if(oPrestamo.fechaFin <= fechaActual){
                        sMensaje = "La fecha de fin de prestamo tiene que ser posterior a la fecha de inicio"
                    }
                    else{
                        this.prestamos.push(oPrestamo);
                        sMensaje = "Prestamo dado de alta";
                        actualizarCombo();
                    }
                }
            }
        }
    }
    return sMensaje;
}


Biblioteca.prototype.devolverPrestamo = function (idPrestamo) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por idPrestamo
    while (i < this.prestamos.length && bEnc == false) {
        if (this.prestamos[i].idPrestamo == idPrestamo) {
            // alert(this.prestamos[i].idUsuario);
            bEnc = true;
        }
        i++;
    }

    if (bEnc == true) {
        var fechaActual = new Date();
        if(fechaActual < this.prestamos[i-1].fechaFin){
            añadirArticuloDevueltoYActualizaFecha(this.prestamos[i - 1]);
            //poner la fecha actual al articulo devuelto
            sMensaje = "Prestamo devuelto";
        }
        else{
            sMensaje = "Este prestamo ya ha sido devuelto";
        }

    }
    else {
        sMensaje = "Este ID de prestamo no existe";
    }
    return sMensaje;
}


Biblioteca.prototype.listadoUsuarios = function () {
    var sListado = "<h3>Listado de Usuarios</h3>";
    var i = 0;
    // Creamos la tabla del listado
    sListado += '<table border="1">';
    sListado += '<tr><th>IdUsuario</th><th>Nombre</th><th>Apellidos</th><th>Telefono</th></tr>';

    for (i = 0; i < this.usuarios.length; i++) {
        sListado += '<tr>' + this.usuarios[i].toHTMLRow() + '</tr>';
    }

    sListado += '</table>';
    return sListado;
}

Biblioteca.prototype.listadoArticulos = function () {
    var sListado = "<h3>Listado de Articulos</h3>";
    var i = 0;
    // Creamos la tabla del listado
    sListado += '<table border="1">';
    sListado += '<tr><th colspan="4">Libros</th></tr>';
    sListado += '<tr><td><strong>IdArticulo</strong></td><td><strong>Titulo</strong></td><td><strong>Autor</strong></td><td><strong>Paginas</strong></td></tr>';

    for (i = 0; i < this.catalogo.length; i++) {
        if (this.catalogo[i] instanceof Libro) {
            sListado += '<tr>' + this.catalogo[i].toHTMLRow() + '</tr>';
        }
    }

    sListado += '<tr><th colspan="4">DVD</th></tr>';
    sListado += '<tr><td><strong>IdArticulo</strong></td><td><strong>Titulo</strong></td><td><strong>Fecha</strong></td><td><strong>Subtitulos</strong></td></tr>';


    for (i = 0; i < this.catalogo.length; i++) {
        if (this.catalogo[i] instanceof DVD) {
            sListado += '<tr>' + this.catalogo[i].toHTMLRow() + '</tr>';
        }
    }

    sListado += '</table>';
    return sListado;
}

Biblioteca.prototype.listadoPrestamosfecha = function (dFechaInicio,dFechaFin) {
    var sListado = "<h3>Listado de Prestamos</h3>";
    var i = 0;
    var nada=0;
    // Creamos la tabla del listado
    sListado += '<table border="1">';
    sListado += '<tr><th>IdPrestamo</th><th>IdUsuario</th><th>Articulos</th><th>FechaInicio</th><th>FechaFin</th></tr>';

    for (i = 0; i < this.prestamos.length; i++) {
        if(dFechaInicio<this.prestamos[i].fechaInicio && dFechaFin>this.prestamos[i].fechaFin){
            sListado += '<tr>' + this.prestamos[i].toHTMLRow() + '</tr>';
            nada++;
        }
    }

    sListado += '</table>';


    if(dFechaInicio >= dFechaFin){
        mensaje("La fecha de inicio no puede ser posterior a la fecha de fin.");
        sListado="";
        return sListado;
    }
    else{
        if(nada==0){
            sListado = "<h3>No hay prestamos entre esas fechas.</h3>";
        }
        return sListado;
    }
}


Biblioteca.prototype.listadoPrestamosUsuario = function (idUsuario) {
    var sListado = "<h3>Listado de Prestamos del Usuario "+idUsuario+"</h3>";
    var i = 0;
    // Creamos la tabla del listado
    sListado += '<table border="1">';
    sListado += '<tr><th>IdPrestamo</th><th>IdUsuario</th><th>Articulos</th><th>FechaInicio</th><th>FechaFin</th></tr>';

    for (i = 0; i < this.prestamos.length; i++) {
        if(this.prestamos[i].idUsuario==idUsuario)
        sListado += '<tr>' + this.prestamos[i].toHTMLRow() + '</tr>';
    }

    sListado += '</table>';
    return sListado;
}


Biblioteca.prototype.listadoArticulosTipo = function (sTipo) {
    var sListado = "<h3>Listado de Articulos</h3>";
    var i = 0;
    // Creamos la tabla del listado
    sListado += '<table border="1">';
    if(sTipo=="libro"){
        sListado += '<tr><th colspan="4">Libros</th></tr>';
        sListado += '<tr><td><strong>IdArticulo</strong></td><td><strong>Titulo</strong></td><td><strong>Autor</strong></td><td><strong>Paginas</strong></td></tr>';

        for (i = 0; i < this.catalogo.length; i++) {
            if (this.catalogo[i] instanceof Libro) {
                sListado += '<tr>' + this.catalogo[i].toHTMLRow() + '</tr>';
            }
        }
    }

    else{
        sListado += '<tr><th colspan="4">DVD</th></tr>';
        sListado += '<tr><td><strong>IdArticulo</strong></td><td><strong>Titulo</strong></td><td><strong>Fecha</strong></td><td><strong>Subtitulos</strong></td></tr>';

        for (i = 0; i < this.catalogo.length; i++) {
            if (this.catalogo[i] instanceof DVD) {
                sListado += '<tr>' + this.catalogo[i].toHTMLRow() + '</tr>';
            }
        }
    }

    sListado += '</table>';
    return sListado;
}
