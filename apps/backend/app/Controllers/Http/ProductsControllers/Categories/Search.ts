import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory';

export default class Search {
    /*
    |--------------------------------------------------------------------------
    | GET /products/categories/:id
    |--------------------------------------------------------------------------
    |
    | description: Fetches product category
    | returns: CategoryModel
    */
    public async fetchById({ params}: HttpContextContract){
        return await ProductCategory.findOrFail(params.id);
    }
};