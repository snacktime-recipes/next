import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductDishDocument from 'App/Models/ProductDishDocument';
import DocumentModel from 'App/Models/Document';
import CreateDocumentValidator from 'App/Validators/Document/CreateDocumentValidator';
import DocumentType from 'App/Types/Document/DocumentType';
import Product from 'App/Models/Product';
import Dish from 'App/Models/Dish';
import ActionForbiddenException from 'App/Exceptions/Auth/ActionForbiddenException';

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
           
        const document = new DocumentModel();
        
        document.fill({
            type: payload.type as DocumentType,
            number: payload.number,
            description: payload.description,
        });

        // Associating this document with currently logged in account
        await document.related('profile').associate(auth.user!);
        
        for (const originalUsedEntityDocument of payload.documents) {
            // Creating our ProductDishDocument
            const usedEntityDocument = new ProductDishDocument();
            usedEntityDocument.fill(originalUsedEntityDocument);

            // Checking if this (product | dish) is associated with this profile
            if (originalUsedEntityDocument.isProduct) {
                // ...product
                const product = await Product.findByOrFail('id', originalUsedEntityDocument.productId);
                if (!product.isPublic && product.authorId != auth.user!.id) throw new ActionForbiddenException(`Product with id ${ product.id } does not belong to you`);
            } else {
                // ...dish
                const dish = await Dish.findByOrFail('id', originalUsedEntityDocument.dishId);
                if (!dish.isPublic && dish.authorId != auth.user!.id) throw new ActionForbiddenException(`Dish with id ${ dish.id } does not belong to you`);
            };

            await usedEntityDocument.related('document').associate(document);
            await usedEntityDocument.save();
        };

        // await trx.commit();
        return await document.save();
    }
}