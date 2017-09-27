'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')

class Product extends Lucid {

    static get table() {
        return 'product'
    }

    category() {
        return this.belongsTo('App/Model/Category', 'id', 'category_id')
    }

    * validate() {
        let rules = {
            name: 'required',
            price: 'required',
            category_id: 'above:0',
        }

        const validation = yield Validator.validateAll(this.attributes, rules, {
            'name.required': 'Name is required',
            'price.required': 'Price is required',
            'category_id.above': 'Category is required',
        })

        if (validation.fails()) {
            this.errors = validation.messages()
            return false
            //
        } else {
            return true
        }
    }

    * save() {
        if (yield this.validate()) {
            return yield super.save()
        }

        return false
    }
}

module.exports = Product
