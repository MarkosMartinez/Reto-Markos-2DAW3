        if(sessionStorage.getItem("token")){
            lbl_checksesion.style.display = "block";
            btn_login.disabled = true;

            async function comprobar_login(){
                logueo_correcto();
                lbl_checksesion.style.display = "none";
                btn_login.disabled = false;
            // if(await comprobar_token(sessionStorage.getItem("token"))){
            //     logueo_correcto();
            //     lbl_checksesion.style.display = "none";
            //     btn_login.disabled = false;
            // }else{
            //     cerrar_sesion();
            //     logueo_incorrecto();
            //     lbl_checksesion.style.display = "none";
            //     btn_login.disabled = false;
            // }
        }
            comprobar_login();
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

        async function comprobar_token(token){
            try {
                let respuesta = await fetch(laravelApi + "/api/comprobar-token", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": "Bearer " + token
                    }
                });
                let data = await respuesta.text();
                if(data == 1){
                    return true;
                }else{
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
                if(data["success"]){
                    sessionStorage.setItem("token", data["data"]["token"]);
                    logueo_correcto();
                }else{
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
                if(data["success"]){
                    sessionStorage.setItem("token", data["data"]["token"]);
                    logueo_correcto();
                }else{
                    registro_incorrecto();
                }
            } catch (error) {
                console.error('Error:', error);
                registro_incorrecto();
            }
            btn_registro.disabled = false;
        }

        async function logueo_correcto(){
            form_login.style.display = "none";
            form_registro.style.display = "none";
            contenido.style.display = "block";
            login_incorrecto.style.display = "none";
            register_incorrecto.style.disabled = "none";
            btn_cerrar_sesion.style.display = "block";
            correo_login.value = "";
            contrasena_login.value = "";
            nombre_registro.value = "";
            correo_registro.value = "";
            contrasena_registro.value = "";
            confirmar_contrasena_registro.value = "";
            contrasena_registro.value = "";
            if(localStorage.getItem("seleccionadas") == null)
            await obtenerLStorage();
        
            inicializarMapa();
            actualizarTemperaturas();
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
            contenido.style.display = "none";
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
