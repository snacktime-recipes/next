import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/productsList', 'Products/ProductsController.getProducts');
        Route.get('/searchProductByName', 'Products/ProductsController.searchProductsByName');
        Route.get('/searchProductByCategory', 'Products/ProductsController.searchProductsByCategory');
    })
    .middleware('')
    .prefix('/product');