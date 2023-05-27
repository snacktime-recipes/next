import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenPayloadValueException from 'App/Exceptions/Payload/ForbiddenPayloadValueException';
import InvalidPayloadException from 'App/Exceptions/Payload/InvalidPayloadException';
import DishCategory from 'App/Models/DishCategory';
import CreateDishCategoryValidator from 'App/Validators/Dish/Categories/CreateDishCategoryValidator';

export default class CategoriesController {
    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(CreateDishCategoryValidator);

        // Creating our dish category
        const category = new DishCategory();

        category.fill({
            name: payload.name,
            description: payload.description,
        });

        // Checking parentCategoryId
        if (payload.parentId) {
            const parentCategory = await DishCategory.findOrFail(payload.parentId);
            await category.related('parentCategory').associate(parentCategory);
        };

        return await category.save();
    };

    public async fetchById({ params }: HttpContextContract) {
        return await DishCategory.findOrFail(params.id);
    };

    public async paginate({ request }: HttpContextContract) {
        // Getting required parameters from query
        const page = parseInt(request.input('page', 1));
        const limit = parseInt(request.input('limit', 10));
        
        if (Number.isNaN(page) || Number.isNaN(limit)) throw new InvalidPayloadException("Page or Limit query parameters are of invalid type");
        if (limit > 35) throw new ForbiddenPayloadValueException("Pagination limit must not exceed 35");

        // Paginating
        return await DishCategory
            .query()
            .paginate(page, limit);
    };
}
