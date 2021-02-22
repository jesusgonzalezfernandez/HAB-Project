const getQuestionQuery = require ('../queries/getQuestionQuery')
const performQuery = require ('../db/performQuery')


const isExpert = async (req, res, next) => {

    console.log('* Checking User Role *');

    let query;

    // Obtener variables
    const token = req.auth

    /*
    
        Crear objeto reqData. Contiene:

            - questionID
            - token

    */
    
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
        if (token.userID === questionData.userID || token.isExpert || token.isAdmin ){
            
            console.log('- User Has Expert Role, Is Admin, Or Is Author -');
            next()

        } else {

            throw new Error('Not authorized')

        }

    } catch (e) {

        console.log('X Role Error X');
        res.status(401).send(e.message)
        return

    }
    
}

module.exports = isExpert;