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


    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }
    const userInfo = {
        email: userData[0].email,
        username: userData[0].username,
        name: userData[0].name,
        surname: userData[0].surname,
        role: userData[0].role,
        birthDate: userData[0].birthDate,
        country: userData[0].country,
        languages: userData[0].languages,
        avatar: userData[0].avatar,
        registrationDate: userData[0].registrationDate,
        lastConnection: userData[0].lastConnection,
        answers: [],
        questions: []
    }
    
    for (let i = 0; i < userData.length; i++) {
        userInfo.answers.push(userData[i].answers)
        userInfo.questions.push(userData[i].questions)
    }
    console.log(userInfo)

    res.send(userInfo)
}

module.exports = getUserProfileData;
