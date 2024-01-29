let elemento_arrastrandose;
function arrastrando(evento){
    //Guardarlo en una variable y luego vaciarla?
    
    //console.log("Arrastrando: " + evento.target.id);
    elemento_arrastrandose = evento.target.id;
}

function soltar(evento, soltado) {
    evento.preventDefault();
    //Esto sera mostrarDatos(dato, card)?

    //console.log("Soltado en: " + soltado.id);
    let ciudad = soltado.id.split("card_")[1];
    let id = ciudad + "_" + elemento_arrastrandose.split("dd_")[1];
    //console.log("Ciudad: " + ciudad + " / ID: " + id + " / elemento arrastrandose: " + elemento_arrastrandose.split("dd_")[1]);
    let elemento = document.getElementById(id);
    elemento.style.display = "block";
    let ls = localStorage.getItem("seleccionadas");
    let seleccionadasObj = JSON.parse(ls);
    seleccionadasObj.forEach((ciudadls) => {
        if (ciudadls.nombre == ciudad) {
            ciudadls[elemento_arrastrandose.split("dd_")[1]] = true;
        }
      });
    elemento_arrastrandose = null;
    localStorage.setItem("seleccionadas", JSON.stringify(seleccionadasObj));
    guardarLStorage();
}

function permitirSoltar(evento) {
    //Comprobar que pueda soltarlo
    evento.preventDefault();
  }

function comprobarDisponibilidad(dato, card){
    //con un switch, si el dato ya esta habilitado en la card, con un return de true o false?
}