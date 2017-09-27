'use strict'

const Schema = use('Schema')

class CategoryTableSchema extends Schema {

  up () {
    this.create('category', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 50)
    })
  }

  down () {
    this.drop('category')
  }

}

module.exports = CategoryTableSchema
