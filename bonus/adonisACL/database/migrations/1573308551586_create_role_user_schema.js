'use strict'

const Schema = use('Schema')

class RoleUserSchema extends Schema {
  up () {
    this.create('users_roles', table => {
      table.increments()
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('id').on('roles').onDelete('cascade')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('users_roles')
  }
}

module.exports = RoleUserSchema
