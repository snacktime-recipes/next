import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { CreateNewRecipeDTO } from './types';

export default class ProviderClass {
    constructor(private readonly app: ApplicationContract) {}
    
    private logger = this.app.container.resolveBinding('Adonis/Core/Logger');

    public async create(dto: CreateNewRecipeDTO) {
        this.logger.info(`DTO from RecipeProvider.create: ${JSON.stringify(dto)}`);
    };
};