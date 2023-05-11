import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class InternalAuth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const allowedKeys = Env.get('INTERNAL_KEYS').split(',');
    const key = request.header("Authorization")?.replace("Bearer", "").trim();
    
    // Checking if our ENV variable have this key or no
    if (key == null || !allowedKeys.includes(key)) throw new AuthenticationException(
      'Unathorized access',
      'E_UNAUTHORIZED_ACCESS'
    );

    await next()
  }
}
