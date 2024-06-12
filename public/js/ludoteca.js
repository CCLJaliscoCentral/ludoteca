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

