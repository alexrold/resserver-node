const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //* RoutePath
    this.usuariosRoutePath = '/api/usuarios';

    //* Middelwares-
    this.middelwares();

    //* Rutas-
    this.routes();
  }

  middelwares() {
    //* CORS
    this.app.use(cors());

    //* Lectura y parceo del body
    this.app.use(express.json());

    //* Directorio Publico-
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosRoutePath, require('../routes/usuarios.router'));
  }

  listem() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }
}
module.exports = Server;
