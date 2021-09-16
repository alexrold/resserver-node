const { Schema, model } = require('mongoose');

const productoSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'Producto - Nombre obligatorio.'],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

productoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();

  return data;
};
module.exports = model('Producto', productoSchema);
