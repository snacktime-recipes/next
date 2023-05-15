import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnitsController {

    public async getUnits({ response } : HttpContextContract){
        response.send("Not implemented");
    }

    public async getUnitsCoef({ response } : HttpContextContract){
        response.send("Not implemented");
    }

}
