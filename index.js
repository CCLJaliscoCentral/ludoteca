const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes.js');
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);

app.listen(port, () =>{
    console.log(`el servidor esta trabajando en http://localhost:${port}`);
});