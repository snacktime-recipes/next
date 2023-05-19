import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.post('/encrypt', 'Internal/InternalHelpers.encrypt');
    })
    .middleware('internalAuth')
    .prefix('/internal/helpers');