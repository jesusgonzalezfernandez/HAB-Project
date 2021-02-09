const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const updateUserValidation = joi.object({

    username: joi
        .string()
        .trim()
        .min(6)
        .required()
        .messages(),

    name: joi
        .string()
        .trim()
        .uppercase()
        .min(2)
        .max(50)
        .required()
        // .regex(RegExp(exp))
        .messages(),

    surname: joi
        .string()
        .trim()
        .uppercase()
        .min(2)
        .max(50)
        .required()
        // .regex(RegExp(exp))
        .messages(),

    birthDate: joi
        .date()
        .required()
        .messages(),

    country: joi
        .string()
        .trim()
        .uppercase()
        .required()
        .regex(RegExp(exp))
        .messages(),
        
    })

module.exports = updateUserValidation