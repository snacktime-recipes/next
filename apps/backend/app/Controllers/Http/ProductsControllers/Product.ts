import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionForbiddenException from 'App/Exceptions/Auth/ActionForbiddenException';
import ProductModel from 'App/Models/Product';
import ProductCategory from 'App/Models/ProductCategory';
import CreateProductValidator from 'App/Validators/Product/CreateProductValidator';

export default class ProductController {
    /*
    |--------------------------------------------------------------------------
    | POST /products
    |--------------------------------------------------------------------------
    |
    | description: Creates new product.
    | middlewares: AuthMiddleware
    | returns: ProductModule
    */
    public async create({ request, auth } : HttpContextContract){
        const payload = await request.validate(CreateProductValidator);
        
        // Fetching product category
        const category = await ProductCategory.findOrFail(payload.categoryId);
        
        // Creating our product
        const product = new ProductModel();
        
        product.fill({
            name: payload.name,
            description: payload.description,
            isPublic: payload.isPublic,
        });

        // Associating this product with provided
        // category and with currently logged in account
        await product.related('category').associate(category);
        await product.related('author').associate(auth.user!);
        
        return await product.save();
    }


    /*
    |--------------------------------------------------------------------------
    | DELETE /products/:id
    |--------------------------------------------------------------------------
    |
    | description: Deletes product with specified id.
    | middlewares: AuthMiddleware
    | returns: ProductModule
    */
    public async deleteById({ params, auth }: HttpContextContract){
        const product = await ProductModel.findOrFail(params.id);

        // Checking if current user is the author of this product
        if (product.authorId !== auth.user!.id) {
            throw new ActionForbiddenException('You are not the author of this product');
        };

        await product.delete();
        return product.toJSON();
    }
}
