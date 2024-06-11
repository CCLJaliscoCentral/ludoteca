// controllers/apiController.js

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

module.exports = {
  getFolios
};
