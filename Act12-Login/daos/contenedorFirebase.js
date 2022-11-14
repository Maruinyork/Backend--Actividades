const { connectFirebase } = require('../config')
const admin = require("firebase-admin");

connectFirebase()

class Contenedor {
    constructor(col){
        const db = admin.firestore()
		this.query = db.collection(col);
    }

	async get(id) {   
        try {
            if (id) {
                const data = this.query.doc(id)
                const element = await data.get()
                
                if (element.data().title) {
                    return {
                        title: element.data().title,
                        price: element.data().price,
                        thumbnail: element.data().thumbnail,
                        detail: element.data().detail,
                        stock: element.data().stock,
                        timestamp: element.data().timestamp,
                        id: element.id
                    }

                }

            }else{
                const data = await this.query.get()
                const elements = data.docs

                return elements.map((doc) => (doc.data()))

            }

        } catch (error) {
            return error
        }

	}

	async add(element) {

        const d = new Date()
        const date = `[${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`

        if (element.title && element.price && element.stock >= 0) {
            Object.keys(element).forEach( (e) => {
                if (element[e] === undefined) {
                    element[e] = null;
                }
            })
    
            try {
                element["timestamp"] = date
                const doc = this.query.doc()
                doc.create(element)
                return doc["_path"].segments[1]

            }catch(error){
                return error
            }

        }else if (element.products) {
            try {
                element["timestamp"] = date
                const doc = this.query.doc()
                doc.create(element)
                return doc["_path"].segments[1]

            }catch(error){
                return error
            }

        }else{
            return "No hay datos para mostrar"
        }

        
	}

    async update(id, element) {

        Object.keys(element).forEach( (e) => {
            if (element[e] === undefined) {
                element[e] = null;
            }
        })

        try {
            const doc = this.query.doc(id)
            await doc.update(element)
            
        } catch (error) {
            console.log(error)
        }
        
    }

    async delete(id) {
        const element = this.query.doc(id)
        return element.delete()
	}
	
}



module.exports = Contenedor