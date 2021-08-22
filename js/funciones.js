$(document).ready(function () {
    $(".nav-btn-hidden").click(function (e) { 
        e.preventDefault();
        $(".nav-menu").css("display","flex");
        $(".nav-menu-left").css("display", "flex");
    });
    //Función del botón registrar
    $("#btn_registrar").click(function (e) { 
        registrarPersona()
        $("#message").addClass("message-sucess").text("Se ha registrado con existo");
    });
    //Funcion volver al inicio
    $(".btn_container").click(function (e) { 
        e.preventDefault();
        location.href = "log_in.html"
    });
    //Función del botón login
    $("#btn_logear").click(function (e) { 
        const email = $("#email_login").val();
        const password = $("#password_login").val();
        const rol = $("#rol_login").val();
        let comeData = JSON.parse(localStorage.getItem("Usuarios registrador"))
        for (let i = 0; i < comeData.length; i++) {
            const element = comeData[i];
            if (email === element.email && password === element.password && rol === element.rol) {
                redirectionPage(rol)
                $("#message_login").removeClass("message-error").addClass("message-sucess").text("¡Se ha logueado correctamente!");
                break;
            }else{
                $("#message_login").removeClass("message-sucess").addClass("message-error").text('Ese usuario no existe. ¡Por favor valla a registrarse! Lo vamos a redirrecionar en momento');;
                setInterval(() => {
                    window.location.href="sing_up.html"
                }, 2750);
                
            }
        }  
    });
    //Pequeños detalles
    function nombreExpediente() {
        let obtenerDatos = JSON.parse(localStorage.getItem("Usuarios registrador"))
        obtenerDatos.forEach(element => {
            if (element.rol === "Usuario") {
                $("#nombre_usuario1").text(element.fullName);
                $("#nombre_usuario2").text(element.fullName);
                $("#id_login").text(element.id);
                $("#tele1_login").text(element.phone1);
                $("#tele2_login").text(element.phone2);
                $("#email_login").text(element.email);
                $("#dire_login").text(element.direccion);
            }
        });
        
    }
    nombreExpediente();
    //Cargar datos en el expendiente
    function cargarDatosExpediente() {
        let obtenerDatos  =  JSON.parse(localStorage.getItem("Guardar_Cita")) ||[]
        obtenerDatos.forEach(element => {
            $("#tbl_expediente").append(`<tr><td>${element.date}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${element.servicio}</td><td>${element.consultorio}</td></tr>`);
        });
    }
    cargarDatosExpediente()
    //Combobox de solicitar cita
    $("#solicitar_servicio").change(function (e) { 
        e.preventDefault();
        const valueServicio =  $("#solicitar_servicio").val();
        const dateCita = $("#date_cita").val();
        //Cargar Especialistas
        if (valueServicio ==="Medicina General") {
            const arrayMedicinaGeneral = [{hora:"03:00pm",nombre:"Manuel Turizo Román",consultorio:"2"},{hora:"03:30pm",nombre:"José Manuel Gómez Pérez",consultorio:"1"},{hora:"05:30pm",nombre:"Karla Espinoza Obando",consultorio:"3"} ]
                arrayMedicinaGeneral.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td><td><button class="btn-table" tabindex="35">Agregar Cita</button></td></tr>`);
                });     
            agregarCitaTable()              
        }else{
            $("tbody").empty();
        }
        
        if (valueServicio === "Cirugía Ambulatoria") {
            const arrayCirguiaAmbulatorioa = [{hora:"05:00pm",nombre:"Tiffanny Valeria Avila Vega",consultorio:"4"},{hora:"06:30pm",nombre:"Nilson Bermudez Gomez",consultorio:"5"},{hora:"07:30pm",nombre:"Itzel Carranza Cedeño",consultorio:"6"} ]
                arrayCirguiaAmbulatorioa.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio === "Nutrición") {
            const arrayNutricion = [{hora:"03:00pm",nombre:"Edric Gonzalez Peña",consultorio:"7"},{hora:"04:30pm",nombre:"Jhio Bonilla Arauz",consultorio:"8"},{hora:"05:30pm",nombre:"José  Membreño Carranza",consultorio:"6"} ]
                arrayNutricion.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio == "Psicología") {
            const array = [{hora:"03:00pm",nombre:"Mariana Calderon Rodriguez",consultorio:"10"},{hora:"05:30pm",nombre:"Daniel Moncada Perez",consultorio:"11"},{hora:"85:30pm",nombre:"Ronny Ledezma Vazquez",consultorio:"6"} ]
                array.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio == "Psiquitria") {
            const array = [{hora:"01:00pm",nombre:"Mariana Calderon Rodriguez",consultorio:"13"},{hora:"05:30pm",nombre:"Daniel Moncada Perez",consultorio:"14"},{hora:"05:30pm",nombre:"Ronny Ledezma Vazquez",consultorio:"15"} ]
                array.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio == "Ortopedia") {
            const array = [{hora:"04:00pm",nombre:"Joshua Mora Castro",consultorio:"16"},{hora:"04:30pm",nombre:"Maygel Aguirre Azofeifa",consultorio:"17"},{hora:"05:30pm",nombre:"Naomy Bonilla Arauz",consultorio:"18"} ]
                array.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio == "Fisioterapia") {
            const array = [{hora:"02:00pm",nombre:"Josbel Herrera Obando",consultorio:"19"},{hora:"03:30pm",nombre:"Adalberto Martinez Morales",consultorio:"20"},{hora:"04:30pm",nombre:"Genesis Quintero Vargas",consultorio:"21"} ]
                array.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio == "Cardiología") {
            const array = [{hora:"03:00pm",nombre:"Mareth Morales Rodriguez",consultorio:"22"},{hora:"06:30pm",nombre:"Daniela Guiterrez Valverde",consultorio:"23"},{hora:"08:30pm",nombre:"Katherine Carrión Jimenez",consultorio:"24"} ]
                array.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        if (valueServicio == "Laboratorio") {
            const array = [{hora:"01:00pm",nombre:"Samira Perez Torres",consultorio:"1"},{hora:"05:30pm",nombre:"Manuel Elizondo Gomez",consultorio:"2"},{hora:"05:30pm",nombre:"Daphne Loria Martinez",consultorio:"3"} ]
                array.forEach(element => {
                    $("#table_cita>tbody").append(`<tr><td>${dateCita}</td><td>${element.hora}</td><td>${element.nombre}</td><td>${valueServicio}</td><td>${element.consultorio}</td>
                <td><button class="btn-table" tabindex="35"><a href="expendiente.html">Agregar Cita</a></button></td></tr>`);
                });
                agregarCitaTable()  
        }
        // alert(valueServicio)
    });
    //Función de redirreciones de páginas
    function redirectionPage(rol) {
        switch (rol) {
            case "Administrador":
                window.location.pathname= `/views/${rol}.html`
                break;
            case "Soporte":
                window.location.pathname= `/views/${rol}.html`
                break;
            case "Operaciones":
                window.location.pathname= `/views/${rol}.html`
                break;
            default:
                window.location.pathname= `/views/expendiente.html`
                break;
        }
    }
   //Agregar cita de una tabla
   function agregarCitaTable() {
       //Funión de btn_table para agregar cita
    $(".btn-table").click(function (e) { 
        e.preventDefault();
        $("tr").click(function (e) {    
            e.preventDefault();
            let arrayCita=JSON.parse(localStorage.getItem("Guardar_Cita")) || [];
            const objectResult = {date:e.currentTarget.cells[0].innerText,
            hora: e.currentTarget.cells[1].innerText,
            nombre:e.currentTarget.cells[2].innerText,
            servicio: e.currentTarget.cells[3].innerText,
            consultorio: e.currentTarget.cells[4].innerText}
            arrayCita.push(objectResult)
            let arrayJson = JSON.stringify(arrayCita)
            localStorage.setItem("Guardar_Cita", arrayJson)
            console.log(arrayJson)
        });
        window.location.href= `/views/expendiente.html`
    }); 
   }
    //Funcion registrar persona
    function registrarPersona() {
        let arrayRegistrar = JSON.parse(localStorage.getItem("Usuarios registrador")) || [];
        const fullName =  $("#full_name").val();
        const id = $("#cedula").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const phone1 = $("#telefono1").val();
        const phone2 = $("#telefono2").val();
        const direccion = $("#direccion").val();
        const detalles = $("#detalles").val();
        const rol = $("#rol").val();
        let objectRegistrar = {fullName,id,email,password,phone1,phone2,direccion,detalles,rol}
        console.log(objectRegistrar)
        arrayRegistrar.push(objectRegistrar)
        let arrayJson = JSON.stringify(arrayRegistrar)
        localStorage.setItem("Usuarios registrador", arrayJson)
        vaciarFormularios();
    }
    //Funcion vaciarFormulario
    function vaciarFormularios() {
        $("#file").val("");
        $("#full_name").val(" "); 
        $("#cedula").val(" ");
        $("#email").val(" ");
        $("#password").val("");
        $("#passConfirm").val("");
        $("#telefono1").val(" ");
        $("#telefono2").val(" ");
        $("#direccion").val(" ");
        $("#detalles").val(" ");
        $("#rol").val(" ");
        $("#email_login").val(" ");
        $("#password_login").val("");
        $("#rol_login").val(" ");
    }
});