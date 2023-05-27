import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/:id', 'ProductsControllers/Search.fetchById').middleware('silentAuth');
        Route.get('', 'ProductsControllers/Search.paginate').middleware('silentAuth');
        Route.get('/search', 'ProductsControllers/Search.search').middleware('silentAuth');
        
        Route.post('', 'ProductsControllers/Product.create').middleware('auth');
        Route.delete('/:id', 'ProductsControllers/Product.deleteById').middleware('auth');
        
        // @todo
        // Route.patch('/:id', 'ProductsControllers/Product.updateById')
    })
    .prefix('/products');