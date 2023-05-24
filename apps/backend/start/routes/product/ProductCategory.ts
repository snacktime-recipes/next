import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.post('', 'ProductsControllers/Categories/Category.create');

        // @todo:
        // Route.get('', 'ProductsControllers/Categories/Search.paginate')
        // Route.get('/:id', 'ProductsControllers/Categories/Category.fetchById')
    })
    .prefix('/product/category');