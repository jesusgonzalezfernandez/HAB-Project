// Dependencias
const bcrypt = require('bcrypt');

// Módulos
const resetValidation = require ('../../validators/resetValidation')

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require ('../../db/performQuery')



const resetAccountQuery = async (password, userID) => {

    const query = 
        
        `
            UPDATE users SET password = '${password}', validationCode = '', updateDate = UTC_TIMESTAMP WHERE id = ${userID} AND active = 1
        `

    await performQuery(query)

}


const resetAccount = async (req, res) => {

    // Obtener variables
    let reqData = req.body

    try {

        // Validar y Corregir
        reqData = await resetValidation.validateAsync(reqData)

        // Comprobar si el usuario existe / Obtener sus datos

            // Crear objeto email
            let email = reqData.email
            email = { email }

            // Obtener query (Enviar solo email)
            query = getUserQuery(email)

            // Procesar query
            user = ( await performQuery (query) ) [0] 

            // Error
            if (!user) {

                throw new Error ('User not found')
            
            }

        // Comprobar si el código es correcto 
        if (user.validationCode !== reqData.code) {
                
            throw new Error ('Recovery code error')
        
        }

        // Procesar los datos

            // Crear nueva contraseña

                // Encriptar password y sustituir en reqData
                reqData.password = await bcrypt.hash(reqData.password, 10)
                
                // Enviar a BD
                await resetAccountQuery(reqData.password, user.id)

    } catch (e) {

        res.status(401).send(e.message)
        return
    
    }

    res.send('New password updated')
}

module.exports = resetAccount;