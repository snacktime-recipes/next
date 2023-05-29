import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConversionMeasureUnit from 'App/Models/ConversionMeasureUnit'

export default class Conversions {
    public async convert({params, request}: HttpContextContract){
        const conversion = await ConversionMeasureUnit.query()
            .where('measureUnitFromId', params.fromMeasure)
            .where('measureUnitToId', params.toMeasure)
            .first();
        if(!conversion)
            throw new Exception('Conversion not found');
        
        return conversion.coefficient * parseInt(request.input("count"));
    }
}