// authMiddleware.js
// authMiddleware.js
function verificarSesion(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  return res.redirect('/?error=acceso_denegado');
}

module.exports = verificarSesion;
