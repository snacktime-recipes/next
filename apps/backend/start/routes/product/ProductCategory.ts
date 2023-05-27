import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.post('', 'ProductsControllers/Categories/Category.create').middleware('internalAuth');
        Route.get('/:id', 'ProductsControllers/Categories/Search.fetchById')

        // @todo:
        // Route.get('', 'ProductsControllers/Categories/Search.paginate')
    })
    .prefix('/products/categories');