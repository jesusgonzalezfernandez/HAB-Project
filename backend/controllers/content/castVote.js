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

    const result = await performQuery(query) 
    return result
    
}

const castVote = async (req, res) => {

    console.log('*Caste Vote*');

    let query;

    // Obtener variables
    let { answerID } = req.params;
    let { value } = req.query
    let { userID } = req.auth

    /*
    
        Crear objeto reqData. Contiene:

            - answerID
            - value
            - userID

    */
    
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

                throw new Error('User does not exist')

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

                throw new Error('Vote already exists')

            }

        // Enviar a BD
        const result = await castVoteQuery(reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }        

        console.log(`Successfully Inserted. Affected Rows: ${result.affectedRows}`);
            
    } 
        
    catch (e) {

        console.log(`Error casting vote: ${e.message}`)
        res.status(400).send(e.message)
        return

    }

    res.send('Vote Registered')

}

module.exports = castVote;