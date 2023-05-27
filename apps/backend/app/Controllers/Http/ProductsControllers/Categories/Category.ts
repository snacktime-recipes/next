import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory';
import CreateProductCategoryValidator from 'App/Validators/Product/Categories/CreateProductCategoryValidator';

export default class ProductCategoryController {
    /*
    |--------------------------------------------------------------------------
    | POST /products/categories
    |--------------------------------------------------------------------------
    |
    | description: Creates new category
    | middlewares: InternalAuthMiddleware
    | exceptions: AuthenticationException("E_UNAUTHORIZED_ACCESS")
    | returns: CategoryModel
    */
    public async create({ request } : HttpContextContract){
        const payload = await request.validate(CreateProductCategoryValidator);

        // Creating our category
        const category = new ProductCategory();

        category.fill({
            name: payload.name,
            description: payload.description,
        });

        // Associating this category with it's parent
        // category (if exists);
        if (payload.parentCategoryId) {
            const parentCategory = await ProductCategory.findOrFail(payload.parentCategoryId);
            await category.related('parentCategory').associate(parentCategory);
        };

        return await category.save();
    }
    
};