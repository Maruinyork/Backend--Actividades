const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this._filename = fileName;
    this._readFile();
  }

  async _readFile() {
    try {
      await fs.promises.readFile(this._filename, "utf-8");
    } catch (error) {
      error.code === "ENOENT"
        ? this._createEmptyFile()
        : console.log(
            `Error Code: ${error.code} | Ocurrió un error inesperado cuando se intentaba leer un archivo ${this._filename}`
          );
    }
  }

  async _createEmptyFile() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(`File ${this._filename} fue creado porque no existia`);
    });
  }

  async getById(id) {
    id = Number(id);
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);

      return parsedData.find((producto) => producto.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Ocurrió un error cuando se intentaba recuperar un producto por su ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeRemoved = parsedData.find(
        (producto) => producto.id === id
      );

      if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} no existe en el archivo`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Ocurrió un error mientras se intentaba eliminar un  producto por su ID  (${id})`
      );
    }
  }

  async updateById(id, newData) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      if (objectIdToBeUpdated) {
        const index = parsedData.indexOf(objectIdToBeUpdated);
        const {title, price, thumbnail} = newData;

        parsedData[index]['title'] = title;
        parsedData[index]['price'] = price;
        parsedData[index]['thumbnail'] = thumbnail;
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id}  no existe en el archivo`);
        return null;
      }

    } catch (error) {
      `Error Code: ${error.code} | Ocurrió un error mientras se intentaba actualizar el producto con ID (${id})`
    }
  }

  async addToArrayById(id, objectToAdd) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      if (objectIdToBeUpdated) {      
        const index = parsedData.indexOf(objectIdToBeUpdated);
        const valorActual = parsedData[index];
        const currentProducts = valorActual['products']
        currentProducts.push(objectToAdd.products)
        
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} no existe en el archivo`);
        return false;
      }

    } catch (error) {
      `Error Code: ${error.code} | Ocurrió un error mientras se intentaba actualizar el producto con ID (${id})`
    }
  
  }

  async removeFromArrayById(id, objectToRemoveId, keyName) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      
      if (objectIdToBeUpdated) {
        const index = parsedData.indexOf(objectIdToBeUpdated);
        
        const valorActual = parsedData[index][keyName];
        let indexToBeRemoved = -1;
        valorActual.forEach((element, indexE) => {
          if(element.id == objectToRemoveId) {
            indexToBeRemoved = indexE
          }
        })
        const newArray = [...valorActual];
        
        if (indexToBeRemoved>-1) {
          console.log(indexToBeRemoved)
          newArray.splice(indexToBeRemoved,1)
        }
    
        parsedData[index][keyName] = newArray;
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} no existe en el archivo`);
        return false;
      }

    } catch (error) {
      `Error Code: ${error.code} | Ocurrió un error mientras se intentaba actualizar el producto con ID (${id})`
    }
  
  }

  async save(object) {
    try {
      const allData = await this.getData();
      const parsedData = JSON.parse(allData);

      object.id = parsedData.length + 1;
      parsedData.push(object);

      await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
      return object.id;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Ocurrió un error mientras se intentaba guardar el objeto`
      );
    }
  }

  async deleteAll() {
    try {
      await this._createEmptyFile();
    } catch (error) {
      console.log(
        `Ocurrió un error (${error.code}) mientras se intentaba eliminar los objetos`
      );
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}

module.exports = Contenedor;