// Queries
const performQuery = require('../../db/performQuery')



const getUserProfileDataQuery = async userID => {

    const query = 
        
        `

            SELECT 
                
                users.email, 
                users.name, 
                users.username,  
                users.surname, 
                users.role, 
                users.birthDate,
                users.country,
                users.languages,
                users.avatar,
                users.registrationDate,
                users.lastConnection,
                questions.title AS questions,
                answers.body AS answers

                FROM users
                INNER JOIN questions ON questions.userID = users.id
                INNER JOIN answers ON answers.userID = users.id
                
                WHERE users.id = ${userID}
            
        `

    const result = ( await performQuery(query) )
    return result

}


const getUserProfileData = async (req, res) => {

    let userData;
    
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

        // Si el usuario target es admin y el usuario del request NO es admin, se envía otro error
        if (userData.role === 'admin' && !reqData.token.isAdmin) {

            throw new Error ('Resource not available')
        
        } 

        const user = {
            email: userData.email,
            username: userData.username,
            name: userData.name,
            surname: userData.surname,
            role: userData.role,
            birthDate: userData.birthDate,
            country: userData.country,
            languages: userData.languages,
            avatar: userData.avatar,
            registrationDate: userData.registrationDate,
            lastConnection: userData.lastConnection,
            answers: [],
            questions: []
        }
        
        for (let i = 0; i < userData.length; i++) {
            user.answers.push(userData[i].answers)
            user.questions.push(userData[i].questions)
        }
        console.log(user)


    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }

    res.send(user)
}

module.exports = getUserProfileData;
