// Dependencias
const bcrypt = require('bcrypt');

// Módulos
const deleteUserValidation = require('../../validators/deleteUserValidation')

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

    const result = await performQuery(query) 
    return result

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

    const result = await performQuery(query) 
    return result

}


const deleteUser = async (req, res) => {

    console.log('*Delete User*');

    // Obtener variables
    let { userID } = req.params;

    try {

        // Validar y corregir
        let reqData = await deleteUserValidation.validateAsync(req.body) 
    
        /*
        
            Crear objeto reqData. Contiene:

                - password
                - reason
                - userID

        */
    
        reqData = {...reqData, userID: userID}

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
        let result = await deactivateUserQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Deleted. Affected Rows: ${result.affectedRows}`);

        // Enviar a la tabla Off Users
        result = await createOffUserQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }        

        console.log(`Successfully Inserted. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error deleting user: ${e.message}`)
        res.status(401).send(e.message)
        return

    }

    res.send('Hope to see you soon!')

}

module.exports = deleteUser;
