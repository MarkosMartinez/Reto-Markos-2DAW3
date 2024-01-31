let fechaInicio = '2023-01-01T00:00';
let fechaFin = "";
let graficoSeleccionado;

async function actualizarSelects(){
    let encontrado = false;
    datos = await obtenerLugares();
    const selectGrafico = document.getElementById('selectGrafico');
    const lugaresGuardados = JSON.parse(localStorage.getItem('seleccionadas')) || [];
    selectGrafico.innerHTML = "";
    datos.forEach(lugar => {
        const optionElement = document.createElement("option");
        optionElement.value = lugar.nombre;
        optionElement.text = lugar.nombre;

        selectGrafico.appendChild(optionElement);

        if (lugaresGuardados.some(lugarGuardado => lugarGuardado.nombre === lugar.nombre) && !encontrado) {
            optionElement.selected = true;
            graficoSeleccionado = lugar.nombre;
            encontrado = true;
        }
    });
    encontrado = false;
    actualizarGrafico(fechaInicio, fechaFin, graficoSeleccionado);
}


let chartInstance; // Variable to store the chart instance

async function actualizarGrafico(fechaInicio, fechaFin, ubicacion = "Hondarribia") {
    let temperaturas = [];
    let intervaloTiempo = [];
    let url = laravelApi + "/api/historico-tiempo?fecha_inicio=" + fechaInicio + "&fecha_fin=" + fechaFin;
    //console.log(url);
    try {
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
        let data = await respuesta.json();
        //console.log(data);
        data.forEach((temperatura) => {
            if (temperatura["nombre"] == ubicacion) {
                temperaturas.push(temperatura["temperatura"]);
                intervaloTiempo.push(temperatura["fecha"]);
                //console.log("Entraaa. Temperatura: " + temperaturas + " intervalos: " + intervaloTiempo);
            }
        });
    } catch (error) {
        console.error("Error en el grafico:", error);
    }

    const ctx = document.getElementById("contGrafico");

    // Destroy the existing chart if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    //console.log(temperaturas + " intervalo: " + intervaloTiempo);
    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: intervaloTiempo,
            datasets: [
                {
                    label: "Temperatura media en " + ubicacion,
                    data: temperaturas,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}


            var fechaInicioInput = document.getElementById('fechainicio');
            var fechaFinInput = document.getElementById('fechafin');

            fechaInicioInput.addEventListener('change', function() {
              var fechaInicio = new Date(fechaInicioInput.value);
              var fechaFin = new Date(fechaFinInput.value);
              var fechaActual = new Date();
              if (fechaFin < fechaInicio) {
                fechaFinInput.value = fechaInicioInput.value;
              }
              if (fechaFin > fechaActual) {
                fechaFinInput.value = fechaActual.toISOString().slice(0, 16);
              }
            });

            fechaFinInput.addEventListener('change', function() {
              var fechaInicio = new Date(fechaInicioInput.value);
              var fechaFin = new Date(fechaFinInput.value);

              var fechaActual = new Date();

              if (fechaFin < fechaInicio) {
                fechaFinInput.value = fechaInicioInput.value;
              }
              if (fechaFin > fechaActual) {
                fechaFinInput.value = fechaActual.toISOString().slice(0, 16);
              }
            });