const express = require('express');
const router = express.Router();
const path = require('path');
const Controllers = require('../controllers/controllers.js')


router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../views/ludoteca.html'));
});

router.get('/detalles',(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/detalle.html'));
});

router.get('/consultarFolios', Controllers.getFolios);
router.get('/verdetalles', Controllers.verDetalles);
router.patch('/terminarEstancia', Controllers.terminarEstancia);

module.exports = router;