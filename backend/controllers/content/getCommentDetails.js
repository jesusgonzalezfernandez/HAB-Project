const performQuery = require('../../db/performQuery')

const getCommentDataQuery = async data => {
    let array = []
    let query =

        `

            SELECT   
                questionID,  
                userID,
                parentID,
                body, 
                file, 
                creationDate,
                updateDate 
                
            FROM answers where parentID = ${data.parentID}
            
        `

    

    const result = await performQuery (query)
    console.log(result)
    return result

}

const getCommentDetails = async (req, res) => {

    let answerData;

    // Obtener variables
    let reqData = req.params
    reqData = { ...reqData, token: req.auth }

    try {

        // Obtener información de la pregunta
        CommentData = await getCommentDataQuery(reqData)

        // Si la pregunta no existe, se envía un error
        if (!CommentData) {

            throw new Error('User not found')

        }

    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    console.log(CommentData)
    res.send(CommentData)

}

module.exports = getCommentDetails