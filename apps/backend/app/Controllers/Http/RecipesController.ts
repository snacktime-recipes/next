import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateNewRecipeDTO } from 'providers/RecipeProvider/types';
import RecipesProvider from '@ioc:Providers/Recipes';

export default class RecipesController {
    public async create(context: HttpContextContract) {
        // todo
        // check request body
        RecipesProvider.create(context.request.body() as CreateNewRecipeDTO);
    };
}
