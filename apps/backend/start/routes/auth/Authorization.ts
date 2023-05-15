import Route from '@ioc:Adonis/Core/Route'

export default Route
    .group(() => {
        Route.get('/me', 'Auth/AuthController.me');
        Route.post('/login', 'Auth/AuthController.login');
        Route.post('/register', 'Auth/AuthController.register');
        Route.post('/logout', 'Auth/AuthController.logout').middleware('auth');
    })
    .prefix("/auth")