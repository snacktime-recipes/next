import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionForbiddenException from 'App/Exceptions/Auth/ActionForbiddenException';
import ProductModel from 'App/Models/Product';
import ProductCategory from 'App/Models/ProductCategory';
import CreateProductValidator from 'App/Validators/Product/CreateProductValidator';
import UpdateProductValidator from 'App/Validators/Product/UpdateProductValidator';

export default class Product {
    /*
    |--------------------------------------------------------------------------
    | POST /products
    |--------------------------------------------------------------------------
    |
    | description: Creates new product.
    | middlewares: AuthMiddleware
    | returns: ProductModel
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
            isPublic: payload.isPublic ?? false,
        });

        // Associating this product with provided
        // category and with currently logged in account
        await product.related('category').associate(category);
        await product.related('author').associate(auth.user!);
        
        return await product.save();
    }
    /*  
    |--------------------------------------------------------------------------
    | PATCH /products/:id
    |--------------------------------------------------------------------------
    |
    | description: Updates product with specified id.
    | middlewares: AuthMiddleware
    | returns: ProductModel
    */
    public async updateById({ request, params, auth }: HttpContextContract){
        const payload = await request.validate(UpdateProductValidator);
        const product = await ProductModel.findOrFail(params.id);
        
        // Checking if this product is authored by authorized user
        if (auth.user!.id !== product.id) throw new ActionForbiddenException('You are not the author of this product');

        product.name = payload.name ?? product.name;
        product.description = payload.description ?? product.description;
        product.isPublic = payload.isPublic ?? product.isPublic;

        if(payload.categoryId && payload.categoryId != product.categoryId){
            const category = await ProductCategory.findOrFail(payload.categoryId);
            await product.related("category").associate(category);
        }

        return await product.save();
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE /products/:id
    |--------------------------------------------------------------------------
    |
    | description: Deletes product with specified id.
    | middlewares: AuthMiddleware
    | returns: ProductModel
    */
    public async deleteById({ params, auth }: HttpContextContract){
        const product = await ProductModel.findOrFail(params.id);

        // Checking if current user is the author of this product
        if (product.authorId !== auth.user!.id) throw new ActionForbiddenException('You are not the author of this product');

        await product.delete();
        return product.toJSON();
    }
}
