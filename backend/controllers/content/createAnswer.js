// Módulos
const answerValidation = require ('../../validators/answerValidation') 

// Queries
const performQuery = require('../../db/performQuery')



const createAnswerQuery = async data => {


    const query = 

    `
        
        INSERT INTO answers ( 

            creationDate,
            updateDate,
            userID,
            questionID,
            body,
            file 

        )

        VALUES ( 

            UTC_TIMESTAMP, 
            UTC_TIMESTAMP, 
            '${data.userID}', 
            '${data.questionID}',
            '${data.body}',
            '${data.file}'
        
        )

    `

    await performQuery (query)

}



const createAnswer = async (req, res) => {

    let query;

    // Obtener variables
    const { questionID, file } = req.params
    const token = req.auth
    let reqData = req.body

    try {

        // Obtener, validar y corregir los datos de la pregunta
        reqData = await answerValidation.validateAsync(reqData)
console.log(reqData);
        // Procesar los datos

            // Añadir el ID del usuario & ID de la pregunta & File
            reqData = {
                ...reqData, 
                userID: token.userID, 
                questionID: questionID,
                file: file 
            }

        // Enviar a BD
        await createAnswerQuery (reqData)

    } 
    
    catch (e) {
        
        res.status(400).send(e.message)
        return

    }

    res.send('Your answer is posted')

}

module.exports = createAnswer