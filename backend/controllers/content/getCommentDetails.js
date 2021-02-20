const performQuery = require('../../db/performQuery')

const getCommentDataQuery = async data => {
    let array = []
    let query =

        `

            SELECT   
                answers.questionID,  
                answers.userID,
                answers.parentID,
                answers.body, 
                answers.file, 
                answers.creationDate,
                answers.updateDate,
                users.username,
                users.avatar
                
            FROM answers
            JOIN users
            ON users.id = answers.userID
            where answers.parentID = ${data.parentID}
            
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