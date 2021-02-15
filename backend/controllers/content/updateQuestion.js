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
                
    const result = await performQuery(query) 
    return result

}


const updateQuestion = async (req, res) => {

    console.log('*Update Question*');

    // Obtener variables
    let reqData = req.params

    try {
        
        // Obtener, validar y corregir los datos de la pregunta
        const questionData = await questionValidation.validateAsync(req.body, {abortEarly: false})

        /*
        
            Crear objeto reqData. Contiene:

                - title
                - body
                - languages
                - tags
                - questionID
    
        */
        
        reqData = {...questionData, questionID: reqData.questionID}

        // Enviar a BD
        const result = await updateQuestionQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }        

        console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);
        
    } catch (e) {
        
        console.log(`Error updating question: ${e.message}`)
        res.status(400).send(e.message)
        return

    }

    res.send('Question updated')

}

module.exports = updateQuestion;