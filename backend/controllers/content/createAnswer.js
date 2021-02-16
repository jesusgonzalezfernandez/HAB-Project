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
            parentID,
            questionID,
            body,
            file 

        )

        VALUES ( 

            UTC_TIMESTAMP, 
            UTC_TIMESTAMP, 
            '${data.userID}',
             ${data.parentID},
            '${data.questionID}',
            '${data.body}',
            '${data.file}'
        
        )

    `

    const result = await performQuery(query) 
    return result

}



const createAnswer = async (req, res) => {

    console.log('*Create Answer*');

    // Obtener variables
    const { questionID, parentID } = req.params
    const token = req.auth

    try {

        // Obtener, validar y corregir los datos
        let reqData = await answerValidation.validateAsync(req.body)

        /*
        
            Crear objeto reqData. Contiene:
    
                - body
                - userID
                - questionID
    
        */

        reqData = {
            ...reqData, 
            userID: token.userID, 
            questionID: questionID,
            parentID: parentID || null,
        }

        // Enviar a BD
        const result = await createAnswerQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }        

        console.log(`Successfully Inserted. Affected Rows: ${result.affectedRows}`);

    } 
    
    catch (e) {

        console.log(`Error creating answer: ${e.message}`)
        res.status(400).send(e.message)
        return

    }

    res.send('Your answer is posted')

}

module.exports = createAnswer