let elemento_arrastrandose;
function arrastrando(evento){
    //Guardarlo en una variable y luego vaciarla?
    
    //console.log("Arrastrando: " + evento.target.id);
    elemento_arrastrandose = evento.target.id;
}

function soltar(evento, soltado) {
    evento.preventDefault();

    if(elemento_arrastrandose.includes("card_")){
        eliminarElemento(soltado);
    }else{
        añadirElemento(soltado);
    }
    elemento_arrastrandose = null;
    guardarLStorage();
}

function permitirSoltar(evento) {
    //Comprobar que pueda soltarlo
    if ((evento.target.id.includes("dd_borrar") && elemento_arrastrandose.includes("card_")) ||
    (!evento.target.id.includes("dd_borrar") && elemento_arrastrandose.includes("dd_")))
    evento.preventDefault();
  }

function añadirElemento(soltado){
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
localStorage.setItem("seleccionadas", JSON.stringify(seleccionadasObj));
}

function eliminarElemento(soltado){
    //console.log("Soltado en: " + soltado.id);
    if (soltado.id != "dd_borrar") return;
    let datos = elemento_arrastrandose.split("card_")[1];
    let item = datos.split("-")[0];
    let ciudad = datos.split("-")[1];
    //console.log("Item: " + item + " / Ciudad: " + ciudad);
    let id = ciudad + "_" + item;
    let elemento = document.getElementById(id);
    elemento.style.display = "none";
    let ls = localStorage.getItem("seleccionadas");
    let seleccionadasObj = JSON.parse(ls);
    seleccionadasObj.forEach((ciudadls) => {
        if (ciudadls.nombre == ciudad) {
            ciudadls[item] = false;
        }
      });
    
    localStorage.setItem("seleccionadas", JSON.stringify(seleccionadasObj));
    }

    function vaciarDragAndDrop(){
        console.log("vaciando...");

        let ls = localStorage.getItem("seleccionadas");
        let seleccionadasObj = JSON.parse(ls);
        seleccionadasObj.forEach((ciudadls) => {
                ciudadls["viento"] = false;
                ciudadls["sensacion_termica"] = false;
                ciudadls["presion"] = false;
          });
          localStorage.setItem("seleccionadas",  JSON.stringify(seleccionadasObj));
          guardarLStorage();
          actualizarTemperaturas();
    }