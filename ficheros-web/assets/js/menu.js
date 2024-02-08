function cambiartab(tab){
    let mapapanel = document.getElementById("mapa-tabpanel");
    let datospanel = document.getElementById("datos-tabpanel");
    let estadisticaspanel = document.getElementById("estadisticas-tabpanel")

    //FIXME Hacer que por defecto se ponga en mapa y que el tab tambien cambie el active
    switch (tab) {
        case "mapa":
            mapapanel.style.display = "block";
            datospanel.style.display = "none";
            estadisticaspanel.style.display = "none";

            navmapa.style.opacity = "1"
            navtemperaturas.style.opacity = "0.5"
            navestadisticas.style.opacity = "0.5"
            break;
        case "temperaturas":
            mapapanel.style.display = "none";
            datospanel.style.display = "block";
            estadisticaspanel.style.display = "none";

            navmapa.style.opacity = "0.5"
            navtemperaturas.style.opacity = "1"
            navestadisticas.style.opacity = "0.5"
            break;
        case "estadisticas":
            mapapanel.style.display = "none";
            datospanel.style.display = "none";
            estadisticaspanel.style.display = "block";

            navmapa.style.opacity = "0.5"
            navtemperaturas.style.opacity = "0.5"
            navestadisticas.style.opacity = "1"
            break;
    
        default:
            cerrar_sesion();
            break;
    }
}