import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product';

export default class ProductSearchController {
    public async paginate({ request }: HttpContextContract){
        const page = request.input('page', 1);
        const limit = 10;

        const products = await Database.from('products').paginate(page, limit);

        return products;
    }

    public async searchByName({ request }: HttpContextContract){
        const name = request.qs().name;

        // @todo
        // implement/use some kind of a full text search algorithm
        const products = await Product.query().where('name', name);
        return products;
    }

    public async searchByCategory({ request }: HttpContextContract){
        const categoryName = request.qs().category;

        // @todo
        // implement/use some kind of a full text search algorithm
        const products = await Product
            .query()
            .whereHas('category', (query) => {
                query.where('name', categoryName);
            });
        return products;
    }

}
