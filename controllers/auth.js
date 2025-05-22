const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');










const iniciarSesion = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(200).json({ message: 'Usuario y contraseña requeridos.' });
    }

    const usuario = await User.findOne({ where: { username } });

    if (!usuario) {
      return res.status(200).json({ message: 'Datos incorrectos.' });
    }
    console.log("El usuario tiene el rol deeeee",  usuario.rol);
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(200).json({ message: 'Datos incorrectos.' });
    }

    

    if(usuario.rol.includes("admin")){

        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET || 'secreto',
            { expiresIn: '1h' }
            );

            // Aquí sí existe req.session porque viene del middleware express-session
            req.session.usuario = {
            id: usuario.id,
            username: usuario.username
            };

            return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: usuario.id,
                username: usuario.username,
            },
        });
    }else{
        return res.status(400).json({message: 'No tiene permisos'});
    }

  } catch (error) {
    console.error('Error en iniciarSesion:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};














const registrarUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña requeridos.' });
    }

    // Verificar si el usuario ya existe
    const existe = await User.findOne({ where: { username } });
    if (existe) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso.' });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const passwordHasheado = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const nuevoUsuario = await User.create({
      username,
      password: passwordHasheado,
    });

    res.status(200).json({ message: 'Exito! Pendiente Autorización' });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

module.exports = {registrarUsuario, iniciarSesion}