const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

//* Models-
const Usuario = require('../models/usuario');

//* Token-
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response) => {
  const { passwd, correo } = req.body;

  try {
    //*TODO Login-
    // Verificar Emaill-
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña, no valido. ',
      });
    }

    // Verificar si usuario esta activo-
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña, no valido. ',
      });
    }

    // Verificar el password-
    const passwdValidar = bcryptjs.compareSync(passwd, usuario.passwd);
    if (!passwdValidar) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña, no valido. ',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'comuniquese con el administrador.',
    });
  }
};

module.exports = {
  login,
};
