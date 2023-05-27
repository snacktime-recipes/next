import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('', 'DishesControllers/Search.paginate');
        Route.post('', 'DishesControllers/Product.create');
        Route.get('/searchByName', 'DishesControllers/Search.searchByName');
        Route.get('/searchByCategory', 'DishesControllers/Search.searchByCategory');
    })
    .prefix('/dishes');