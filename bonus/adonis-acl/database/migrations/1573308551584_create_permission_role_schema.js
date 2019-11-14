'use strict'

const Schema = use('Schema')

class PermissionRoleSchema extends Schema {
  up () {
    this.create('roles_permissions', table => {
      table.increments()
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('id').on('permissions').onDelete('cascade')
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('id').on('roles').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('roles_permissions')
  }
}

module.exports = PermissionRoleSchema
