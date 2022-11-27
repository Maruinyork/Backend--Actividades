const ContenedorFirebase = require('./contenedorFirebase.js')

const normalizr = require('normalizr')
const { normalize, schema} = normalizr

class ChatDaosFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes')
    }

    async crudChat(message) {
        try {
            const data = await this.query.get()
            const elements = data.docs

            const messages = elements.map((doc) => (
                {   
                    id: doc.id,
                    text: doc.data().text,
                    author: doc.data().author
                }
            ))

            const authorSchema = new schema.Entity('authors')

            const messageSchema = new schema.Entity('messages', {
                author: authorSchema,
            })
    
            const chatSchema = new schema.Entity('chat', {
                messages: [messageSchema]
            })

            const normalizedData = normalize({id:'chat', messages:messages}, chatSchema)

            if (message) {
                const id = normalizedData.entities['chat'].chat['messages'].length
                const doc = this.query.doc(`${id + 1000}`)
                await doc.create(message)

            }else{
                return normalizedData
            }
            

        } catch (error) {
            console.log(error); throw error
        }
    }

}
module.exports = ChatDaosFirebase