function arrastrando(evento){
    //Guardarlo en una variable y luego vaciarla?
    console.log("Arrastrando: " + evento.target.id);
}

function soltar(evento, soltado) {
    evento.preventDefault();
    //Esto sera mostrarDatos(dato, card)?
    console.log("Soltado en: " + soltado.id);
    // var data = evento.dataTransfer.getData("text");
    // evento.target.appendChild(document.getElementById(data));
}

function permitirSoltar(evento) {
    //Comprobar que pueda soltarlo
    evento.preventDefault();
  }

function comprobarDisponibilidad(dato, card){
    //con un switch, si el dato ya esta habilitado en la card, con un return de true o false?
}