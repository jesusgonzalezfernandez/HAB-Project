const answerValidation = require ('../../validators//answerValidation') 
const performQuery = require('../../db/performQuery')

const updateAnswerQuery = async data => {

    const query = 
    
        `
            UPDATE answers SET 
                
                body = '${data.body}',
                file = '${data.file}',
                updateDate = UTC_TIMESTAMP
                
            WHERE id = ${data.answerID}
        `
                
    const result = await performQuery(query) 
    return result

}

const updateAnswer = async (req, res) => {

    console.log('*Update Answer*');

    // Obtener variables
    let reqData = req.params

    try {
        
        // Obtener, validar y corregir los datos de la respuesta
        const answerData = await answerValidation.validateAsync(req.body, {abortEarly: false})

        /*
        
            Crear objeto reqData. Contiene: 

                - body
                - answerID
        
        */ 
        
        reqData = {...answerData, answerID : reqData.answerID}

        // Enviar a BD
        const result = await updateAnswerQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }        

        console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error updating answer: ${e.message}`)
        res.status(400).send(e.message)
        return
        
    }

    res.send('Answer updated')

}

module.exports = updateAnswer