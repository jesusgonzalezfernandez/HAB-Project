const getUserQuery = require ('../queries/getUserQuery')
const getQuestionQuery = require ('../queries/getQuestionQuery')
const performQuery = require ('../db/performQuery')


const isExpert = async (req, res, next) => {

    let query;

    // Obtener variables
    const token = req.auth
    const reqData = {...req.params, token}

    try {
    
        // Obtener el autor de la pregunta
            
            // Crear objeto questionID
            let questionID = reqData.questionID
            questionID = { questionID }

            // Obtener query
            query = getQuestionQuery (questionID)

            // Procesar query
            const questionData = ( await performQuery (query) ) [0]

        // Si la pregunta no existe
        if (!questionData) {

            throw new Error('Question does not exist')

        } 

        // Si el usuario que pregunta es el autor del post || es experto || o es admin...
        if (token.userID === questionData.userID || token.role === 'expert' || token.isAdmin ){
            
            console.log('User is authorized');

        } else {

            throw new Error('Not authorized')

        }



    } catch (e) {
        
        res.status(401).send(e.message)
        return

    }

    next()

}

module.exports = isExpert;