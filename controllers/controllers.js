// controllers/apiController.js
const fs = require('fs').promises;
const fetch = require('node-fetch');

const getFolios = async (req, res) => {
  try {
    const response = await fetch('https://citasccljalisco.gob.mx/api/consultarFolios');
    const data = await response.json();
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos de la API' });
  }
};



const verDetalles = async (req, res) => {
  const { folio } = req.query; 
  try {
    const response = await fetch(`https://citasccljalisco.gob.mx/api/consultarDatos?folio=${folio}`);
    const data1 = await response.json();
    const data = data1[0][0];
    let nuevostatus = "";
    let boton = "";
    if (data) {
      
      if(data.status == 1){
        nuevostatus = "Activo";
        boton = "Terminar Estancia";
      }else if (data.status == 0){
        nuevostatus = "Inactivo";
        boton = "Reanudar Estancia";
      }

      const entradaLocal = new Date(data.hora_entrada).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
      const salidaLocal = new Date(data.hora_salida).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
    
      
      const html = await fs.readFile('views/detalle.html', 'utf8');
      const htmlWithData = html
        .replace('{{folio1}}', data.folio)
        .replace('{{folio}}', data.folio)
        .replace('{{infante}}', data.nombre_infante)
        .replace('{{sexo}}', data.sexo_infante)
        .replace('{{edad}}', data.edad_infante)
        .replace('{{tutor}}', data.nombre_responsable)
        .replace('{{parentesco}}', data.parentesco)
        .replace('{{area}}', data.area)
        .replace('{{contacto1}}', data.numero_contacto)
        .replace('{{contacto2}}', data.numero_contacto2)
        .replace('{{entrada}}', entradaLocal)
        .replace('{{salida}}', salidaLocal)
        .replace('{{img_infante}}', data.foto_infante_responsable)
        .replace('{{img_ine_delantera}}', data.identificacion_frontal)
        .replace('{{img_ine_trasera}}', data.identificacion_trasera) 
        .replace('{{status}}', nuevostatus)
        .replace('{{boton_terminar}}', boton);
      
      // Envía el HTML con los campos reemplazados
      res.send(htmlWithData);
    } else {
      res.status(404).json({ error: 'Folio no encontrado', folio});
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos de la API weee', folio });
  }
};


const terminarEstancia = async (req, res) => {
  const { folio } = req.query;
  
  try {
    const response = await fetch(`https://citasccljalisco.gob.mx/api/actualizarEstancia?folio=${folio}`, {
      method: 'PATCH'
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const result = await response.json();
    res.json(result); 
  } catch (error) {
    res.status(500).json({ error: 'Error Controller al terminar la estancia ' });
  }
};


const generarReporte = async (req ,res) =>{
  try{
    const response = await fetch('https://citasccljalisco.gob.mx/api/reporteLudoteca');
    if(!response.ok){
      throw new error('Error al obtener los datos de la API');
    }
    const data = await response.json();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte.json"');
    res.json(data[0]);
  }catch(error){
    res.status(500).json({mensaje: 'Error en el controller al generar reporte', error: error});
  }
}


const iniciarSesion = async (req, res) =>{
  try{
    
  }catch(error){

  }
}

module.exports = {
  getFolios,
  verDetalles,
  terminarEstancia,
  generarReporte,
};

