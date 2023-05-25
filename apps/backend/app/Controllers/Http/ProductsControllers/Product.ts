import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
    | exceptions: AuthenticationException("E_UNAUTHORIZED_ACCESS"), 
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

    public async deleteById({ request }: HttpContextContract){
        const productId = request.input('id');
        const product = await ProductModel.findOrFail(productId);
        await product.delete()
    }
}
