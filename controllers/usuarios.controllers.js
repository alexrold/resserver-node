const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

//* GET-
const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

//* POST-
const usuariosPost = async (req = request, res = response) => {
  const { nombre, passwd, correo, rol } = req.body;
  const usuario = new Usuario({ nombre, passwd, correo, rol });

  // Encriptar contraceña-
  const salt = bcryptjs.genSaltSync();
  usuario.passwd = bcryptjs.hashSync(passwd, salt);

  // Guardar en BD-
  await usuario.save();

  res.json({
    usuario,
  });
};

//* PUT-
const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, passwd, google, correo, ...resto } = req.body;

  if (passwd) {
    // Encriptar contraceña-
    const salt = bcryptjs.genSaltSync();
    resto.passwd = bcryptjs.hashSync(passwd, salt);
  }
  // Actualizar usuario-
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

//* PATCH-
const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API',
  });
};

//* DELETE-
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  // actualiza el estado del usuario a FALSE-
  const usuario = await Usuario.findOneAndUpdate(id, { estado: false });
  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
