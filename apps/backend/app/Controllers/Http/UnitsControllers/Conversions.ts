import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConversionMeasureUnit from 'App/Models/ConversionMeasureUnit'
import NotFoundException from 'App/Exceptions/NotFoundException';
import InvalidPayloadException from 'App/Exceptions/Payload/InvalidPayloadException';

export default class Conversions {
    public async convert({params, request}: HttpContextContract){
        const conversion = await ConversionMeasureUnit.query()
            .where('measureUnitFromId', params.fromMeasure)
            .where('measureUnitToId', params.toMeasure)
            .first();
        
        if (!conversion) throw new NotFoundException('Conversion not found');
        if (Number.isNaN(parseInt((request.input("count"))))) throw new InvalidPayloadException('Count must be a number');
        
        return conversion.coefficient * parseInt(request.input("count"));
    }
}