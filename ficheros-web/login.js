const laravelApi = "http://localhost:81";

        if(sessionStorage.getItem("token")){
            //Comprobar login!
            logueo_correcto();
        }

        function cambiarauth(tipo){
            if(tipo == 1){
                form_login.style.display = "none";
                form_registro.style.display = "block";
            }else if (tipo == 0){
                form_login.style.display = "block";
                form_registro.style.display = "none";
            }
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
                if(data["success"]){
                    sessionStorage.setItem("token", data["data"]["token"]);
                    logueo_correcto();
                }else{
                    logueo_incorrecto();
                }
            } catch (error) {
                console.error('Error:', error);
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
                if(data["success"]){
                    sessionStorage.setItem("token", data["data"]["token"]);
                    logueo_correcto();
                }else{
                    registro_incorrecto();
                }
            } catch (error) {
                console.error('Error:', error);
            }
            btn_registro.disabled = false;
        }

        function logueo_correcto(){
            form_login.style.display = "none";
            form_registro.style.display = "none";
            mapa.style.display = "block";
            login_incorrecto.style.display = "none";
            register_incorrecto.style.disabled = "none";
            btn_cerrar_sesion.style.display = "block";
            correo_login.value = "";
            contrasena_login.value = "";
            correo_registro.value = "";
            contrasena_registro.value = "";

            console.log("Tu Token es: " + sessionStorage.getItem("token"));
        }

        function logueo_incorrecto(){
            login_incorrecto.style.display = "block";
        }
        function registro_incorrecto(){
            register_incorrecto.style.display = "block";
        }

        async function cerrar_sesion(){
            let token_anterior = sessionStorage.getItem("token");
            form_login.style.display = "block";
            mapa.style.display = "none";
            btn_cerrar_sesion.style.display = "none";
            sessionStorage.clear();
            localStorage.clear();
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
            token_anterior = "";
        }
