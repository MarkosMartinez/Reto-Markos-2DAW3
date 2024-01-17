async function actualizarTemperaturas(){
    ubicaciones = localStorage.getItem("seleccionadas");
    cardHtml = "";

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
            if(!data || data == null || !respuesta) throw "Sin datos";

            data.forEach(ubicacion => {
                cardHtml += `<div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card" style="color: #4B515D; border-radius: 35px;">
                  <div class="card-body p-4">
        
                    <div class="d-flex">
                      <h6 class="flex-grow-1">${ubicacion["temperatura"]}</h6>
                      <h6>15:07</h6>
                    </div>
        
                    <div class="d-flex flex-column text-center mt-5 mb-4">
                      <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${ubicacion["temperatura"]}°C </h6>
                      <span class="small" style="color: #868B94">Stormy</span>
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