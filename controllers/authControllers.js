const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

//* Models-
const Usuario = require('../models/usuario');

//* Token-
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, img } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });

    // si usuario no existe se crea.
    if (!usuario) {
      const data = {
        nombre,
        correo,
        passwd: ':p',
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    // si el usuario en BD, tiene estado false
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario bloqueado, comuniquese con sp.',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Token no valido.',
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
