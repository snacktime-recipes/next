import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DishModel from 'App/Models/Dish';
import DishCategory from 'App/Models/DishCategory';
import CreateDishValidator from 'App/Validators/Dish/CreateDishValidator';

export default class Dish {
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
        const payload = await request.validate(CreateDishValidator);
        
        // Fetching product category
        const category = await DishCategory.findOrFail(payload.categoryId);
        
        // Creating our product
        const dish = new DishModel();
        
        dish.fill({
            name: payload.name,
            description: payload.description,
            // cookTime: payload.cookTime,
            // cookDifficulty: payload.cookDifficulty,
            isIngredient: payload.isIngredient,
            isPublic: payload.isPublic
        });

        // Associating this product with provided
        // category and with currently logged in account
        await dish.related('category').associate(category);
        await dish.related('author').associate(auth.user!);
        await dish.related('recipeSteps').createMany(payload.recipeSteps)
        
        return await dish.save();
    }
}
