'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddTokenFieldsSchema extends Schema {
  up () {
    this.alter('users', table => {
      table.string('token')
      table.timestamp('token_created_at')
    })
  }

  down () {
    this.alter('users', table => {
      table.dropColumn('token')
      table.dropColumn('token_created_at')
    })
  }
}

module.exports = UserAddTokenFieldsSchema
