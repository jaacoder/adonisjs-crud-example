'use strict'

const Category = use('App/Model/Category')

class CategoryController {

    constructor() {
        this.data = {}
    }

    * index(request, response) {
        let categories = yield Category.query()
            .orderBy('name')
            .fetch()

        this.data.categories = categories.toJSON()

        yield response.sendView('categoryListing', this.data)
    }


    * create(request, response) {
        yield response.sendView('categoryForm', this.data)
    }


    * show(request, response) {
        let category = yield Category.find(request.param('id'))
        this.data.category = category.toJSON()

        yield response.sendView('categoryForm', this.data)
    }


    * store(request, response) {
        let category = new Category()
        category.fill(request.input('category'))

        if (yield category.validate()) {
            yield category.save()
            this.data.messages = { info: 'Category saved' }
            yield this.create(request, response)
            //
        } else {
            this.data.category = category.toJSON()
            this.data.messages = { error: category.errors }

            yield response.sendView('categoryForm', this.data)
        }
    }


    * update(request, response) {
        let category = yield Category.find(request.param('id'))
        category.fill(request.input('category'))

        if (yield category.validate()) {
            yield category.save()
            this.data.messages = { info: 'Category saved' }
            yield this.index(request, response)
            //
        } else {
            this.data.category = category.toJSON()
            this.data.messages = { error: category.errors }

            yield response.sendView('categoryForm', this.data)
        }
    }


    * destroy(request, response) {
        let category = yield Category.find(request.param('id'))
        if (yield category.delete()) {
            this.data.messages = { info: 'Category deleted' }
        }

        yield this.index(request, response)
    }

}

module.exports = CategoryController
