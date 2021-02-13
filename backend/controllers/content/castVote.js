const getAnswerQuery = require ('../../queries/getAnswerQuery')
const getUserQuery = require ('../../queries/getUserQuery')
const getVoteQuery = require ('../../queries/getVoteQuery')
const performQuery = require ('../../db/performQuery')


const castVoteQuery = async data => {

    const query = 

    `
        INSERT INTO votes ( 

            creationDate,
            updateDate,
            answerID,
            userID,
            value 

        )

        VALUES ( 

            UTC_TIMESTAMP, 
            UTC_TIMESTAMP, 
            '${data.answerID}', 
            '${data.userID}',
            '${data.value}'
        
        )
    `

    await performQuery (query)

}

const castVote = async (req, res) => {

    let query;

    // Obtener variables
    let { answerID } = req.params;
    let { value } = req.query
    let { userID } = req.auth

    // Crear objeto data
    const reqData = { answerID, value, userID }

    try {
        
        // Comprobar que existe la respuesta

            // Crear objeto answerID
            answerID = { answerID }

            // Obtener query
            query = getAnswerQuery (answerID)

            // Procesar query
            const answer = ( await performQuery(query) ) [0]

            // Error
            if (!answer) {

                throw new Error('Answer does not exist')

            }

        // Comprobar que existe el usuario

            // Crear objeto userID
            userID = { userID }

            // Obtener query
            query = getUserQuery (userID)

            // Procesar query
            const user = ( await performQuery(query) ) [0]

            // Error
            if (!user) {

                throw new Error('No Existe el Usuario')

            }

        // Comprobar si el voto ya existe

            // Crear objeto voteData
            let voteData = { userID: reqData.userID, answerID: reqData.answerID }

            // Obtener query
            query = getVoteQuery(voteData)

            // Procesar query
            const vote = ( await performQuery(query) ) [0]

            // Error
            if(vote) {

                throw new Error('Error en los Datos')

            }

        // Enviar a BD
        const result = await castVoteQuery(reqData)
        console.log(result);
            
    } 
        
    catch (e) {

        res.status(400).send(e.message)
        return

    }

    res.send('Registered vote')

}

module.exports = castVote;