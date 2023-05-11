import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EncryptStringPayload } from './payloads'
import Hash from '@ioc:Adonis/Core/Hash'

export default class InternalHelpersController {
    public async encrypt({ request, response }: HttpContextContract) {
        const payload = await request.validate({ schema: EncryptStringPayload });
        response.send({ encrypted: await Hash.make(payload.string) });
    };
}
