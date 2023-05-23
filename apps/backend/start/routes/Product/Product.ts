import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/list', 'ProductsControllers/Search.paginate');
        Route.get('/searchByName', 'ProductsControllers/Search.searchByName');
        Route.get('/searchByCategory', 'ProductsControllers/Search.searchByCategory');
        Route.post('/create', 'ProductsControllers/Product.create');
        Route.post('/createCategory', 'ProductsControllers/Product.createCategory');
    })
    .prefix('/product');