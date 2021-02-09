const joi = require('joi')

const updatePasswordValidation = joi.object({

    oldPassword: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .error(
            new Error('Invalid Old Password')
        ),
    
    newPassword: joi
        .string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .error(
            new Error('Invalid New Password')
        )
        
    })

module.exports = updatePasswordValidation