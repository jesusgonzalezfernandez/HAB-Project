// Queries
const performQuery = require('../../db/performQuery')



const getUserDataQuery = async userID => {

    const query = 
        
        `

            SELECT 
                
                username,  
                name, 
                role, 
                avatar,
                lastConnection 
                
            FROM users WHERE id = ${userID}
            
        `

    const result = ( await performQuery(query) ) [0]
    return result

}


const getUserData = async (req, res) => {

    let userData;
    
    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información del usuario
        userData = await getUserDataQuery (reqData.userID)

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

    res.send(userData)
}

module.exports = getUserData;
