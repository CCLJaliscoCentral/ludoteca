const express = require('express');
const router = express.Router();
const path = require('path');
const Controllers = require('../controllers/controllers.js')
const Auth = require('../controllers/auth.js')
const verificarToken = require('../middlewares/authMiddleware.js');

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../views/login.html'));
});

router.get('/detalles', verificarToken, (req,res) =>{
    res.sendFile(path.join(__dirname,'../views/detalle.html'));
});

router.get('/ludoteca', verificarToken, (req,res) =>{
    res.sendFile(path.join(__dirname,'../views/ludoteca.html'));
});


router.get('/consultarFolios', Controllers.getFolios);
router.get('/verdetalles', Controllers.verDetalles);
router.patch('/terminarEstancia', Controllers.terminarEstancia);
router.get('/generarReporte', Controllers.generarReporte);
router.post('/login', Auth.iniciarSesion);
router.post('/registrar', Auth.registrarUsuario);


module.exports = router;