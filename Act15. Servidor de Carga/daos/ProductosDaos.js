const Contenedor = require('./contenedor')

class ProductosDaos extends Contenedor {
    constructor() {
        super('../DB/productos.model')
    }
}

module.exports = ProductosDaos