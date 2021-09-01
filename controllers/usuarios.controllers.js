const { response, request } = require('express');

//* GET
const usuariosGet = (req = request, res = response) => {
  res.json({
    msg: 'get API',
  });
};

//* POST
const usuariosPost = (req, res) => {
  res.json({
    msg: 'post API',
  });
};

//* PUT
const usuariosPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: 'put API',
  });
};

//* PATCH
const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API',
  });
};

//* DELETE-
const usuariosDelete = (req, res) => {
  res.json({
    msg: 'delete API',
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
