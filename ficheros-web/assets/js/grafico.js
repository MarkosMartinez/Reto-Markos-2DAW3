let fechaInicio = '2023-01-01T00:00';
let fechaFin = "";
let temperaturas = [];

function colorizar(opaque) {
    return (ctx) => {
      const v = ctx.parsed.y;
      const c = v < 0 ? 'rgba(63, 141, 249, 1)'
        : v > 0 && v < 15 ? 'rgba(0, 192, 32, 1)'
        : v > 15 && v < 25 ? 'rgba(245, 118, 63, 1)'
        : v > 25 ? 'rgba(249, 85, 71, 1)'
        : 'rgba(0, 192, 0, 1)';
  
      return opaque ? c : Utils.transparentize(c, 1 - Math.abs(v / 150));
    };
  }

async function actualizarGrafico(fechaInicio, fechaFin) {
    let = ubicaciones = localStorage.getItem("seleccionadas");

    if (ubicaciones == [] || ubicaciones == null || ubicaciones == "null" || ubicaciones == ""|| ubicaciones == "[]") {
    document.querySelectorAll('.nav-link.enabled').forEach(elemento => {
        elemento.classList.remove('enabled');
        elemento.classList.add('disabled');
    });

  }else{
    let temperaturas = [];
    let intervaloTiempo = [];
    let url = laravelApi + "/api/historico-tiempo?fecha_inicio=" + fechaInicio + "&fecha_fin=" + fechaFin;
    
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
        temperaturas = data;
    } catch (error) {
        console.error("Error en el grafico:", error);
    }
    if(temperaturas.length == 0) return console.log("Sin datos! Omitiendo grafico...");

    var contenedor = document.getElementById("huecoCardsGrafico");  
    contenedor.innerHTML = "";  
    JSON.parse(localStorage.getItem("seleccionadas")).forEach(function (ubicacion) {
        var nuevoDiv = document.createElement("div");
        nuevoDiv.classList.add("col-6");
        contenedor.appendChild(nuevoDiv);
        nuevoDiv.innerHTML=`<div class="col-12">
        <div class="card" style="color: #4B515D; border-radius: 35px;">
          <div class="card-body p-4">
            <div class="d-flex">
              <h6 class="flex-grow-1"><b>${ubicacion.nombre}</b></h6>
            </div>
            <canvas id="grafico_${ubicacion.nombre}"></canvas>
          </div>
        </div>
      </div>`;

        let temperaturasZona = [];
        let intervaloTiempoZona = [];

        temperaturas.forEach((ubi) => {
            if(ubi.nombre == ubicacion.nombre){
                temperaturasZona.push(ubi["temperatura"]);
                intervaloTiempoZona.push(ubi["fecha"]);
            }
        });

      let ctx = document.getElementById(`grafico_${ubicacion.nombre}`);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: intervaloTiempoZona,
                datasets: [
                    {
                        label: "Temperatura media en " + ubicacion.nombre,
                        data: temperaturasZona,
                        borderWidth: 1,
                        borderColor: colorizar(true),
                        backgroundColor: colorizar(true),
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
  });


  }


}

var fechaInicioInput = document.getElementById("fechainicio");
var fechaFinInput = document.getElementById("fechafin");

fechaInicioInput.addEventListener("change", function () {
    var fechaInicio = new Date(fechaInicioInput.value);
    var fechaFin = new Date(fechaFinInput.value);
    var fechaActual = new Date();
    if (fechaFin < fechaInicio) {
    fechaFinInput.value = fechaInicioInput.value;
    }
    if (fechaFin > fechaActual) {
    fechaFinInput.value = fechaActual.toISOString().slice(0, 16);
    }
    actualizarGrafico(fechainicio.value, fechafin.value);
});

fechaFinInput.addEventListener("change", function () {
    var fechaInicio = new Date(fechaInicioInput.value);
    var fechaFin = new Date(fechaFinInput.value);

    var fechaActual = new Date();

    if (fechaFin < fechaInicio) {
    fechaFinInput.value = fechaInicioInput.value;
    }
    if (fechaFin > fechaActual) {
    fechaFinInput.value = fechaActual.toISOString().slice(0, 16);
    }
    actualizarGrafico(fechainicio.value, fechafin.value);
});


var ahora = new Date().toISOString().slice(0, 16);
fechafin.max = ahora;
fechainicio.max = ahora;