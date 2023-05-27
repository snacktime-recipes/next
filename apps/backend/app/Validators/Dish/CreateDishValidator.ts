import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RecipeStep from 'App/Models/RecipeStep'


export default class CreateDishValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */

  public ingredientSchema = schema.object().members({
    isDishIngredient: schema.boolean(),
    count: schema.number(),
    measureId: schema.number([
      rules.exists({
        table: 'measure_units',
        column: 'id'
      })
    ]),
    productIngredientId: schema.number.optional([
      rules.exists({
        table: 'products',
        column: 'id'
      })
    ]),
    dishIngredientId: schema.number.optional([
      rules.exists({
        table: 'dishes',
        column: 'id'
      })
    ]),
    // alternatives: schema.array().members(this.ingredientSchema),
  })

  public recipeStepSchema = schema.object().members({
    name: schema.string(),
    stepNumber: schema.number(),
    activeTime: schema.number(),
    passiveTime: schema.number(),
    ingredients: schema.array().members(this.ingredientSchema),
  })

  public schema = schema.create({
    name: schema.string(),
    description: schema.string.optional(),
    isIngredient: schema.boolean(),
    categoryId: schema.number([
      rules.exists({
        table: 'dish_categories',
        column: 'id'
      })
    ]),
    isPublic: schema.boolean.optional(),
    recipeSteps: schema.array().members(this.recipeStepSchema)
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
