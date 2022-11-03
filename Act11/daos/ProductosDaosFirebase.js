const ContenedorFirebase = require('./contenedorFirebase')

class ProductosDaosFirebase extends ContenedorFirebase {
    constructor() {
        super('productos')
    }
}

module.exports = ProductosDaosFirebase