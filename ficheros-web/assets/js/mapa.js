// Obtener las temperaturas de "lugares" para ponerlos en el tooltip

var lugares = [
    {"nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896},
    {"nombre": "Hondarribia", "latitud": 43.36883, "longitud": -1.79369},
    {"nombre": "Donosti", "latitud": 43.3183, "longitud": -1.9812},
    {"nombre": "Renteria", "latitud": 43.3119, "longitud": -1.8985},
    {"nombre": "Pasaia", "latitud": 43.3251, "longitud": -1.9259}
  ];
    // Inicializar el mapa y establecer las coordenadas y el nivel de zoom
    var map = L.map('contMapa').setView([43.338, -1.788], 11);
    // Añadir una capa de tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    var marker = "";
    lugares.forEach(lugar => {
      marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
      marker.on('click', function() {
        console.log('Ubicacion seleccionada: ' + lugar.nombre);
       // Obtener temperatura del sitio clickado
    })
       });