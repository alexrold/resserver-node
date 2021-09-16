const { Router } = require('express');
const { check } = require('express-validator');

//* controllers-
const { login, googleSignin } = require('../controllers/authControllers');

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

router.post(
  '/google',
  [
    check('id_token', 'El id_token es requerido.').not().isEmpty(),

    validarCampos,
  ],
  googleSignin
);
module.exports = router;
