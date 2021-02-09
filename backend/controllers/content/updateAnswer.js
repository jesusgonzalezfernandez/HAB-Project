const answerValidation = require ('../../validators//answerValidation') 
const performQuery = require('../../db/performQuery')

const updateAnswerQuery = async data => {

    const query = 
    
        `
            UPDATE answers SET 
                
                body = '${data.body}',
                file = '${data.file}',
                updateDate = UTC_TIMESTAMP,
                
            WHERE id = ${data.answerID}
        `
                
    await performQuery(query)

}

const updateAnswer = async (req, res) => {

    // Obtener variables
    let reqData = req.params

    try {
        
        // Obtener, validar y corregir los datos de la respuesta
        const answerData = await answerValidation.validateAsync(req.body, {abortEarly: false})

        // Añadir a reqData
        reqData = {...answerData, answerID : reqData.answerID}

        // Enviar a BD
        await updateAnswerQuery (reqData)


    } catch (e) {

        res.status(400).send(e.message)
        return
        
    }

    res.send('Answer updated')

}

module.exports = updateAnswer