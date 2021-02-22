const getUserQuery = require ('../queries/getUserQuery')
const getQuestionQuery = require ('../queries/getQuestionQuery')
const getAnswerQuery = require ('../queries/getAnswerQuery')
const getVoteQuery = require ('../queries/getVoteQuery')
const performQuery = require('../db/performQuery')



const isAuthor = async (req, res, next) => {

    console.log('* Checking Authorship *');

    let query;

    // Obtener variables
    const token = req.auth
    const reqData = {...req.params, token}

    try{

        // Obtener el usuario que solicita acceso
        
            // Crear objeto userID
            let userID = token.userID
            userID = { userID }

            // Obtener query
            query = await getUserQuery (userID)

            // Procesar query
            reqUser = ( await performQuery (query) ) [0]

        // Obtener el autor del elemento

            // Si el elemento es una pregunta (solo tiene el id de una pregunta)
            if(reqData.questionID && !reqData.answerID && !reqData.voteID){

                console.log('Analyzing question authorship');

                // Crear objeto questionID
                let questionID = reqData.questionID
                questionID = { questionID }

                // Obtener query
                query = await getQuestionQuery (questionID)

                // Procesar query
                question = ( await performQuery (query) ) [0]

                // Error
                if (!question) {

                    throw new Error ('Question not found')

                }

                // Comparar userIDs
                if(question.userID !== reqUser.id) {

                    throw new Error ('Not Authorized')

                }

            }

            // Si el elemento es una respuesta (tiene el id de una pregunta y una respuesta)
            if(reqData.questionID && reqData.answerID && !reqData.voteID){

                console.log('Analyzing answer authorship');

                // Crear objeto answerID
                let answerID = reqData.answerID
                answerID = { answerID }

                // Obtener query
                query = await getAnswerQuery (answerID)

                // Procesar query
                answer = ( await performQuery (query) ) [0]

                // Error
                if (!answer) {
                
                    throw new Error ('Answer not found')
                
                }

                // Comparar userIDs
                if(answer.userID !== reqUser.id) {

                    throw new Error ('Not Authorized')

                }

            }

            // Si el elemento es un voto
            if(reqData.voteID){

                console.log('Analyzing vote authorship');

                // Crear objeto voteID
                let voteID = reqData.voteID
                voteID = { voteID }

                // Obtener query
                query = await getVoteQuery (voteID)

                // Procesar query
                vote = ( await performQuery (query) ) [0]
                
                // Error
                if (!vote) {
                
                    throw new Error ('Vote not found')
                
                }

                // Comparar userIDs
                if(vote.userID !== reqUser.id) {

                    throw new Error ('Not Authorized')

                }

            }
        
    } catch (e) {

        console.log('* User Is Not The Author *');
        res.status(401).send(e.message)
        return

    }

    console.log('The user is the author');

    next()

}

module.exports = isAuthor;