const joi = require('joi')

const updatePasswordValidation = joi.object({

    oldPassword: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .messages(),
    
    newPassword: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .messages(),
        
    })

module.exports = updatePasswordValidation