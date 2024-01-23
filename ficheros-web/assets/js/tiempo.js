pronosticoMañana = [];
obtenerPronosticoManana();


const opciones = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };
async function actualizarTemperaturas() {
  ubicaciones = localStorage.getItem("seleccionadas");

  if (ubicaciones == "null") {

  } else {

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
        $(`.${ubicacion["nombre"]}`).tooltip("dispose");

        let ultima_actualizacion = new Date(ubicacion["ultima_actualizacion"]);
        let temperatura = ubicacion["temperatura"];
        let t_real = false;
        if (temperatura == ubicacion["temperatura_real"]) {
          t_real = true;
          temperatura = ubicacion["temperatura_real"];
        }

        cardHtml += `<div class="col-lg-6 col-md-6 col-sm-12 ${ubicacion["nombre"]}" title='Temperatura mañana: ${pronosticoMañana.find(ubiPronostico => ubiPronostico.ciudad == ubicacion["nombre"].toLowerCase()) ? pronosticoMañana.find(ubiPronostico => ubiPronostico.ciudad == ubicacion["nombre"].toLowerCase()).temperatura.toFixed(2) : "No disponible"}'>
                <div class="card" style="color: #4B515D; border-radius: 35px;">
                  <div class="card-body p-4">
        
                    <div class="d-flex">
                      <h6 class="flex-grow-1"><b>${ubicacion["nombre"]}</b></h6>
                      <h6>${ultima_actualizacion.toLocaleDateString('es-ES', opciones)}</h6>
                    </div>
        
                    <div class="d-flex flex-column text-center mt-5 mb-4">
                      <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;">${t_real ? '<u>' + temperatura + '°C</u>' : temperatura + '°C'}</h6>
                      <span class="small" style="color: #868B94">${obtenerClima(ubicacion["tiempo"])}</span>
                    </div>
        
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1" style="font-size: 1rem;">
                        <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${ubicacion["viento"]} km/h </span></div>
                        <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${ubicacion["humedad"]}% </span></div>
                        <div><i class="fa-solid fa-thermometer" style="color: #868B94;"></i> <span class="ms-1"> ${ubicacion["sensacion_termica"] ?? "--"}ºC </span></div>
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
      data.forEach(ubicacion => {
        $(`.${ubicacion["nombre"]}`).tooltip();
      });
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
  return clima[tiempo] || "Tiempo Desconocido";
}

function addCardLoading() {
  huecoCards.innerHTML += `<div class="col-lg-6 col-md-6 col-sm-12">
  <div class="card" style="color: #4B515D; border-radius: 35px;">
    <div class="card-body p-4">
      <div class="d-flex">
        <h6 class="flex-grow-1"><b>Cargando...</b></h6>
        <h6>Cargando...</h6>
      </div>
      <div class="d-flex flex-column text-center mt-5 mb-4">
        <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> -- °C </h6>
        <span class="small" style="color: #868B94">Cargando...</span>
      </div>
      <div class="d-flex align-items-center" style="padding-bottom: 15px">
        <div class="flex-grow-1" style="font-size: 1rem;">
          <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> --km/h </span></div>
          <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> --% </span></div>
          <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"> --h </span></div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

async function obtenerPronosticoManana() {
  let fecha = new Date();
  let fechaDesde = `${fecha.getFullYear()}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getDate().toString().padStart(2, '0')}`;
  fecha.setDate(fecha.getDate() + 1);
  let fechaHasta = `${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}`;

  let urls = [`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/hondarribia/forecast/at/${fechaDesde}/for/${fechaHasta}`, `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/errenteria/forecast/at/${fechaDesde}/for/${fechaHasta}`, `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${fechaDesde}/for/${fechaHasta}`, `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/at/${fechaDesde}/for/${fechaHasta}`];

  for (let i = 0; i < urls.length; i++) {
    try {
      let respuesta = await fetch(urls[i], {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "Bearer " + tokenEuskalmet
        },
      });
      let data = await respuesta.json();
      //console.log(data["temperature"]["value"]);
      pronosticoMañana.push({ ciudad: data["regionZoneLocation"]["regionZoneLocationId"], temperatura: data["temperature"]["value"] });


    } catch (error) {
      console.error('Error:', error);
    }
  }

}