import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/:id', 'DishesControllers/Search.fetchByid').middleware('silentAuth');
        Route.get('', 'DishesControllers/Search.paginate');
        // @todo Route.get('/search', 'DishesControllers/Search.search').middleware('silentAuth');
        
        Route.post('', 'DishesControllers/Dish.create').middleware('auth');
        Route.delete('/:id', 'DishesControllers/Dish.deleteById').middleware('auth');
    })
    .prefix('/dishes');