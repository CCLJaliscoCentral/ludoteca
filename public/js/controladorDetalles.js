


function goBack() {
    window.history.back();
}

function terminarEstancia() {
    alert('Estancia terminada.');
    // Logic to terminate the stay
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





