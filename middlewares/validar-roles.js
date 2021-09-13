const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se esta intentando verificar el role, sin antes validar el token.',
    });
  }

  const { rol, nombre } = req.usuario;
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre}. Usted no tiene los permisos requeridos.`,
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se esta intentando verificar el role, sin antes validar el token.',
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Se requiere ser: ${roles}`,
      });
    }
    next();
  };
};
module.exports = {
  esAdminRole,
  tieneRole,
};
