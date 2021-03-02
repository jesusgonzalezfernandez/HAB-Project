// Queries
const performQuery = require('../../db/performQuery')

const getUserProfileDataQuery = async userID => {

    const query = 
        
        `
            SELECT * FROM users WHERE id = ${userID}
            
        `

    const result = await performQuery(query)
    return result

}

const getUserLanguagesQuery = async userID => {

    const query = 
        
        `
            SELECT languages.name FROM languages
                JOIN users_languages ON users_languages.languageID = languages.id 
                JOIN users ON users.id = users_languages.userID
            WHERE users.id = '${userID}'
        `

    const result = await performQuery(query)
    return result

}

const getUserQuestionsQuery = async userID => {

    const query = 
        
        `
            SELECT * FROM questions WHERE userID = ${userID}
            
        `

    const result = await performQuery(query)
    return result

}

const getQuestionLanguagesQuery = async questionID => {

    let query =

        `
            SELECT languages.name FROM languages
                JOIN questions_languages ON questions_languages.languageID = languages.id 
                JOIN questions ON questions.id = questions_languages.questionID
            WHERE questions.id = '${questionID}'
        `

    const result = await performQuery(query)
    return result

}

const getQuestionAnswersQuery = async questionID => {

    let query = 

        `
            SELECT * FROM answers WHERE questionID = ${questionID}
        `
    
    const result = await performQuery(query)
    return result
    
}

const getUserAnswersQuery = async userID => {

    const query = 
        
        `
            SELECT * FROM answers WHERE userID = ${userID}
            
        `

    const result = await performQuery(query)
    return result

}

const getUserProfileData = async (req, res) => {

    console.log('* Get User Profile Data *');

    let userData;
    let userLanguages;
    let userQuestionsComplete = [];
    let userAnswers;
    
    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información del usuario target
        userData = await getUserProfileDataQuery (reqData.userID)

        // Si el usuario target no existe, se envía un error
        if (!userData) {

            throw new Error ('User not found')
        
        }
        
        // Si el usuario target es admin y el usuario del request NO es admin, se envía otro error
        if (userData.role === 'admin' && !reqData.token.isAdmin) {
        
            throw new Error ('Resource not available')
                
        } 

        // Obtener array de lenguajes del usuario target
        userLanguages = await getUserLanguagesQuery(reqData.userID)

        // Obtener array de preguntas del usuario target
        userQuestions = await getUserQuestionsQuery(reqData.userID)

        // Obtener el array de lenguajes y respuestas a cada pregunta
        for (let question of userQuestions) {

            // Crear dos campos languages y answers e inicializar a array vacío
            question = {...question, languages:[], answers: []}
            
            // Obtener lenguajes de la pregunta
            const languages = await getQuestionLanguagesQuery(question.id)

            // Añadir cada lenguaje al array dentro del objeto question
            for (language of languages) {
                question.languages.push(language.name)
            }

            const answers = await getQuestionAnswersQuery(question.id)
            
            
            for (answer of answers) {
                question.answers.push(answer)
            }

            userQuestionsComplete.push(question)
            
        }

        // Obtener array de respuestas del usuario target
        userAnswers = await getUserAnswersQuery(reqData.userID)

    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }
    
    const response = {
        user: userData,
        languages: userLanguages.map(l => l.name),
        questions: userQuestionsComplete,
        answers: userAnswers
    }

    console.log(response);

    // console.log(response);
    res.send(response)
}

module.exports = getUserProfileData;