const { connectDB } = require('../DB/config')

connectDB()

class Contenedor {
    constructor(db){
		this.db = require(db);
    }

	async get(id) {
            
        if (id) {
            return this.db.findOne({_id: id})
        }else{
            return this.db.find()
        }

	}

	async add(element) {

        if (element.title && element.price && element.stock >= 0) {
            Object.keys(element).forEach( (e) => {
                if (element[e] === undefined) {
                    element[e] = null;
                }
            })
    
            const newElement = new this.db(element)
            await newElement.save()
            return newElement["_id"]

        }else{
            return "Nada por aqui"
        }

        
	}

    async update(id, element) {
        return this.db.updateOne({_id: id}, {$set: element})
    }

    async delete(id) {
        if (id) {
            return this.db.deleteOne({_id: id})
        }else{
            return this.db.delete()
        }
	}
	
}


module.exports = Contenedor