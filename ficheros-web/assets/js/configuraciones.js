const laravelApi = "http://localhost:81";
const tokenEuskalmet = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiZGtAcGxhaWF1bmRpLm5ldCJ9.OJmM41Cwsf3TM4PBqGntr0tTVK5zHQQx6aaJE0iBcssnx3QidMgrikL26sFHzcANVYqvwENZz7KVOuoS2SOK1k6gO3Mo3v7_HK_NQ7TJk2ZPzHFC-7NZnQ4n_5V34ff0OH4Kgd6roZajLMHTOd0Frwv3shSIgsnaS_ZI9dn23Qs70D3Fnc1EJuQyRc-h9Zs6Vm_uCXLsiSq6k6K_NvT7-XI_UEXkGQrzehdDrCl5xu-6ktmdhhfh0QcAGF5n6K3pMZWaSG_QQXwiGzh6BPUDHe-hW1JE9nlbNtqmZ0_EeqpI1mEDtpGCfQYlQ67VMY-SUB_b0ZfIy9dBd4pv3-IArg" /*Esto no deberia de poder verse!*/
console.log('%c Reto-Markos!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');



function comprobadorDeTabs() {
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function (event) {
            const selectedTabId = event.target.getAttribute('aria-controls');
            console.log('Pestaña seleccionada:', selectedTabId);
        });
    });
}

let tiempoFuera = 0;
let tiempoLimite = 60000; // 1 minuto en milisegundos

function comprobarTiempoFuera() {
    tiempoFuera += tiempoLimite;
    if (tiempoFuera > 60000) {
        // Ejecutar la función correspondiente aquí
        console.log('Han pasado más de 1 minuto fuera del mapa-tabpanel');
    }
}

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        setTimeout(comprobarTiempoFuera, tiempoLimite);
    } else {
        clearTimeout(comprobarTiempoFuera);
        tiempoFuera = 0;
    }
});


setTimeout(() => {
    comprobadorDeTabs();
}, 500);