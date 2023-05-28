import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenPayloadValueException from 'App/Exceptions/Payload/ForbiddenPayloadValueException';
import InvalidPayloadException from 'App/Exceptions/Payload/InvalidPayloadException';
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
    /*
    |--------------------------------------------------------------------------
    | GET /products/categories
    |--------------------------------------------------------------------------
    |
    | description: Paginates products categories
    | query parameters:
    |   ?page (number)          - pagination page
    |   ?limit (number)         - limit of products shown per page
    | returns: SimplePaginatorContract<ProductCategoryModel>
    */
    public async paginate( {request}: HttpContextContract){
        // Getting required parameters from query
        const page = parseInt(request.input('page', 1));
        const limit = parseInt(request.input('limit', 10));
        

        if (Number.isNaN(page) || Number.isNaN(limit)) throw new InvalidPayloadException("Page or Limit query parameters are of invalid type");
        if (limit > 35) throw new ForbiddenPayloadValueException("Pagination limit must not exceed 35");

        // Paginating
        return await ProductCategory
            .query()
            .paginate(page, limit);
    }
};