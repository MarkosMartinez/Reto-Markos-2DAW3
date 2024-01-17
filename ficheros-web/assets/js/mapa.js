// Obtener las temperaturas de "lugares" para ponerlos en el tooltip
var map;
var lugares = [
    {"nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896},
    {"nombre": "Hondarribia", "latitud": 43.36883, "longitud": -1.79369},
    {"nombre": "Donosti", "latitud": 43.3183, "longitud": -1.9812},
    {"nombre": "Errenteria", "latitud": 43.3119, "longitud": -1.8985},
    {"nombre": "Pasaia", "latitud": 43.3251, "longitud": -1.9259}
  ];
  function cargarMapa(){
    if(!map){
      // Inicializar el mapa y establecer las coordenadas y el nivel de zoom
      map = L.map('contMapa').setView([43.338, -1.788], 12);
      // Añadir una capa de tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      var marker = "";
      lugares.forEach(lugar => {
        marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
        marker.on('click', function() {
          console.log('Ubicacion seleccionada: ' + lugar.nombre);
          ubicacionSeleccionada(lugar.nombre);
        // Obtener temperatura del sitio clickado
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

  function ubicacionSeleccionada(nombre){
    if(localStorage.getItem("seleccionadas") == null){
      localStorage.setItem("seleccionadas", nombre);
    }else{
      localStorage.setItem("seleccionadas", localStorage.getItem("seleccionadas") + "," + nombre);
    }

    actualizarTemperaturas();
  }