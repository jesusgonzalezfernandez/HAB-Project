const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const questionValidation = joi.object({

    title: joi
        .string()
        .trim()
        .max(200)
        .min(50)
        .required()
        .messages(),

    body: joi
        .string()
        .trim()
        .min(50)
        .max(3000)
        .required()
        .messages(),

    file: joi.any(),

    languages: joi
        .string()
        .min(2)
        .max(50)
        .required()
        .messages(),

    tags: joi
        .string()
        .min(2)
        .max(200)
        .messages(),
        
    })

module.exports = questionValidation