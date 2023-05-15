import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
    public async getProducts({ response }: HttpContextContract){
        response.send("Not implemented");
    }

    public async searchProductsByName({ response }: HttpContextContract){
        response.send("Not implemented");
    }

    public async searchProductsByCategory({ response }: HttpContextContract){
        response.send("Not implemented");
    }

}
