import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConversionMeasureUnit from 'App/Models/ConversionMeasureUnit';
import MeasureUnit from 'App/Models/MeasureUnit';
import CreateUnitValidator from 'App/Validators/Unit/CreateUnitValidator';

export default class Unit {

    /*
    |--------------------------------------------------------------------------
    | POST /units
    |--------------------------------------------------------------------------
    |
    | description: Creates new measure unit.
    | middlewares: internalAuth
    | returns: MeasureUnitModule
    */
    public async create({ request, auth } : HttpContextContract){
        const payload = await request.validate(CreateUnitValidator);
        

        const unit = new MeasureUnit();
        
        unit.fill({
            name: payload.name,
            description: payload.description,
        });

        if(!payload.conversionMeasureUnits)
            return await unit.save();

        // Creating our recipe steps
        const conversionMeasureUnits: Array<ConversionMeasureUnit> = [];

        for (const originalconversionMeasureUnit of payload.conversionMeasureUnits) {
            const conversionMeasureUnit = new ConversionMeasureUnit();
            
            conversionMeasureUnit.fill({
                ...originalconversionMeasureUnit,
            });

            conversionMeasureUnits.push(conversionMeasureUnit);
            await conversionMeasureUnit.save();
        };

        // Associating our recipe steps with our dish
        await unit.related('conversionMeasureUnits').saveMany(conversionMeasureUnits);
        
        return await unit.save();
    }

}