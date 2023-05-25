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
| new RuntimeException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class RuntimeException extends Exception {
    constructor(message = "Runtime exception") {
        super(message, 500, "E_RUNTIME_EXCEPTION");
    };
}
