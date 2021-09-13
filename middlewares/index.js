const validarJWT = require('./validar-jwt');
const validarCampos = require('./validar-campos');
const validarRoles = require('./validar-roles');

module.exports = {
  ...validarJWT,
  ...validarCampos,
  ...validarRoles,
};
