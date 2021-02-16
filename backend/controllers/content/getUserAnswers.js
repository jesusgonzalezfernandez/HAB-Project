const performQuery = require('../../db/performQuery')

const getAnswerDataQuery = async data => {
    let query =

        `

            SELECT   
                id,
                questionID,
                userID,   
                body, 
                file, 
                creationDate,
                updateDate 
                
            FROM answers

            WHERE userID = ${data.userID}
            
        `
    

    const result = await performQuery (query)
    return result

}

const getUserAnswers = async (req, res) => {

    let answerData;

    // Obtener variables
    let reqData = req.params
    reqData = { ...reqData, token: req.auth }

    try {

        // Obtener información de la respuesta
        answerData = await getAnswerDataQuery(reqData)

        // Si la respuesta no existe, se envía un error
        if (!answerData) {

            throw new Error('User not found')

        }

    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(answerData)

}

module.exports = getUserAnswers
