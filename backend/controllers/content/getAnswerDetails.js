const performQuery = require('../../db/performQuery')

const getAnswerDataQuery = async data => {
    const query = 
        
        `

            SELECT 
                
                questionID,  
                userID, 
                body, 
                file, 
                creationDate,
                updateDate 
                
            FROM answers WHERE id = ${data.questionID}
            
        `

    const result = ( await performQuery(query) ) [0]
    return result

}

const getAnswerDetails = async (req, res) => {

    let answerData;

    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información de la pregunta
        answerData = await getAnswerDataQuery (reqData)

        // Si la pregunta no existe, se envía un error
        if (!answerData) {

            throw new Error ('User not found')
        
        } 
        
    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(answerData)

}

module.exports = getAnswerDetails

