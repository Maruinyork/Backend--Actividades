const fs = require('fs')

class Contenedor {
  constructor(rutaArchivo) {
    this.rutaArchivo = rutaArchivo
  }

  async leerArchivo() {
    //retornara un array
    try {
      const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
      const contenidoParseado = JSON.parse(contenido)
      console.log(contenidoParseado)
      return contenidoParseado
    } catch (error) {
      console.log(error)
    }
  }

  async save(obj) {
    //guarda un objeto en el archivo y devuelve un id. Se parsea porque obtendremos un string
    const contenidoArchivo = await this.leerArchivo()
    console.log(contenidoArchivo)
    if (contenidoArchivo.length !== 0) {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(
          [
            ...contenidoArchivo,
            {
              ...obj,
              id: contenidoArchivo[contenidoArchivo.length - 1].id + 1,
            },
          ],
          null,
          2,
        ),
        'utf-8',
      ) //el nuevo obj que se agregue esta ubicado en la posicion 0 (contenido length -1) y se le suma 1, para que tenga el id2//con null 2 ordena el codigo
    } else {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify([{ ...obj, id: 1 }]),
        'utf-8',
      )
    }
  }

  async getById(id) {
    const contenidoArchivo = await this.leerArchivo()
    const producto = contenidoArchivo.filter((item) => item.id === id)
    if (producto.length > 0) {
      console.log('Producto encontrado: ' + JSON.stringify(producto, true, 2))
    } else {
      console.log('Lo siento, no se ha encontrado el producto buscado')
    }
  }

  async getAll() {
    //devuelve un array con los objetos presentes en el archivo
    const contenidoArchivo = await this.leerArchivo()
    console.log(contenidoArchivo)
  }

  async deleteById(id) {
    const contenidoArchivo = await this.leerArchivo()
    const deleted = contenidoArchivo.filter((producto) => producto.id !== id)
    try {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(deleted, null, 2),
      )
      console.log('Producto eliminado')
    } catch (error) {
      throw new Error(error, `No fue posible eliminar el producto`)
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.rutaArchivo, [])
      console.log('Todos los productos han sido eliminados')
    } catch (error) {
      throw new Error(error, 'Error al intentar eliminar los productos')
    }
  }
}

const contenedor = new Contenedor('./productos.txt')
//contenedor.save({nombre: "Poison Girl", precio:150, thumbnail:'https://perfugroupar.vtexassets.com/arquivos/ids/158300-300-300?v=637681215072530000&width=300&height=300&aspect=true'})
//contenedor.getById(5)
//contenedor.getAll()
//contenedor.deleteById(5)
//contenedor.deleteAll()
