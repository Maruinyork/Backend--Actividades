const Contenedor = require('./contenedor')

class LoginDaos extends Contenedor {
    constructor() {
        super('../DB/usuarios.model')
    }


}



module.exports = LoginDaos
