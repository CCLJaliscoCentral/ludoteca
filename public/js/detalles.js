


/////////////////////////////////////////////////////////////////////

function goBack() {
    window.history.back();
}

function terminarEstancia() {
    const folioElement = document.getElementById('folio-title');
    const folio = folioElement.getAttribute('data-folio');
        const url = `/terminarEstancia?folio=${folio}`;
        console.log(folio);

        try {
          const response = fetch(url, {
            method: 'PATCH'
          }); 
          alert('Estancia actualizada exitosamente');
          location.reload();
        } catch (error) {
          console.error('Error NO MMS:', error);
          alert('Hubo un error al terminar la estancia');
        }
}





function openModal(imgElement) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}



function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function obtenerDetalles(folio) {
    try {
        const respuesta = await fetch(`/verDetalles?folio${folio}`);
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
                div.setAttribute('onclick', `openDetail('Folio${item.folio}')`);
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

    }
}




