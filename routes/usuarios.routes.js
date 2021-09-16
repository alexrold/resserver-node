const { Router } = require('express');
const { check } = require('express-validator');

//* Usuarios Controllers-
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios.controllers');

//* DB Validaciones-
const {
  validarRol,
  emailExiste,
  existeUsuarioById,
} = require('../helpers/dbValidators');

//*Middlewares
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require('../middlewares');

const router = Router();

//* GET-
router.get('/', usuariosGet);

//* POST-
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligarorio.').not().isEmpty(),
    check('passwd', 'La conteceña es obligarorio.').not().isEmpty(),
    check('passwd', 'la contraseña debe ser de mas de 5 caracteres').isLength({
      min: 6,
    }),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(validarRol),
    validarCampos,
  ],
  usuariosPost
);

//* PUT
router.put(
  '/:id',
  [
    check('id', 'ID No valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosPut
);

//* PATCH
router.patch('/', usuariosPatch);

//* DELETE-
router.delete(
  '/:id',
  [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'ID No valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosDelete
);
module.exports = router;
