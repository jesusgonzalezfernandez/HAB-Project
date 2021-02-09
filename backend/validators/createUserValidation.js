const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const createUserValidation = joi.object({

    email: joi
        .string()
        .trim()
        .email()
        .required()
        .messages(),
    
    password: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .messages(),

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

    // Exige formato MM-DD-YYYY
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

module.exports = createUserValidation