// Queries
const performQuery = require('../../db/performQuery')



const getUserProfileDataQuery = async userID => {

    const query = 
        
        `
            SELECT * FROM users WHERE id = ${userID}
            
        `

    const result = ( await performQuery(query) )
    return result

}

const getUserQuestionsQuery = async userID => {

    const query = 
        
        `
            SELECT * FROM questions WHERE userID = ${userID}
            
        `

    const result = ( await performQuery(query) )
    return result

}


const getUserAnswersQuery = async userID => {

    const query = 
        
        `
            SELECT * FROM answers WHERE userID = ${userID}
            
        `

    const result = ( await performQuery(query) )
    return result

}


const getUserProfileData = async (req, res) => {

    let userData;
    let userQuestions;
    let userAnswers;
    
    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información del usuario
        userData = await getUserProfileDataQuery (reqData.userID)

        // Si el usuario target no existe, se envía un error
        if (!userData) {

            throw new Error ('User not found')
        
        }

        userQuestions = await getUserQuestionsQuery (reqData.userID)
        userAnswers = await getUserAnswersQuery (reqData.userID)

        // Si el usuario target es admin y el usuario del request NO es admin, se envía otro error
        if (userData.role === 'admin' && !reqData.token.isAdmin) {

            throw new Error ('Resource not available')
        
        } 



    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }
    
    const userInfo = {
        user: userData,
        questions: userQuestions,
        answers: userAnswers
    }

    console.log(userInfo)

    res.send(userInfo)
}

module.exports = getUserProfileData;
