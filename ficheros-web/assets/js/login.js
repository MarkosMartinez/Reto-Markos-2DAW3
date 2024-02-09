var comprobandoLogin = false;

if (localStorage.getItem("token")) {
    comprobandoLogin = true;
    btn_login.style.opacity = 0.5;
    btn_login.disabled = true;
    lbl_checksesion.style.display = "block";

    async function comprobar_login() {
        // logueo_correcto();
        // lbl_checksesion.style.display = "none";
        // btn_login.disabled = false;
        if (await comprobar_token(localStorage.getItem("token"))) {
            logueo_correcto();
            lbl_checksesion.style.display = "none";
            btn_login.disabled = false;
            btn_login.style.opacity = 1;
        } else {
            cerrar_sesion(1);
            logueo_incorrecto();
            btn_login.disabled = false;
            btn_login.style.opacity = 1;
            lbl_checksesion.style.display = "none";
        }
    }
    comprobar_login();
    comprobandoLogin = false;
}

function cambiarauth(tipo) {
    if (tipo == 1) {
        form_login.style.display = "none";
        form_registro.style.display = "block";
    } else if (tipo == 0) {
        form_login.style.display = "block";
        form_registro.style.display = "none";
    }
}

async function comprobar_token(token) {
    try {
        let respuesta = await fetch(laravelApi + "/api/comprobar-token", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + token
            }
        });
        let data = await respuesta.text();
        if (data == 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
    return false;
}

async function loguearse(correo, contrasena) {
    var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo) || contrasena == null || !contrasena) {
        logueo_incorrecto();
    }
    btn_login.disabled = true;
    try {
        let respuesta = await fetch(laravelApi + "/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: correo,
                password: contrasena
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let data = await respuesta.json();
        console.log(data);
        if (data["success"]) {
            localStorage.setItem("token", data["data"]["token"]);
            logueo_correcto();
        } else {
            logueo_incorrecto();
        }
    } catch (error) {
        console.error('Error:', error);
        logueo_incorrecto();
    }
    btn_login.disabled = false;
}

async function registrarse(nombre, correo, contrasena, confirmar_contrasena) {
    var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo) || contrasena != confirmar_contrasena || !contrasena) {
        registro_incorrecto();
    }
    btn_registro.disabled = true;
    try {
        let respuesta = await fetch(laravelApi + "/api/register", {
            method: "POST",
            body: JSON.stringify({
                name: nombre,
                email: correo,
                password: contrasena,
                c_password: confirmar_contrasena
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let data = await respuesta.json();
        console.log(data);
        if (data["success"]) {
            localStorage.setItem("token", data["data"]["token"]);
            logueo_correcto();
        } else {
            registro_incorrecto();
        }
    } catch (error) {
        console.error('Error:', error);
        registro_incorrecto();
    }
    btn_registro.disabled = false;
}

async function logueo_correcto() {
    form_login.style.display = "none";
    form_registro.style.display = "none";
    contenido.style.display = "block";
    login_incorrecto.style.display = "none";
    register_incorrecto.style.disabled = "none";
    btn_cerrar_sesion.style.display = "block";
    logo.style.display = "block";
    navmovil.style.visibility = "visible";
    correo_login.value = "";
    contrasena_login.value = "";
    nombre_registro.value = "";
    correo_registro.value = "";
    contrasena_registro.value = "";
    confirmar_contrasena_registro.value = "";
    contrasena_registro.value = "";
    if (localStorage.getItem("seleccionadas") == null || localStorage.getItem("seleccionadas") == "" || localStorage.getItem("seleccionadas")  == [])
        await obtenerLStorage();

    inicializarMapa();
    actualizarTemperaturas();
    actualizarGrafico();
}

function logueo_incorrecto() {
    login_incorrecto.style.display = "block";
    contrasena_login.value = "";
}
function registro_incorrecto() {
    register_incorrecto.style.display = "block";
    contrasena_registro.value = "";
    confirmar_contrasena_registro.value = "";
}

async function cerrar_sesion(tipo=0) {
    let token_anterior = localStorage.getItem("token");
    form_login.style.display = "block";
    contenido.style.display = "none";
    btn_cerrar_sesion.style.display = "none";
    logo.style.display = "none";
    navmovil.style.visibility = "hidden";
    localStorage.clear();
    localStorage.clear();
    if(tipo == 0){
    try {
        await fetch(laravelApi + "/api/logout", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + token_anterior
            }
        });
    } catch (error) {
        console.error('Error en el logout:', error);
    }
    }
    token_anterior = "";
}

function verpass(modo = 1){
    let ojos = document.getElementsByClassName("password");
    if(modo == 1){
        if(contrasena_login.type == "password"){
            contrasena_login.type = "text";
            ojos[0].src = "assets/img/iconos/ojotapado.svg"
        }else{
            contrasena_login.type = "password";
            ojos[0].src = "assets/img/iconos/ojo.svg"
        }
    }else if(modo == 0){
        if(contrasena_registro.type == "password"){
            contrasena_registro.type = "text";
            confirmar_contrasena_registro.type = "text";
            ojos[1].src = "assets/img/iconos/ojotapado.svg"
            ojos[2].src = "assets/img/iconos/ojotapado.svg"
        }else{
            contrasena_registro.type = "password";
            confirmar_contrasena_registro.type = "password";
            ojos[1].src = "assets/img/iconos/ojo.svg"
            ojos[2].src = "assets/img/iconos/ojo.svg"
        }

    }
}