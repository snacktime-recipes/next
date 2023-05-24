import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('', 'ProductsControllers/Search.paginate');
        Route.post('', 'ProductsControllers/Product.create');
        Route.get('/searchByName', 'ProductsControllers/Search.searchByName');
        Route.get('/searchByCategory', 'ProductsControllers/Search.searchByCategory');
    
        // @todo
        // Route.get('/:id', 'ProductsControllers/Product.fetchById')
        // Route.delete('/:id', 'ProductsControllers/Product.deleteById')
        // Route.patch('/:id', 'ProductsControllers/Product.updateById')
    })
    .prefix('/product');