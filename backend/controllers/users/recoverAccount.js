// Dependencias
const randomstring = require('randomstring');

// Módulos
const sendRecoveryMail = require('../../utils/sendRecoveryMail')

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require ('../../db/performQuery')



const recoverAccountQuery = async (email, code) => {

    const query = 
    
        `
            UPDATE users SET validationCode = '${code}', updateDate = UTC_TIMESTAMP WHERE email = '${email}'
        `

    await performQuery(query)

}

const recoverAccount = async (req, res) => {

    // Obtener variables
    const reqData = req.body

    try {

        // Comprobar si el usuario existe

            // Crear objeto email
            let email = reqData.email
            email = { email }

            // Obtener query (enviar objeto email)
            const query = getUserQuery(email)

            // Procesar query
            const user = ( await performQuery (query) ) [0] 

            // Error
            if (!user) {

                res.status(401).send('User not found')
                return
            
            }

        // Procesar los datos

            // Crear código de validación
            const validationCode = randomstring.generate(40);

            // Procesar query
            await recoverAccountQuery(reqData.email, validationCode)
            console.log('User validation code updated');

            // Enviar un correo de verificación
            await sendRecoveryMail(reqData.email, validationCode)
            console.log('Sending validation code to recover password')

    } catch (e) {

        res.status(401).send('Reset password error')
        return
    
    }

    res.send('Recover password. Please check your email')

}

module.exports = recoverAccount;