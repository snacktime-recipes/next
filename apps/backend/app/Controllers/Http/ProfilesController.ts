// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RecipeProvider from '@ioc:Providers/Recipes';

export default class ProfilesController {
    public async create() {
        // ...

        // Adding example recipes
        RecipeProvider.create({ title: "test" });
    };
}
