const { Router } = require('express');
const { check } = require('express-validator');

//* controllers-
const { login, googleSignin } = require('../controllers/authControllers');
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias.controllers');
const { existeCategoriaById } = require('../helpers/dbValidators');

//* validaciones-
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();

/**
 * {{url}}api/categorias
 *
 */

//* GET
//* Obtener todas las categorias - Publico
router.get('/', obtenerCategorias);

//* Obtener una categoria por ID - Publico
router.get(
  '/:id',
  [
    check('id', 'El ID proporcionado, no existe o no es valido. ').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos,
  ],
  obtenerCategoria
);

//* POST
//* Crear una categoria - Privado Cualquier usuario con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//* PUT
//* Actualizar categoria por ID - Privado Cualquier usuario con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaById),
    validarCampos,
  ],
  actualizarCategoria
);

//* DELETE
//* Eliminar categoria por ID - Privado ADMIN
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'El ID proporcionado, no existe o no es valido. ').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
