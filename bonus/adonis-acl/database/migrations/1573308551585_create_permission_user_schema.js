'use strict'

const Schema = use('Schema')

class PermissionUserSchema extends Schema {
  up () {
    this.create('users_permissions', table => {
      table.increments()
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('id').on('permissions').onDelete('cascade')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('users_permissions')
  }
}

module.exports = PermissionUserSchema
