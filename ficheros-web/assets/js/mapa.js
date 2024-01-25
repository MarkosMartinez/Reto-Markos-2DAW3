// Obtener las temperaturas de "lugares" para ponerlos en el tooltip
var map;
var lugares;


async function inicializarMapa() {
  lugares = await obtenerLugares();
  if (!pronosticoMañana) await obtenerPronosticoManana();
  cargarMapa();
}

async function obtenerLugares() {
  try {
    let respuesta = await fetch(laravelApi + "/api/obtener-las-ubicaciones", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    let data = await respuesta.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    //En caso de error, devolver ubicaciones por defecto
    return [
      { "nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896 },
      { "nombre": "Hondarribia", "latitud": 43.36883, "longitud": -1.79369 },
      { "nombre": "Donostia", "latitud": 43.3183, "longitud": -1.9812 },
      { "nombre": "Errenteria", "latitud": 43.3119, "longitud": -1.8985 },
      { "nombre": "Bilbao", "latitud": 43.2641, "longitud": -2.9493 },
    ];
  }
}

function cargarMapa() {
  if (!map) {

    // Inicializar el mapa y establecer las coordenadas y el nivel de zoom
    map = L.map('contMapa').setView([43.338, -1.788], 12);
    // Añadir una capa de tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    var marker = "";
    lugares.forEach(lugar => {
      marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
      // pronosticoMañana.forEach(pronostico => {
      //   if(pronostico["ciudad"] == lugar.nombre.toLowerCase()){
      //     marker.bindTooltip("Temperatura Mañana: " + pronostico["temperatura"].toFixed(2) + "ºC");
      //   }
      // });
      marker.bindTooltip(lugar.nombre);

      let seleccionadasObj = JSON.parse(localStorage.getItem("seleccionadas"));
      if (seleccionadasObj && Object.keys(seleccionadasObj).length > 0) {
        seleccionadasObj.forEach(ubicacion => {
          if (ubicacion.nombre == lugar.nombre) {
            marker._icon.classList.add('seleccionado');
          }

        });
        
      }

      marker.on('click', function () {
        this._icon.classList.toggle('seleccionado');
        console.log('Ubicacion clickada: ' + lugar.nombre);
        ubicacionSeleccionada(lugar.nombre);
      })
      // map.on('click', function(e){
      //   var coord = e.latlng;
      //   var lat = coord.lat;
      //   var lng = coord.lng;
      //   console.log("Has clickado en la latitud: " + lat + " y longitud: " + lng);
      //   });
    });
  }
}

function ubicacionSeleccionada(nombre) {
  let seleccionadas = localStorage.getItem("seleccionadas");
  
  if (seleccionadas == null || seleccionadas == "null" || seleccionadas == "" || seleccionadas == []) {
    const primeraUbicacion = {
      [nombre]: {
        viento: false,
        sensacionTermica: false
      }
    };
    localStorage.setItem("seleccionadas", JSON.stringify(primeraUbicacion));
    addCardLoading();
  } else {
    let seleccionadasObj = JSON.parse(seleccionadas);
    let encontradoIndex = -1;
    seleccionadasObj.forEach((ubicacion, index) => {
      if (ubicacion.nombre == nombre) {
        encontradoIndex = index;
        $("." + nombre).tooltip("dispose");
      }
    });
    if (encontradoIndex != -1) {
      seleccionadasObj.splice(encontradoIndex, 1);
    }else{
      //FIXME Arreglar esto y tiempo js 10: "TypeError: JSON.parse(...) is null" cuando no hay seleccion
      let nuevaSeleccion = {
          nombre: nombre,
          viento: false,
          sensacionTermica: false
      };
      seleccionadasObj.push(nuevaSeleccion);
      addCardLoading();
    }
    encontradoIndex = -1;
    localStorage.setItem("seleccionadas", JSON.stringify(seleccionadasObj));
  }

  guardarLStorage();
  actualizarTemperaturas();
}


async function guardarLStorage() {
  try {
    let seleccionadas = localStorage.getItem("seleccionadas");
    if (!(seleccionadas == null || seleccionadas == "")) {
      let seleccionadasObj = JSON.parse(seleccionadas);
      let ubicacionesConInfo = Object.entries(seleccionadasObj).map(([nombre, info]) => ({ nombre, ...info }));
      console.log(ubicacionesConInfo);/////////////
      await fetch(laravelApi + "/api/guardar-ubicaciones", {
        method: "POST",
        body: JSON.stringify({
          ubicaciones: ubicacionesConInfo,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function obtenerLStorage() {
  try {
    let respuesta = await fetch(laravelApi + "/api/obtener-ubicaciones", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    });
    let data = await respuesta.json();
    //console.log(data);
    if (data["success"]) {
      localStorage.setItem("seleccionadas", data["ubicaciones"]);
    } else {
      throw "Error"
    }
  } catch (error) {
    console.error('Error:', error);
    logueo_incorrecto();
  }
}