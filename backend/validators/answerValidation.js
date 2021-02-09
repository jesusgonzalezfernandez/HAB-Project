const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const answerValidation = joi.object({

    body: joi
        .string()
        .trim()
        .min(50)
        .max(3000)
        .required()
        .messages(),

    file: joi.any()

        
    })

module.exports = answerValidation