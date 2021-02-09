// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery')

let query;
let user;

const validateUserQuery = async code => {

    try {
    
        query = 
        
            `
                UPDATE users SET active = 1, validationCode = '' WHERE validationCode = '${code}'
            `
            
        await performQuery (query)

    } catch (e) {

        throw new Error('Validation Error')
        return

    }

}

const validateUser = async (req, res) => {

    // Obtener variables
    let reqData = req.params;

    try {

        /* 
        
            Pablo.
                - Había un bug, al hacer la validación de un usuario
                  se validaban también los demás 
                - Separé el SELECT del UPDATE para aprovechar
                  el getUserQuery.

        */

        // Comprobar si el usuario existe

            console.log('Checking User');

            // Obtener query (como solo hay un campo 'code', se puede enviar directamente)
            query = getUserQuery (reqData)

            // Procesar query
            user = ( await performQuery (query) ) [0] 

            // Error
            if (!user) {

                throw new Error ('Unknown User')

            }
        
        // Actualizar BD
        await validateUserQuery (reqData.code)
        
    } catch (e) {

        res.status(401).send(e.message)
        return

    }

    res.send('User Validated Correctly')

}

module.exports = validateUser