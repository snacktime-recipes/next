import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/getUnits', 'Unit/Unit.getUnits');
        Route.get('/getUnitsCoef', 'Unit/Unit.getUnitsCoef');
    })
    .middleware('')
    .prefix('/unit');