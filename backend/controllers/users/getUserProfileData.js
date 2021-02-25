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
    let userQuestions;
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

        // Obtener array de respuestas del usuario target
        userAnswers = await getUserAnswersQuery(reqData.userID)

    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }
    
    const response = {
        user: userData,
        languages: userLanguages,
        questions: userQuestions,
        answers: userAnswers
    }

    console.log(response);
    res.send(response)
}

module.exports = getUserProfileData;