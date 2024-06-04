// scripts.js

function openDetail(folio) {
    window.location.href =`detalle.html?folio=${folio}`;
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
    let folio = getQueryParam('folio');
    if (folio) {
        document.getElementById('folio-title').innerText = folio;
        // Fetch and display other details based on folio
    }
});

function terminarEstancia() {
    alert('Estancia terminada.');
    // Logic to terminate the stay
}

// ludoteca.js

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

// ludoteca.js



function filterByStatus() {
    const filter = document.getElementById('status-filter').value;
    const registros = document.querySelectorAll('.registro');

    registros.forEach(registro => {
        if (filter === 'all') {
            registro.style.display = 'block';
        } else {
            if (registro.classList.contains(filter)) {
                registro.style.display = 'block';
            } else {
                registro.style.display = 'none';
            }
        }
    });
}

function generateReport() {
    // Implementar lógica para generar el reporte
    alert('Generando reporte...');
}

function goBack() {
    window.history.back();
}