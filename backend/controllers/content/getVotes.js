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

    const result = await performQuery(query)
    return result

}

const getVotes = async (req, res) => {

    console.log('* Get Votes *');

    let voteData;

    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información del voto
        votes = await getVoteDataQuery (reqData)

        // Si el voto no existe, se envía un error
        if (!votes) {

            throw new Error ('Vote not found')
        
        }
        
    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(votes)

}

module.exports = getVotes