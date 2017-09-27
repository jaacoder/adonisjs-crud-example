'use strict'

const Schema = use('Schema')

class ProductTableSchema extends Schema {

  up () {
    this.create('product', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 50)
      table.decimal('price')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('product.id')
    })
  }

  down () {
    this.drop('product')
  }

}

module.exports = ProductTableSchema
