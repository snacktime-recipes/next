import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dish from 'App/Models/Dish';

export default class Search {
    /*
    |--------------------------------------------------------------------------
    | GET /products
    |--------------------------------------------------------------------------
    |
    | description: Paginates products of currently logged in user
    | middlewares: SilentAuthMiddleware
    | query parameters:
    |   ?page (number)          - pagination page
    |   ?limit (number)         - limit of products shown per page
    |   ?showMyProducts (bool)  - show only currently logged in profile
    |                             products (authorization required)
    | returns: SimplePaginatorContract<ProductModel>
    */
    public async paginate({ request, auth }: HttpContextContract) {
        // Getting required parameters from query
        const page = parseInt(request.input('page', 1));
        const limit = parseInt(request.input('limit', 10));
        
        // Optional parameters
        const showMyDishes = request.input('showMyProducts') == 'true' ? true : false;

        // if (showMyProducts && !auth.user) {
        //     throw new AuthenticationException("Unathorized access", "E_UNAUTHORIZED_ACCESS");
        // };

        // if (Number.isNaN(page) || Number.isNaN(limit)) throw new InvalidPayloadException("Page or Limit query parameters are of invalid type");
        // if (limit > 35) throw new ForbiddenPayloadValueException("Pagination limit must not exceed 35");

        // Paginating
        return await Dish
            .query()
            // .withScopes((scopes) => {
            //     if (showMyDishes) return scopes.authoredBy(auth.user!);
                
            //     return scopes.public();
            // })
            .paginate(page, limit);
    };

    public async searchByName({ request }: HttpContextContract){
        const name = request.qs().name;

        // @todo
        // implement/use some kind of a full text search algorithm
        const dishes = await Dish.query().where('name', name);
        return dishes;
    }

    public async searchByCategory({ request }: HttpContextContract){
        const categoryName = request.qs().category;

        // @todo
        // implement/use some kind of a full text search algorithm
        const dishes = await Dish
            .query()
            .whereHas('category', (query) => {
                query.where('name', categoryName);
            });
        return dishes;
    }

}