// Función para cargar scripts dinámicamente
function loadScript(url, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}


const papaParseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js';
const sheetJsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js';

// Cargar bibliotecas y ejecutar el código una vez cargadas
loadScript(papaParseUrl, function() {
    loadScript(sheetJsUrl, function() {

        async function fetchData() {
            const response = await fetch('/generarReporte');
            const data = await response.json();
            return data;
        }

        function jsonToCSV(jsonData) {
            return Papa.unparse(jsonData);
        }

        function jsonToExcel(jsonData) {
            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        }

        function downloadCSV(csvData) {
            const bomb = '\uFEFF';
            const blob = new Blob([bomb + csvData], { type:'text/csv;charset=utf-8;'});
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'Reporte_Ludoteca.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function downloadExcel(excelData) {
            const blob = new Blob([excelData], { type: 'application/octet-stream;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'Reporte_Ludoteca.xlsx');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        async function downloadReport(format) {
            const data = await fetchData();
            if (format === 'csv') {
                const csvData = jsonToCSV(data);
                downloadCSV(csvData);
            } else if (format === 'excel') {
                const excelData = jsonToExcel(data);
                downloadExcel(excelData);
            }
        }

        // Aquí se asigna la función downloadReport al botón
        document.getElementById('generarReporteButton').addEventListener('click', function() {
            const format = 'csv';
                downloadReport(format);
           
                
            
        });
    });
});




/////////////////////////////////////////////////////////////////////////////////////////
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



function openDetail(folio) {
    window.location.href =`/verdetalles?folio=${folio}`;
    console.log(folio);
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
    setInterval(obtenerFolios,1000);
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
        container.innerHTML = '';

        datos.forEach(item => {
            const div = document.createElement('div');
            div.className = 'card-folio';
            div.setAttribute('onclick', `openDetail('${item.folio}')`);

            // Agrega clases por estado
            const horas = item.horas_transcurridas;
            if (item.status == 0) {
                div.classList.add('green');
            } else if (horas >= 3) {
                div.classList.add('red');
            } else if (horas >= 2) {
                div.classList.add('amber');
            }

            div.innerHTML = `
                <h4>${item.folio}</h4>
                <img src="${item.imagen_perfil || 'images/usuario.png'} " alt="Foto de perfil" style="width: 100px; height: auto; border-radius: 50%;">
                <p><strong>Hora de entrada:</strong> ${new Date(item.hora_entrada).toLocaleTimeString()}</p>
                <p><strong>Tiempo transcurrido:</strong> ${item.horas_transcurridas}h ${item.minutos_transcurridos}m ${item.segundos_transcurridos}s</p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error('Ocurrió un error: ', error);
    }
}
