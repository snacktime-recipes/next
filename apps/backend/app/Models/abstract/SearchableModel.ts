import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { Document, Schema } from "@orama/orama";
import Logger from "@ioc:Adonis/Core/Logger";
import AbstractModelSearchProvider from "App/Search/AbstractModelSearchProvider";
import RuntimeException from "App/Exceptions/RuntimeException";

export default class SearchableModel extends BaseModel {
    private static instance?: AbstractModelSearchProvider;
    private static wasReconciled = false;

    public static async _getSearchInstanceWrapper<T extends Document>(defaultSchema: Schema): Promise<AbstractModelSearchProvider<T>> {
        // Checking if if we initialized our instance or no
        if (!this.instance) {
            this.instance = await AbstractModelSearchProvider.createForSchema(defaultSchema);
            
            // Asking our model to reconcile
            if (!this.wasReconciled) {
                Logger.debug(`Starting search reconcilation process for ${ this.name }`);
                await this.reconlinceSearchDocuments(this.instance);

                this.wasReconciled = true;
            };

            return this.instance;
        } else {
            return this.instance;
        }
    };

    public static async reconlinceSearchDocuments(_: AbstractModelSearchProvider) {
        throw new RuntimeException(`Reconcile method for ${ this.name } extends SearchableModel not implemented`);
    };
};