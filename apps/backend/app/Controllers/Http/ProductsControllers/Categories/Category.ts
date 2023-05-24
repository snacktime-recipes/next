import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory';

export default class ProductCategoryController {
    public async createCategory({ response, request } : HttpContextContract){
        const name = request.input('name');

        const category = new ProductCategory();

        category.fill({
            name: name,
            description: undefined,
        })


        category.save();
    }
};