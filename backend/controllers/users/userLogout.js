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

    await performQuery(query)
    
}

const userLogout = async (req, res) => {

    /*
    
        Pablo. He cambiado la forma de acceder al 
        ID del usuario. Creo que el controlador queda más limpio
        si en lugar de pedir un ID en el params
        cogemos ese ID directamente del token
    
    */

    // Obtener token
    const { auth } = req.headers;
    
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

        await userLogoutQuery(token.userID)

    } catch (e) {

        console.log(e.message);
        res.status(401).send('Still logged')
        return
    
    }

    res.send('Bye. See you soon')
    console.log('Logged-out user')

}

module.exports = userLogout