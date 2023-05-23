import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product';

export default class Search {
    public async paginate({ request }: HttpContextContract){
        const page = request.input('page', 1);
        const limit = 10;

        const products = await Database.from('products').paginate(page, limit);

        return products;
    }

    public async searchByName({ request }: HttpContextContract){
        const name = request.qs().name;
        const products = await Product.findMany(name);
        return products;
    }

    public async searchByCategory({ request }: HttpContextContract){
        const category = request.qs().category;
        const products = await Product.findMany(category);
        return products;
    }

}