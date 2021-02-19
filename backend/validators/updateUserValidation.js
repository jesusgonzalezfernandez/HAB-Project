const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const updateUserValidation = joi.object({

    avatar: joi
        .string(),

    username: joi
        .string()
        .trim()
        .min(6)
        .messages(),

    name: joi
        .string()
        .trim()
        .uppercase()
        .min(2)
        .max(50)
        // .regex(RegExp(exp))
        .messages(),

    surname: joi
        .string()
        .trim()
        .uppercase()
        .min(2)
        .max(50)
        // .regex(RegExp(exp))
        .messages(),

    birthDate: joi
        .date()
        .messages(),

    country: joi
        .string()
        .trim()
        .uppercase()
        .regex(RegExp(exp))
        .messages(),
        
    })

module.exports = updateUserValidation