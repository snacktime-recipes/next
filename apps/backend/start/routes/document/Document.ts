import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.post('', 'DocumentsControllers/Document.create').middleware('auth');
        Route.get('', 'DocumentsControllers/Search.paginate').middleware('auth');
        Route.get('/:id', 'DocumentsControllers/Search.fetchById').middleware('auth');
        // @todo Route.post('/search', 'DocumentsControllers/Search.search');
    })
    .prefix('/documents');