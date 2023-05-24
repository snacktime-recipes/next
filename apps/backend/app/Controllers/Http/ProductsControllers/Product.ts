import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductModel from 'App/Models/Product';
import ProductCategory from 'App/Models/ProductCategory';

export default class ProductController {

    public async create({ response, request } : HttpContextContract){
        const name = request.input('name');

        
        const category = await ProductCategory.findOrFail(2);
        const product = new ProductModel();
        
        product.fill({
            name:name,
            description:""
        });

        await product.related('category').associate(category);

        product.save();

        response.send(category.toJSON())
    }
}
