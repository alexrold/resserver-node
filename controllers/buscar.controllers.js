const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Producto, Categoria } = require('../models');
const colecciones = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
  // si termino es un ID
  const esMongoID = ObjectId.isValid(termino); // True si es MongoID valido, False si no es.
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  // si termino es un nombre O emaill de usuario Y  estado = true [termino => regex]
  const regex = new RegExp(termino, 'i');
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  return res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = '', res = response) => {
  // si termino es un ID
  const esMongoID = ObjectId.isValid(termino); // True si es MongoID valido, False si no es.
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  // si termino es un nombre de categoria Y  estado = true [termino => regex]
  const regex = new RegExp(termino, 'i');
  const categoria = await Categoria.find({
    nombre: regex,
    estado: true,
  });
  return res.json({
    results: categoria,
  });
};

const buscarProductos = async (termino = '', res = response) => {
  // si termino es un ID
  const esMongoID = ObjectId.isValid(termino); // True si es MongoID valido, False si no es.
  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      'categoria',
      'nombre'
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  // si termino es un nombre de producto  Y  estado = true [termino => regex]
  const regex = new RegExp(termino, 'i');
  const producto = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate('categoria', 'nombre');
  return res.json({
    results: producto,
  });
};

const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!colecciones.includes(coleccion)) {
    return res.json({
      msg: `Las colecciones permitidas son: ${colecciones}`,
    });
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'categorias':
      buscarCategorias(termino, res);
      break;
    case 'productos':
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: 'Busqueda no implementada.',
      });
      break;
  }
};

module.exports = {
  buscar,
};
