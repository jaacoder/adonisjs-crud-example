'use strict'

const Product = use('App/Model/Product')
const Category = use('App/Model/Category')

class ProductController {
    constructor() {
        this.data = {}
    }

    * index(request, response) {
        let products = yield Product.query()
            .orderBy('name')
            .with('category')
            .fetch()

        this.data.products = products.toJSON()

        yield response.sendView('productListing', this.data)
    }


    * create(request, response) {
        yield this.loadCategories()
        yield response.sendView('productForm', this.data)
    }


    * show(request, response) {
        let product = yield Product.find(request.param('id'))
        this.data.product = product.toJSON()

        yield this.loadCategories()
        yield response.sendView('productForm', this.data)
    }


    * store(request, response) {
        let product = new Product()
        product.fill(request.input('product'))

        if (yield product.validate()) {
            yield product.save()
            this.data.messages = { info: 'Product saved' }
            yield this.create(request, response)
            //
        } else {
            this.data.product = product.toJSON()
            this.data.messages = { error: product.errors }

            yield this.loadCategories()
            yield response.sendView('productForm', this.data)
        }
    }


    * update(request, response) {
        let product = yield Product.find(request.param('id'))
        product.fill(request.input('product'))

        if (yield product.validate()) {
            yield product.save()
            this.data.messages = { info: 'Product saved' }
            yield this.index(request, response)
            //
        } else {
            this.data.product = product.toJSON()
            this.data.messages = { error: product.errors }

            yield this.loadCategories()
            yield response.sendView('productForm', this.data)
        }
    }


    * destroy(request, response) {
        let product = yield Product.find(request.param('id'))
        if (yield product.delete()) {
            this.data.messages = { info: 'Product deleted' }
        }

        yield this.index(request, response)
    }

    * loadCategories() {
        let categories = yield Category.query()
            .orderBy('name')
            .fetch()

        this.data.categories = categories.toJSON()
    }
}

module.exports = ProductController
