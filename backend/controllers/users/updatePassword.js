// Dependencias
const bcrypt = require('bcrypt');

// Módulos
const updatePasswordValidation = require ('../../validators/updatePasswordValidation') 

// Queries
const performQuery = require('../../db/performQuery')
const getUserQuery = require('../../queries/getUserQuery')



const updatePasswordQuery = async data => {

    const query = 
        
        `
            UPDATE users SET 
                
                password = '${data.newPassword}', 
                updateDate = UTC_TIMESTAMP 
            
            WHERE 
            
                id = ${data.userID} AND active = 1 
        `

    const result = await performQuery(query) 
    return result
    
}

const updatePassword = async (req, res) => {

    // Obtener variables
    let { userID } = req.params;
    let reqData = req.body
    console.log(reqData)

    try {

        // Obtener, validar y corregir datos
        reqData = await updatePasswordValidation.validateAsync(reqData)

        // Comprobar si el usuario existe / Obtener sus datos

            // Crear objeto userID
            userID = { userID }

            // Obtener query (enviar objeto userID)
            query = getUserQuery (userID)

            // Procesar query
            user = ( await performQuery (query) ) [0] 

            // Error
            if(!user) {
                    
                throw new Error('User does not exists')
            
            }

        /*
        
            Crear objeto reqData. Contiene

                - oldPassword
                - newPassword
                - userID
        
        */
        
        reqData = {...reqData, userID: user.id}

        // Comprobar la contraseña

            // Comparar
            const validPassword = await bcrypt.compare(reqData.oldPassword, user.password);

            // Error
            if (!validPassword) {

                throw new Error ('Incorrect password')
            
            }

        // Actualizar la contraseña
            
            // Encriptar
            reqData.newPassword = await bcrypt.hash(reqData.newPassword, 10);
            
            // Enviar a BD
            const result = await updatePasswordQuery (reqData)

            // Error
            if (!result) {

                throw new Error ('Database Error')

            }

            console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error updating password: ${e.message}`)
        res.status(401).send(e.message)
        return

    }   

    res.send('Password updated')

}

module.exports = updatePassword