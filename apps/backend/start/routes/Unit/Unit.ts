import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/list', 'UnitsController/Search.list');
        Route.post('/searchByName', 'UnitsController/Search.searchByName');
        Route.post('/getCoefficient', 'UnitsController/Search.getCoefficient')
    })
    .prefix('/units');