const { option } = require('../mariaDB/connectDB')
const knex = require('knex') (option)

class Contenedor {
    constructor(db){
		this.db = db;
    }

    async createTable() {
        try {
            await knex.schema.createTable(this.db, table => {
                table.timestamp('timestamp').defaultTo(knex.fn.now());
                table.increments('id')
                table.string('title')
                table.string('thumbnail')
                table.string('detail')
                table.integer('price')
                table.integer('stock')
            })
        }catch (err) {
            console.log(err); throw err
        }
    }

	async add(product) {
        try {
            await knex(this.db).insert(product)
        }catch (err) {
            if (err['code'] === 'ER_NO_SUCH_TABLE') {
                this.createTable()
                await knex(this.db).insert(product)
            }else{
                throw err
            }
        }

	}

	async get(id) {
            
        if (id) {
            return knex(this.db).select('*').where('id', '=', id)
        }else{
            return knex(this.db).select('*')
        }
   
	}

 	async delete(id) {
        if (id) {
            return knex(this.db).where('id', '=', id).del()
        }else{
            return knex(this.db).del()
        }
	}
	
}

module.exports = Contenedor