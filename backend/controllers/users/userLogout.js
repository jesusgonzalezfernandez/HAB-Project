// Dependencias
const jwt = require('jsonwebtoken')

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require ('../../db/performQuery')



const userLogoutQuery = async userID => {

    const query = 

        `
            UPDATE users SET

                updateDate = UTC_TIMESTAMP,
                token = null,
                lastConnection = UTC_TIMESTAMP

            WHERE id = ${userID}
        `

    const result = await performQuery(query) 
    return result
    
}

const userLogout = async (req, res) => {

    console.log('*User Logout*');

    // Obtener variables
    const { auth } = req.headers;
    const { userID } = req.params;
    
    /* 
    
        Crear objeto reqData. Contiene

            - token
            - userID

    */

    let reqData = { auth, userID}

    try {
    
        // Decodificar token
        const token = jwt.verify(auth, process.env.SECRET)

        // Comprobar si el usuario existe

            // Crear objeto ID
            let userID = token.userID
            userID = { userID }

            const user = await getUserQuery(userID)

            if (!user) {

                res.status(401).send('User not found')
                return
            
            }

        const result = await userLogoutQuery(token.userID)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Succesfully Updated. Affected Rows: ${result.affectedRows} `);

    } catch (e) {

        res.status(401).send(e.message)
        console.log(`Error Logging Out: ${e.message}`);
        return
    
    }

    res.send('Bye. See you soon')

}

module.exports = userLogout