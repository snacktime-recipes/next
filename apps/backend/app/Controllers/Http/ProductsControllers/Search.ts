import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenPayloadValueException from 'App/Exceptions/Payload/ForbiddenPayloadValueException';
import InvalidPayloadException from 'App/Exceptions/Payload/InvalidPayloadException';
import Product from 'App/Models/Product';

export default class ProductSearchController {
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
        const showMyProducts = request.input('showMyProducts') == 'true' ? true : false;

        if (showMyProducts && !auth.user) {
            throw new AuthenticationException("Unathorized access", "E_UNAUTHORIZED_ACCESS");
        };

        if (Number.isNaN(page) || Number.isNaN(limit)) throw new InvalidPayloadException("Page or Limit query parameters are of invalid type");
        if (limit > 35) throw new ForbiddenPayloadValueException("Pagination limit must not exceed 35");

        // Paginating
        return await Product
            .query()
            .withScopes((scopes) => {
                if (showMyProducts) return scopes.authoredBy(auth.user!);
                
                return scopes.public();
            })
            .paginate(page, limit);
    };

    /*
    |--------------------------------------------------------------------------
    | GET /products/search
    |--------------------------------------------------------------------------
    |
    | description: Searches products by given query. If searchMyProducts == true -
    |              searches only user-authored products
    | middlewares: SilentAuth
    */
    public async search({ request, auth }: HttpContextContract) {
        // Mandatory options
        const query = request.input("query");
        if (!query) throw new InvalidPayloadException("No \"query\" parameter specified");
    
        const searchMyProducts = request.input("searchMyProducts") == "true" ? true : false;

        // Checking user authorization
        if (searchMyProducts && auth.user == null) {
            throw new AuthenticationException("Unathorized access", "E_UNAUTHORIZED_ACCESS");
        };

        return (await Product.getSearchInstance())
            .search({
                term: query,
                where: {
                    ...searchMyProducts
                        // If authorized and {searchMyProduct} provided - search with
                        // specified authorId
                        ? {
                            authorId: {
                                eq: auth.user!.id,
                            }
                        }
                        // Else - search every publicly listed product
                        : {
                            isPublic: true
                        }
                }
            });
    };
}
