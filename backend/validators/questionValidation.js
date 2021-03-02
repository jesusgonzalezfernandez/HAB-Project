const joi = require('joi')

const exp = /^[a-zA-Z]+$/

const questionValidation = joi.object({

    title: joi
        .string()
        .trim()
        .max(200)
        .min(10)
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
        .array()
        .required()
        .messages(),

    tags: joi
        .array()
        .required()
        .messages(),
        
    })

module.exports = questionValidation