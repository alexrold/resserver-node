const Role = require('../models/role');
const Usuario = require('../models/usuario');

//* Validar rol contra BD-
const validarRol = async (rol = '') => {
  const existeRole = await Role.findOne({ rol });
  if (!existeRole) {
    throw new Error(`El rol '${rol}' no existe `);
  }
};

//* Verificar si Email existe-
const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo '${correo}' ya esta registrado.`);
  }
};

//* Verificar si ID existe-
const existeUsuarioById = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID-'${id}' no existe.`);
  } else if (existeUsuario.estado === false) {
    throw new Error(`El ID-'${id}' no esta disponible.`);
  }
};

module.exports = {
  validarRol,
  emailExiste,
  existeUsuarioById,
};
