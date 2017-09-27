'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')

class Category extends Lucid {

    static get table() {
        return 'category'
    }

    * validate() {
        let rules = {
            name: 'required',
        }

        const validation = yield Validator.validateAll(this.attributes, rules, {
            'name.required': 'Name is required',
        })

        if (validation.fails()) {
            this.errors = validation.messages()
            return false
            //
        } else {
            return true
        }
    }

}

module.exports = Category
