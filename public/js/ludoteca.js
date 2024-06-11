

function filterByStatus() {
    const filter = document.getElementById('status-filter').value;
    const registros = document.querySelectorAll('.registro');

    registros.forEach(registro => {
        if (filter === 'all' || registro.classList.contains(filter)) {
            registro.style.display = 'block';
        } else {
            registro.style.display = 'none';
        }
    });
}


function generateReport() {
    // Implementar lógica para generar el reporte
    alert('Generando reporte...');
}


function openDetail(folio) {
    window.location.href =`/verdetalles?folio=${folio}`;
    console.log(folio);
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
    obtenerFolios();
    let folio = getQueryParam('folio');
    if (folio) {
        document.getElementById('folio-title').innerText = folio;
        // Fetch and display other details based on folio
    }
});






async function obtenerFolios() {
    try {
        const respuesta = await fetch('/consultarFolios');
        if (!respuesta.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        const datos = await respuesta.json();
        const container = document.getElementById('registros');
        console.log(datos);
        datos.forEach(item => {
            console.log(`id: ${item.id} folio: ${item.folio} status: ${item.status} tiempo: ${item.horas_transcurridas}:${item.minutos_transcurridos}:${item.segundos_transcurridos}`);

                const div = document.createElement('div');
                div.className = 'registro';
                div.textContent = `${item.folio}`;
                div.setAttribute('onclick', `openDetail('${item.folio}')`);
                const totalHoras = item.horas_transcurridas;
                
                


                if (item.status == 0) {
                    div.classList.add('green');
                } else if (totalHoras >= 3) {
                    div.classList.add('red');
                } else if (totalHoras >= 2) {
                    div.classList.add('amber');
                }

                container.appendChild(div);
            });
    } catch (error) {
        console.error('Ocurrió un error: ', error);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}

