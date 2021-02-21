const uuid = require('uuid');
const fsPromises = require('fs').promises

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
            country = '${data.country}',
            avatar = '${data.avatar}'
        WHERE id = '${data.userID}'
    `

    const result = await performQuery(query) 
    return result
    
}


const updateUser = async (req, res) => {

    console.log('*Update User*');

    let query;
    let user;

    // Obtener variables 
    let { userID } = req.params
    let reqData = req.body

    try {

        
        const fileID = uuid.v4()
        const outputFileName = `${process.env.TARGET_FOLDER}/profile/${fileID}.jpg`
     
        await fsPromises.writeFile(outputFileName, req.files.avatar.data)

        // Validar y Corregir
        reqData = await updateUserValidation.validateAsync(reqData)

        /*
            Crear objeto reqData. Contiene:
                - username
                - name
                - surname
                - birthDate
                - country
                - userID
                - url de avatar
        
        */
        
        reqData = {...reqData, userID: userID, avatar: outputFileName}

        // Comprobar si el username ya existe
            console.log(reqData.user)
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
            const result = await updateUserQuery(reqData)

            // Error
            if (!result) {

                throw new Error ('Database Error')

            }

            console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error updating user: ${e.message}`)
        res.status(401).send(e.message)
        return

    }

    res.send('User Updated')

}

module.exports = updateUser;