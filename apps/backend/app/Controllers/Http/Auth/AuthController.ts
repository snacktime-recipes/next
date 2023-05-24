import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import Hash from '@ioc:Adonis/Core/Hash';
import AuthorizeProfileValidator from 'App/Validators/Auth/AuthorizeProfileValidator';
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException';
import NotFoundException from 'App/Exceptions/NotFoundException';
import RegisterProfileValidator from 'App/Validators/Auth/RegisterProfileValidator';
import { ProfileStatus } from '@snacktime/types';

export default class AuthController {
    /*
    |--------------------------------------------------------------------------
    | GET /auth/me
    |--------------------------------------------------------------------------
    |
    | description: Returns profile from current session (if exists)
    | exceptions: E_INVALID_AUTH_SESSION
    | returns: ProfileModel
    */
    public async me({ auth }: HttpContextContract) {
        return await auth.use('web').authenticate();
    };

    /*
    |--------------------------------------------------------------------------
    | POST /auth/login
    |--------------------------------------------------------------------------
    | 
    | description: Tries to authorize user using email/password
    | exceptions: NotFoundException("Profile not found"), InvalidCredentialsException()
    | returns: ProfileModel
    */
    public async login({ auth, request }: HttpContextContract) {
        const payload = await request.validate(AuthorizeProfileValidator);
        
        const profile = await Profile
            .query()
            .where('email', payload.email)
            .whereNot('status', ProfileStatus.BLOCKED)
            .firstOrFail()
            .catch(() => {
                throw new NotFoundException("Profile not found");
            });

        if (!(await Hash.verify(profile.password, payload.password))) {
            throw new InvalidCredentialException();
        };

        await auth.use('web').login(profile);
        return profile;
    };

    /*
    |--------------------------------------------------------------------------
    | POST /auth/register
    |--------------------------------------------------------------------------
    | 
    | description: Tries to register new profile using email/password
    | exceptions: 
    | returns: ProfileModel
    */
    public async register({ auth, request }: HttpContextContract) {
        // lastName, phone are optional
        const payload = await request.validate(RegisterProfileValidator);
        
        const profile = await Profile.create({
            email: payload.email,
            password: payload.password,
            name: payload.name,
            lastName: payload.lastName,
            phone: payload.phone,
            status: ProfileStatus.NOT_VERIFIED,
        });

        // todo
        // Sending email to confirm this profile

        await auth.use('web').loginViaId(profile.id, true);
        return profile;
    };

    /*
    |--------------------------------------------------------------------------
    | 
    |--------------------------------------------------------------------------
    |
    | description: Log outs current session
    | exceptions: AuthenticationException("E_UNAUTHORIZED_ACCESS")
    | middlewares: Auth
    | returns: nothing
    */
    public async logout({ auth }: HttpContextContract) {
        await auth.logout();
    };
}