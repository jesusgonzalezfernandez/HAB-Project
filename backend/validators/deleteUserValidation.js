const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const deleteUserValidation = joi.object({

    reason: joi
        .string()
        .allow('')
        .trim()
        .max(500)
        .messages(),

    password: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .messages()
        
    })

module.exports = deleteUserValidation