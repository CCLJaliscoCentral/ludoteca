const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes.js');
const path = require('path');
const sequelize = require('./db/database.js');
const User = require('./db/models/User.js');
const session = require('express-session');



app.use(express.json());

app.use(session({
  secret: 'secreto-super-seguro', // usa variable de entorno en producción
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hora
    sameSite: 'lax' // IMPORTANTE para que funcione con fetch y cookies
  }
}));

sequelize.authenticate()
    .then(() => console.log('Conectado a Postgres'))
    .then(() => sequelize.sync())
    .then(() => console.log('Modelos Sincronizados'))
    .catch(err => console.error('Error de conexion: ', err));

sequelize.sync({ alter: true })  // detecta y aplica cambios sin borrar los datos
  .then(() => console.log('Base de datos actualizada'))
  .catch(err => console.error('Error al sincronizar la base de datos', err));


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);

app.listen(port, () =>{
    console.log(`el servidor esta trabajando en http://localhost:${port}`);
});
