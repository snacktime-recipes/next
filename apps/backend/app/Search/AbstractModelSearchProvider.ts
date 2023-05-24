import { Document, Orama, Schema, SearchParams, create, insert, search } from '@orama/orama';

export default class AbstractModelSearchProvider<T extends Document = Document> {
    constructor(
        private readonly instance: Orama,
    ) {};

    // --------------------------------------------------------------------------
    // Methods
    public async insert(entry: T) {
        return await insert(this.instance, entry);
    };

    public async search(params: SearchParams) {
        return await search(this.instance, params);
    };

    // --------------------------------------------------------------------------
    // Builders
    public static async createForSchema<T extends Document>(schema: Schema) {
        // Creating new orama instance for this schema
        const instance = await create({
            schema
        });

        return new AbstractModelSearchProvider<T>(instance);
    };
};