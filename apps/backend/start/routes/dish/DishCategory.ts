import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('', 'DishesControllers/Categories.paginate');
        Route.get('/:id', 'DishesControllers/Categories.fetchById');
        Route.post('', 'DishesControllers/Categories.create').middleware('internalAuth');
    })
    .prefix('/dishes/categories');