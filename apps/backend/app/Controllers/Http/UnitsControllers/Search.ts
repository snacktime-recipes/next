import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenPayloadValueException from 'App/Exceptions/Payload/ForbiddenPayloadValueException';
import InvalidPayloadException from 'App/Exceptions/Payload/InvalidPayloadException';
import MeasureUnit from 'App/Models/MeasureUnit';

export default class Search {
     /*
    |--------------------------------------------------------------------------
    | GET /units
    |--------------------------------------------------------------------------
    |
    | description: Paginates units
    | query parameters:
    |   ?page (number)          - pagination page
    |   ?limit (number)         - limit of products shown per page
    | returns: SimplePaginatorContract<MeasureUnitModel>
    */
    public async paginate({ request }: HttpContextContract) {
        // Getting required parameters from query
        const page = parseInt(request.input('page', 1));
        const limit = parseInt(request.input('limit', 10));
    

        if (Number.isNaN(page) || Number.isNaN(limit)) throw new InvalidPayloadException("Page or Limit query parameters are of invalid type");
        if (limit > 35) throw new ForbiddenPayloadValueException("Pagination limit must not exceed 35");

        // Paginating
        return await MeasureUnit
            .query()
            .paginate(page, limit);
    };
    /*
    |--------------------------------------------------------------------------
    | GET /units/:id
    |--------------------------------------------------------------------------
    |
    | description: Fetch by id units
    | query parameters:
    |   id (number)          - unit id
    | returns: MeasureUnitModel
    */
    public async fetchById({params}: HttpContextContract){
        return await MeasureUnit.findOrFail(params.id);
    }
}
