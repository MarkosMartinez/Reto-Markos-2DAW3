const opciones = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
async function actualizarTemperaturas(){
    //console.log("actualizarTemperaturas ejecutado");
    let ahora = new Date();
    let tiempoActual = ahora.toLocaleString('es-ES', opciones);
    ubicaciones = localStorage.getItem("seleccionadas");
    
    if(!ubicaciones || ubicaciones == null){

    }else{

        try {
            let respuesta = await fetch(laravelApi + "/api/tiempo-actual?ubicacion=" + ubicaciones, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
            });
            let data = await respuesta.json();
            //console.log(data);
            cardHtml = "";
            data.forEach(ubicacion => {
                cardHtml += `<div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card" style="color: #4B515D; border-radius: 35px;">
                  <div class="card-body p-4">
        
                    <div class="d-flex">
                      <h6 class="flex-grow-1"><b>${ubicacion["nombre"]}</b></h6>
                      <h6>${tiempoActual}</h6>
                    </div>
        
                    <div class="d-flex flex-column text-center mt-5 mb-4">
                      <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${ubicacion["temperatura"]}°C </h6>
                      <span class="small" style="color: #868B94">${obtenerClima(ubicacion["tiempo"])}</span>
                    </div>
        
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1" style="font-size: 1rem;">
                        <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${ubicacion["viento"]} km/h </span></div>
                        <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${ubicacion["humedad"]}% </span></div>
                        <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"> 0.2h </span></div>
                      </div>
                      <div>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="100px">
                      </div>
                    </div>
        
                  </div>
                </div>
              </div>`;
            });

            huecoCards.innerHTML = cardHtml;
        } catch (error) {
            console.error('Error:', error);

        }

    }
}

setInterval(() => {
    actualizarTemperaturas();
}, 15000);

const clima = {
  "Thunderstorm": "Tormenta",
  "Drizzle": "Llovizna",
  "Rain": "Lluvia",
  "Snow": "Nieve",
  "Mist": "Neblina",
  "Smoke": "Humo",
  "Haze": "Neblina",
  "Dust": "Polvo",
  "Fog": "Niebla",
  "Sand": "Arena",
  "Ash": "Ceniza",
  "Squall": "Chubasco",
  "Tornado": "Tornado",
  "Clear": "Despejado",
  "Clouds": "Nublado"
};


function obtenerClima(tiempo) {
  return clima[tiempo] || "Desconocido";
}