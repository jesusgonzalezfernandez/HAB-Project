// Dependencias
const jwt = require('jsonwebtoken');

// Queries
const getUserQuery = require('../queries/getUserQuery')
const performQuery = require('../db/performQuery')



const isAuthenticated = async (req, res, next) => {

    console.log('Verifying Token');
    // Obtener variables
    const { auth } = req.headers;
    
    try {
        
        // Verificar y descifrar el token
        const token = jwt.verify(auth, process.env.SECRET);
        
        // Comprobar si el usuario existe / Obtener sus datos
        
        // Crear objeto userID
        let userID = token.userID
        userID = { userID }
        
        // Obtener query (Enviar sólo ID)
        const query = getUserQuery(userID)
        
        // Procesar query
        const user = ( await performQuery (query) ) [0] 
        
        // Error
        if (!user){
            
            throw new Error('Authorization Error')
            
        }
        
        // Comprobar si el token coincide con el de la BD
        
        if (user.token !== auth){
            
            throw new Error('Authorization Error')
            
        }

        // Procesar los datos

            // Añadir token al req.auth
            req.auth = token;

    } catch (e) {

        res.status(401).send(e.message)
        return
    
    }

    console.log('User Verified');
    next()

}

module.exports = isAuthenticated;