const bcrypt = require('bcrypt');

// Queries
const getUserQuery = require('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery')



const deactivateUserQuery = async data => {

    const query = 
    
        `

            UPDATE users SET 
            
                active = 0, 
                token = null, 
                updateDate = UTC_TIMESTAMP,
                password = '',
                name = '',
                surname = '',
                country = '' 
                
            WHERE id = ${data.userID}

        `

    await performQuery(query)

}

const createOffUserQuery = async data => {

    const query = 
    
        `
            
            INSERT INTO offUsers (
                
                userID, 
                reason

            ) 
            
            VALUES (
    
                ${data.userID},
                '${data.reason}'
            
            )
        
        `

    await performQuery(query)

}


const deleteUser = async (req, res) => {

    // Obtener variables
    let { userID } = req.params;
    const reqData = {...req.body, userID: userID}

    try {

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

        // Comprobar la contraseña

            console.log('Checking password');

            // Comparar    
            const validPassword = await bcrypt.compare(reqData.password, user.password)

            // Error
            if (!validPassword) {

                throw new Error('Your password is not correct')
        
            }

        // Actualizar el registro
        await deactivateUserQuery (reqData)

        // Enviar a la tabla Off Users
        await createOffUserQuery (reqData)


    } catch (e) {

        res.status(401).send(e.message)
        return

    }

    res.send('Hope to see you soon!')

}

module.exports = deleteUser;
