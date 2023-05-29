import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductDishDocument from 'App/Models/ProductDishDocument';
import DocumentModel from 'App/Models/Document';
import CreateDocumentValidator from 'App/Validators/Document/CreateDocumentValidator';
import Database from '@ioc:Adonis/Lucid/Database';
import Dish from 'App/Models/Dish';

const documentTypes = {
    "purchaced": 1,
    "cooked": -1,
    "thrown": -1
}

export default class Document {
    /*
    |--------------------------------------------------------------------------
    | POST /documents
    |--------------------------------------------------------------------------
    |
    | description: Creates new document.
    | middlewares: AuthMiddleware
    | returns: DocumentModel
    */
    public async create({ request, auth } : HttpContextContract){
        const payload = await request.validate(CreateDocumentValidator);
        
        
        // Creating our document
        const trx = await Database.transaction();
        const document = new DocumentModel();
        document.useTransaction(trx);
        
        document.fill({
            type: payload.type,
            number: payload.number,
            description: payload.description,
            income: documentTypes[payload.type]
        });

        // Associating this document with currently logged in account
        await document.related('profile').associate(auth.user!);
        
        for (const originalIngredient of payload.productDishDocuments) {

            // Creating our ProductDishDocument
            const ingredient = new ProductDishDocument();

            ingredient.fill({
                ...originalIngredient,
                documentId: document.id
            });

            await ingredient.save();
        };

        await trx.commit();
        return document.toJSON();
    }
}