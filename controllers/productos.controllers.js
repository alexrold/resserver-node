const { request, response } = require('express');
const { Producto } = require('../models');

//* Obtener Producto-
const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)

    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');
  res.json(producto);
};

//* Obtener Productos-
const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

// Crear Nuevo Producto-
const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;
  body.nombre = body.nombre.toUpperCase();

  // Verificar si ya existe  el producto en BD-
  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `Ya existe un producto con el nombre ${productoDB.nombre}. `,
    });
  }

  // Generar data a grabar en BD-
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  // Instanciar y Grabar nuevo  producto
  const producto = new Producto(data);
  await producto.save();

  res.status(201).json(producto);
};

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(producto);
};

const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findOneAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.status(200).json(producto);
};

module.exports = {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
};
