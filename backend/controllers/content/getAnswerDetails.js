const performQuery = require('../../db/performQuery')

const getAnswerDataQuery = async data => {
    let query =

        `
            SELECT
                answers.id AS answerID,   
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
            JOIN questions
            ON  questions.id = answers.questionID
            WHERE answers.parentID is null
            AND questions.id = ${data.questionID}
            
        `
 
    const result = await performQuery (query)
    return result

}

const getAnswerVotesQuery = async data => {

    let query = 

    `SELECT COUNT(*) AS count FROM votes WHERE value = 1 and answerID = ${data.answerID}`

    const result = (await performQuery (query)) [0]
    return result
}

const getAnswerDetails = async (req, res) => {

    console.log(`>>> getAnswerDetails`)
    let answerData;

    // Obtener variables
    let reqData = req.params
    reqData = { ...reqData, token: req.auth }

    try {

        // Obtener información de la pregunta
        questionAnswers = await getAnswerDataQuery(reqData)

        // Si la pregunta no existe, se envía un error
        if (!questionAnswers) {

            throw new Error('Answer not found')

        }

    // Query de votos
    
    let answerVotes = []

    for (answer of questionAnswers) {

        votesCount = await getAnswerVotesQuery(answer)
        answerData = {...answer, votes: votesCount.count}
    }

    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(answerData)

}

module.exports = getAnswerDetails