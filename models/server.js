const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //* RoutePath
    this.authRoutePath = '/api/auth';
    this.usuariosRoutePath = '/api/usuarios';

    //* conectar a base de datos-
    this.conectarDB();

    //* Middelwares-
    this.middelwares();

    //* Rutas-
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
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
    this.app.use(this.authRoutePath, require('../routes/auth.router'));
    this.app.use(this.usuariosRoutePath, require('../routes/usuarios.router'));
  }

  listem() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ', this.port);
    });
  }
}
module.exports = Server;
