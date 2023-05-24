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
| new ForbiddenPayloadValueException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ForbiddenPayloadValueException extends Exception {
    constructor(message = "Forbidden payload value") {
        super(message, 400, "E_FORBIDDEN_PAYLOAD_VALUE_EXCEPTION");
    }
}
