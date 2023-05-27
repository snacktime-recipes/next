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
| new ProvidedDishIsNotIngredientException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ProvidedDishIsNotIngredientException extends Exception {
    constructor(message = "Provided dish is not an ingredient", status = 400, code = "E_PROVIDED_DISH_IS_NOT_INGREDIENT") {
        super(message, status, code);
    };
}
