const joi = require('joi')

const resetValidation = joi.object({
    
    email: joi
        .string()
        .trim()
        .email()
        .lowercase()
        .required()
        .messages(),

    password: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .messages(),

    code: joi
        .string()
        .trim()
        .length(40)
        .required()
        .messages(),
        
})

module.exports = resetValidation