import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import ProvidedDishIsNotIngredientException from 'App/Exceptions/Dishes/Recipe/ProvidedDishIsNotIngredientException';
import DishModel from 'App/Models/Dish';
import DishCategory from 'App/Models/DishCategory';
import RecipeStep from 'App/Models/RecipeStep';
import RecipeStepProduct from 'App/Models/RecipeStepProduct';
import CreateDishValidator from 'App/Validators/Dish/CreateDishValidator';

export default class Dish {
    /*
    |--------------------------------------------------------------------------
    | POST /dishes
    |--------------------------------------------------------------------------
    |
    | description: Creates new dish.
    | middlewares: AuthMiddleware
    | returns: DishModule
    */
    public async create({ request, auth } : HttpContextContract){
        const payload = await request.validate(CreateDishValidator);
        
        // Fetching product category
        const category = await DishCategory.findOrFail(payload.categoryId);
        
        // Creating our product
        const trx = await Database.transaction();

        const dish = new DishModel();
        dish.useTransaction(trx)
        
        dish.fill({
            name: payload.name,
            description: payload.description,
            isIngredient: payload.isIngredient ?? false,
            isPublic: payload.isPublic ?? false,
        });

        // @todo
        // calculating cook time and cook difficulty
        dish.merge({
            cookTime: 0,
            cookDifficulty: 0,
        });

        // Associating this product with provided
        // category and with currently logged in account
        await dish.related('category').associate(category);
        await dish.related('author').associate(auth.user!);

        // Creating our recipe steps
        let currentStepNumber = 1;
        const steps: Array<RecipeStep> = [];

        for (const originalStep of payload.recipeSteps) {
            const step = new RecipeStep();
            
            step.fill({
                ...originalStep,
                stepNumber: currentStepNumber++,
            });

            // Adding ingredients to our step
            for (const originalIngredient of originalStep.ingredients) {
                // Checking if provided dish is ingredient
                if (originalIngredient.dishIngredientId) {
                    const dishIngredient = await DishModel.findOrFail(originalIngredient.dishIngredientId);
                    if (!dishIngredient.isIngredient) {
                        await trx.rollback();
                        throw new ProvidedDishIsNotIngredientException();
                    };
                };

                // Creating our RecipeStepProduct
                const ingredient = new RecipeStepProduct();

                ingredient.fill({
                    ...originalIngredient,
                });

                await ingredient.save();
            };

            // Pushing our step to array and saving it
            steps.push(step);
            await step.save();
        };

        // Associating our recipe steps with our dish
        await dish.related('recipeSteps').saveMany(steps);
        
        await trx.commit();
        return dish.toJSON();
    }
}
