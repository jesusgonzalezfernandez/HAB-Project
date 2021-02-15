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

    const result = await performQuery(query) 
    return result

}


const resetAccount = async (req, res) => {

    console.log('*Reset Account*');

    /*
    
        Crear objeto reqData. Contiene:

            - email
            - password
            - code

    */ 

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
        const result = await resetAccountQuery(reqData.password, user.id)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error reseting account: ${e.message}`)
        res.status(401).send(e.message)
        return
    
    }

    res.send('New password updated')
}

module.exports = resetAccount;