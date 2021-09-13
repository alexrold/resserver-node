const { request, response } = require('express');
const jwt = require('jsonwebtoken');

//* Models-
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token-authorization');
  if (!token) {
    return res.status(401).json({
      msg: 'No es posible procesar la peticion, se requiere un token valido.',
    });
  }

  try {
    // obtener uid-
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer usuario uid-
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return req.status(401).json({
        msg: 'Token no valido - usuario no existe.',
      });
    }

    // verificar si el uid tiene estado en true-
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario no accesible, comuniquese con el administrador.',
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'No es posible procesar la peticion, se requiere un token valido.',
    });
  }
};
module.exports = {
  validarJWT,
};
