const performQuery = require('../../db/performQuery')
// const { getQuestionDetailQuery } = require ('../../db/queriesDB')

const getQuestionDataQuery = async data => {

    const query = 
        
        `

            SELECT 
                
                title, 
                body,  
                file, 
                languages, 
                tags, 
                status,
                views,
                closeDate,
                creationDate,
                updateDate 
                
            FROM questions WHERE id = ${data.questionID}
            
        `

    const result = ( await performQuery(query) ) [0]
    return result

}

const getQuestionDetails = async (req, res) => {

    let questionData;

    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información de la pregunta
        questionData = await getQuestionDataQuery (reqData)

        // Si la pregunta no existe, se envía un error
        if (!questionData) {

            throw new Error ('User not found')
        
        } 
        
    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(questionData)

}

module.exports = getQuestionDetails