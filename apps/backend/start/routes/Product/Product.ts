import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/productsList', 'Products/ProductsController.getProducts');
        Route.get('/productsList', 'Products/ProductsController.searchProductsByName');
        Route.get('/productsList', 'Products/ProductsController.searchProductsByCategory');
    })
    .middleware('')
    .prefix('/product');