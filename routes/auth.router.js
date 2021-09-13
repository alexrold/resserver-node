const { Router } = require('express');
const { check } = require('express-validator');

//* controllers-
const { login } = require('../controllers/auth');

//* validaciones-
const { validarCampos } = require('../middlewares');

const router = Router();

//* post-
router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio.').isEmail(),
    check('passwd', 'La contraseña es obligatoria.').not().isEmpty(),

    validarCampos,
  ],
  login
);

module.exports = router;
