const { optionLite } = require('../3DB/connectDB')
const knex = require('knex')(optionLite)

class ContenedorChat {
  constructor(db) {
    this.db = db
  }

  async createTable() {
    try {
      await knex.schema.createTable(this.db, (table) => {
        table.increments('id')
        table.string('mensaje')
        table.string('email')
        table
          .timestamp('fecha', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now())
      })
    } catch (error) {
      console.log('error:', error)
      throw error
    }
  }

  async add(msg) {
    try {
      await knex(this.db).insert(msg)
    } catch (err) {
      if (err['code'] === 'ER_NO_SUCH_TABLE') {
        this.createTable()
        await knex(this.db).insert(msg)
      } else {
        throw err
      }
    }
  }

  async get(id) {
    return knex(this.db).select('*')
  }
}

module.exports = ContenedorChat
