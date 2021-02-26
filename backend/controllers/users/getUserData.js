// Queries
const performQuery = require('../../db/performQuery')
const getUserDataQuery = async userID => {

    const query = 
        
        `

            SELECT * FROM users WHERE id = ${userID}
            
        `

    const result = ( await performQuery(query) ) [0]
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

const getUserData = async (req, res) => {

    console.log('* Get User Data *');

    let userData;

    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información del usuario target
        userData = await getUserDataQuery (reqData.userID)

        // Si el usuario target no existe, se envía un error
        if (!userData) {

            throw new Error ('User not found')
        
        } 

        // Si el usuario target es admin y el usuario solicitante NO es admin, se envía otro error
        if (userData.role === 'admin' && !reqData.token.isAdmin) {

            throw new Error ('Resource not available')
        
        }

        // Obtener array de lenguajes del usuario target
        userData.languages = await getUserLanguagesQuery (userData.id)

    } catch (e) {
        
        res.status(500).send(e.message)
        return
        
    }
    
    // Construir respuesta para el front limitando los campos
    const response = {
        username: userData.username,
        name: userData.name,
        role: userData.role,
        country: userData.country,
        avatar: userData.avatar,
        lastConnection: userData.lastConnection,
        registrationDate: userData.registrationDate,
        languages: userData.languages
    }

    res.send(response)
}

module.exports = getUserData;