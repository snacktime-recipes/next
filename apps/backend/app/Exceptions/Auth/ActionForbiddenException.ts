import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ActionForbiddenException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ActionForbiddenException extends Exception {
    constructor(message = "You are not permitted to do this") {
        super(message, 403, "E_ACTION_FORBIDDEN");
    };
}
