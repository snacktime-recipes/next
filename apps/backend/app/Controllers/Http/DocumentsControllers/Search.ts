import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionForbiddenException from 'App/Exceptions/Auth/ActionForbiddenException';
import ForbiddenPayloadValueException from 'App/Exceptions/Payload/ForbiddenPayloadValueException';
import InvalidPayloadException from 'App/Exceptions/Payload/InvalidPayloadException';
import Document from 'App/Models/Document';

export default class Search {
/*
    |--------------------------------------------------------------------------
    | GET /documents
    |--------------------------------------------------------------------------
    |
    | description: Paginates documents of currently logged in user
    | middlewares: auth
    | query parameters:
    |   ?page (number)          - pagination page
    |   ?limit (number)         - limit of products shown per page
    | returns: SimplePaginatorContract<DocumentModel>
    */
    public async paginate({ request, auth }: HttpContextContract) {
        // Getting required parameters from query
        const page = parseInt(request.input('page', 1));
        const limit = parseInt(request.input('limit', 10));
        

        if (Number.isNaN(page) || Number.isNaN(limit)) throw new InvalidPayloadException("Page or Limit query parameters are of invalid type");
        if (limit > 35) throw new ForbiddenPayloadValueException("Pagination limit must not exceed 35");

        // Paginating
        return await Document
            .query()
            .where('profileId', auth.user!.id)
            .paginate(page, limit);
    };

    public async fetchById({ params, auth }: HttpContextContract){
        const document = await Document.findOrFail(params.id);

        if( document.profileId !== auth.user!.id )
            throw new ActionForbiddenException('You are no the owner of this document')
        return document;
    }

}
