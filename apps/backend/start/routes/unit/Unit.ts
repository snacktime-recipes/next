import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.post('', 'UnitsControllers/Unit.create').middleware("internalAuth")
        // @todo Route.get('', 'UnitsController/Search.paginate');
        // @todo Route.get('/:id', 'UnitsController/Search.fetchById');
        // @todo Route.post('/search', 'UnitsController/Search.search');
        // @todo Route.get('/:fromMeasure/:toMeasure?count=2', 'UnitsController/Conversions.convert');
    })
    .prefix('/units');