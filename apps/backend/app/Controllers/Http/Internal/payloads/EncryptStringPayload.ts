import { schema } from '@ioc:Adonis/Core/Validator'

export const EncryptStringPayload = schema.create({
    string: schema.string(),

    // @todo
    // encryption settings?
});
