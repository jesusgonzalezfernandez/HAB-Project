// Dependencias
const moment = require('moment')

// Módulos
const updateUserValidation = require ('../../validators/updateUserValidation') 

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery')



const updateUserQuery = async data => {


    const query = 

    `

        UPDATE users SET 

            updateDate = UTC_TIMESTAMP,
            userName = '${data.username}',
            name = '${data.name}',
            surname = '${data.surname}',
            birthDate = '${data.birthDate}',            
            country = '${data.country}'

        WHERE id = '${data.userID}'

    `

    await performQuery(query)
    return
    
}


const updateUser = async (req, res) => {

    let query;
    let user;

    // Obtener variables 
    let { userID } = req.params
    let reqData = req.body

    try {

        // Validar y Corregir
        reqData = await updateUserValidation.validateAsync(reqData)

        // Añadir userID
        reqData = {...reqData, userID: userID}

        // Comprobar si el username ya existe

            // Crear objeto userName
            let username = reqData.username
            username = { username }

            // Obtener query (enviar objeto username)
            query = getUserQuery (username)

            // Procesar query
            user = ( await performQuery (query) ) [0] 

            // Enviar error si ya existe
            if(user) {

                throw new Error ('Username Already in Use')
            
            }

        // Comprobar si el usuario existe / Obtener sus datos

            // Crear objeto userID
            userID = { userID }

            // Obtener query (Enviar sólo ID)
            query = getUserQuery (userID)

            // Procesar query
            user = ( await performQuery (query) ) [0] 

            // Error
            if(!user) {

                throw new Error('User does not exists')
            
            }

        // Procesar los datos

            // Formatear y almacenar fecha de nacimiento
            
                // Pasar la fecha del formato MM-DD-YYYY a timestamp
                const timestamp = reqData.birthDate.getTime() / 1000
            
                // Transformar de nuevo al formato de BD
                reqData.birthDate = moment.unix(timestamp).format('YYYY-MM-DD')

            // Añadir email a reqData
            reqData = {...reqData, email:user.email}

            // Enviar a BD
            await updateUserQuery(reqData)

    } catch (e) {

        res.status(401).send(e.message)
        return

    }

    res.send('User Updated')

}

module.exports = updateUser;