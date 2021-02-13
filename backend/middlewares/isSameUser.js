// Queries
const getUserQuery = require('../queries/getUserQuery')
const performQuery = require('../db/performQuery')



const isSameUser = async (req, res, next) => {

    console.log('* Checking User Permission *');

    // Obtener variables
    let { userID } = req.params;
    const token = req.auth

    /*
    
        Crear objeto reqData. Contiene:

            - token
            - reqID
    
    */

    let reqData = {...token, reqID: userID}

    try {

        // Comprobar si el usuario existe / Obtener sus datos

            // Crear objeto userID
            userID = { userID }

            // Obtener query (Enviar sólo ID)
            query = getUserQuery(userID)

            // Procesar query
            user = ( await performQuery (query) ) [0] 
            
            // Error
            if(!user) {

                throw new Error('The user does not exist')

            }

        // Comparar información del token y la BD

        // Si el usuario del req y el token coindicen / Si es admin
            if (parseInt(reqData.reqID) === reqData.userID || token.isAdmin) {

                console.log('- User Has Permission -');
                next()

            } else {
    
                throw new Error('User does not have permission')

            }

    } catch (e) {

        console.log('X Permission Error X');
        res.status(403).send(e.message)
        return
    
    }

}

module.exports = isSameUser;