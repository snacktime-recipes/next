import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import EncryptStringValidator from 'App/Validators/Internal/EncryptStringValidator';

export default class InternalHelpersController {
    public async encrypt({ request, response }: HttpContextContract) {
        const payload = await request.validate(EncryptStringValidator);
        response.send({ encrypted: await Hash.make(payload.string) });
    };
}
