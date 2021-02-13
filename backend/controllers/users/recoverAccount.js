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

    const result = await performQuery(query) 
    return result

}

const recoverAccount = async (req, res) => {

    console.log('*Recover Account*');

    // Crear reqData. Contiene: - email
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

                throw new Error('User not found')
            
            }

        // Procesar los datos

            // Crear código de validación
            const validationCode = randomstring.generate(40);

            // Procesar query
            const result = await recoverAccountQuery(reqData.email, validationCode)
            
            // Error
            if (!result) {

                throw new Error ('Database Error')

            }
            
            console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);

            // Enviar un correo de verificación
            await sendRecoveryMail(reqData.email, validationCode)
            console.log('Sending validation code to recover password')

    } catch (e) {

        res.status(401).send(e.message)
        console.log(`Error recovering account: ${e.message}`)
        return
    
    }

    res.send('Please check your email to recover access')

}

module.exports = recoverAccount;