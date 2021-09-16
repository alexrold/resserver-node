const { Categoria, Usuario, Role, Producto } = require('../models');

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

//* Verificar si ID  Usuario existe-
const existeUsuarioById = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID-'${id}' no existe.`);
  }
};

//* Verificar si ID Categoria existe-
const existeCategoriaById = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`No existe una categoria con el ID: '${id}'.`);
  }
};

//* Verificar si ID producto existe-
const existeProductoById = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`No existe un producto con el ID: '${id}'.`);
  }
};

module.exports = {
  validarRol,
  emailExiste,
  existeCategoriaById,
  existeProductoById,
};
