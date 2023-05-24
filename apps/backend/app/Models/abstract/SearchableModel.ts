import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { Document, Schema } from "@orama/orama";
import Logger from "@ioc:Adonis/Core/Logger";
import AbstractModelSearchProvider from "App/Search/AbstractModelSearchProvider";

export default class SearchableModel extends BaseModel {
    private static instance?: AbstractModelSearchProvider;
    private static wasReconciled = false;

    public static async _getSearchInstanceWrapper<T extends Document>(defaultSchema: Schema): Promise<AbstractModelSearchProvider<T>> {
        // Checking if if we initialized our instance or no
        if (!this.instance) {
            this.instance = await AbstractModelSearchProvider.createForSchema(defaultSchema);
            
            console.log("creating new instance");

            // Asking our model to reconcile
            if (!this.wasReconciled) {
                console.log("not reconciled");

                Logger.info(`Starting search reconcilation process for ${ this.name }`);
                await this.reconlinceSearchDocuments(this.instance);

                this.wasReconciled = true;
            };

            return this.instance;
        } else {
            return this.instance;
        }
    };

    public static async reconlinceSearchDocuments(instance: AbstractModelSearchProvider) {
        throw new Error(`Reconcile method for ${ this.name } extends SearchableModel not implemented`);
    };
};