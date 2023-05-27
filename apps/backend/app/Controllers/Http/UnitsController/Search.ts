import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import ConversionMeasureUnit from 'App/Models/ConversionMeasureUnit';
import MeasureUnit from 'App/Models/MeasureUnit';

export default class Search {
    public async list({ request } : HttpContextContract){
         const page = parseInt(request.input('page', 1));
         const limit = parseInt(request.input('limit', 10));
         
 
         return await Database.from('measure_units').paginate(page, limit);
    }

    public async searchByName({ request } : HttpContextContract){
        const name = request.qs().name;
        const measureUnit = await MeasureUnit.query().where('name', name);
        return measureUnit;
    }

    public async getCoefficient({ request }: HttpContextContract){
        const nameMeasureFrom = request.input('nameFrom');
        const nameMeasureTo = request.input('nameTo');

        const measureUnitFrom = await MeasureUnit.findOrFail(nameMeasureFrom);
        const measureUnitTo = await MeasureUnit.findOrFail(nameMeasureTo);

        const searchCriteria = {
            measureUnitFrom: measureUnitFrom.id,
            measureUnitTo: measureUnitTo.id,
        }

        return (await ConversionMeasureUnit.findOrFail(searchCriteria)).coefficient;

    }
}
