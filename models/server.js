const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //* RoutePath
    this.path = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: '/api/usuarios',
    };

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
    this.app.use(this.path.auth, require('../routes/auth.routes'));
    this.app.use(this.path.buscar, require('../routes/buscar.routes'));
    this.app.use(this.path.categorias, require('../routes/categorias.routes'));
    this.app.use(this.path.productos, require('../routes/productos.routes'));
    this.app.use(this.path.usuarios, require('../routes/usuarios.routes'));
  }

  listem() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ', this.port);
    });
  }
}
module.exports = Server;
