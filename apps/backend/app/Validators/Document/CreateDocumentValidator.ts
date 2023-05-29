import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentType from 'App/Types/Document/DocumentType'

export default class CreateDocumentValidator {
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
  public productOrDishDocumentsSchema = schema.object().members({
    isProduct: schema.boolean(),
    count: schema.number([
      rules.range(0, Number.MAX_VALUE),
    ]),
    measureUnitId: schema.number([
      rules.exists({
        table: 'measure_units',
        column: 'id'
      })
    ]),
    productId: schema.number.optional([
      rules.exists({
        table: 'products',
        column: 'id'
      })
    ]),
    dishId: schema.number.optional([
      rules.exists({
        table: 'dishes',
        column: 'id'
      }),
    ]),
  })

  public schema = schema.create({
    type: schema.enum(Object.values(DocumentType)),
    number: schema.number(),
    description: schema.string.optional(),
    documents: schema.array().members(this.productOrDishDocumentsSchema)
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