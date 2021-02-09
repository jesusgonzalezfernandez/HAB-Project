const questionValidation = require ('../../validators/questionValidation') 
const performQuery = require('../../db/performQuery')


const updateQuestionQuery = async data => {

    const query = 
    
        `
            
            UPDATE questions SET 
                
                title = '${data.title}',
                body = '${data.body}',
                file = '${data.file}',
                tags = '${data.tags}',
                body = '${data.body}',
                updateDate = UTC_TIMESTAMP
                
            WHERE id = ${data.questionID}

        `
                
    await performQuery(query)

}


const updateQuestion = async (req, res) => {

    // Obtener variables
    let reqData = req.params

    try {
        
        // Obtener, validar y corregir los datos de la pregunta
        const questionData = await questionValidation.validateAsync(req.body, {abortEarly: false})

        // Añadir a reqData
        reqData = {...questionData, questionID: reqData.questionID}

        // Enviar a BD
        await updateQuestionQuery (reqData)
        
    } catch (e) {
        
        res.status(400).send(e.message)
        return

    }

    res.send('Question updated')

}

module.exports = updateQuestion;