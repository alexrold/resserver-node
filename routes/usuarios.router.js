const { Router } = require('express');
const { check } = require('express-validator');

//* controllers-
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios.controllers');

//* validaciones-
const {
  validarRol,
  emailExiste,
  existeUsuarioById,
} = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/validarCampos');

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
    check('id', 'ID No valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
