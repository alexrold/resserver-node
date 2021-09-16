const { Router } = require('express');
const { check } = require('express-validator');

//* controllers-
const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos.controllers');

//* Validaciones-DB
const {
  existeProductoById,
  existeCategoriaById,
} = require('../helpers/dbValidators');

//* Middlewares
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

/**
 * {{url}}api/productos
 *
 */
const router = Router();

//* GET
//* Obtener todas las categorias - Publico

router.get('/', obtenerProductos);

// //* Obtener una categoria por ID - Publico
router.get(
  '/:id',
  [
    check('id', 'El ID proporcionado, no existe o no es valido. ').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos,
  ],
  obtenerProducto
);

// //* POST
// //* Crear una categoria - Privado Cualquier usuario con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('categoria', 'La categoria no es valida o no existe.').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos,
  ],
  crearProducto
);

// //* PUT
// //* Actualizar categoria por ID - Privado Cualquier usuario con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'El ID proporcionado, no existe o no es valido. ').isMongoId(),
    check('id').custom(existeProductoById),
    //check('categoria', 'La categoria no es valida o no existe.').isMongoId(),
    validarCampos,
  ],
  actualizarProducto
);

// //* DELETE
// //* Eliminar categoria por ID - Privado ADMIN
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'El ID proporcionado, no existe o no es valido. ').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
