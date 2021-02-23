const performQuery = require('../../db/performQuery')

getVoteDataQuery = async data => {
    const query =

        `
            SELECT

            creationDate,
            updateDate,
            answerID,
            userID,
            value

        FROM votes WHERE answerID = ${data.answerID}
        
        `

        const result = ( await performQuery(query) ) [0]
        return result

}

const getVotes = async (req, res) => {
    let voteData;

    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información del voto
        voteData = await getVoteDataQuery (reqData)

        // Si el voto no existe, se envía un error
        if (!voteData) {

            throw new Error ('Vote not found')
        
        } 
        
    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(voteData)

}

module.exports = getVotes