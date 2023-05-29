import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.post('', 'UnitsControllers/Unit.create').middleware("internalAuth")
        Route.get('', 'UnitsControllers/Search.paginate');
        Route.get('/:id', 'UnitsControllers/Search.fetchById');
        Route.get('/:fromMeasure/:toMeasure?count=2', 'UnitsControllers/Conversions.convert');
        // @todo Route.post('/search', 'UnitsController/Search.search');
    })
    .prefix('/units');