// Dependencias
const bcrypt = require('bcrypt');
const moment = require('moment');
const randomstring = require("randomstring");

// Módulos
const createUserValidation = require('../../validators/createUserValidation')
const sendConfirmationMail = require('../../utils/sendConfirmationMail')

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require ('../../db/performQuery')





// Crear y enviar query
const createUserQuery = async data => {

    const query = 

    `
        INSERT INTO users ( 

            creationDate, 
            updateDate, 
            email, 
            password,
            username,
            name,
            surname,
            birthDate,
            country,
            validationCode

        )

        VALUES ( 

            UTC_TIMESTAMP, 
            UTC_TIMESTAMP, 
            '${data.email}', 
            '${data.password}',
            '${data.username}', 
            '${data.name}', 
            '${data.surname}',
            '${data.birthDate}', 
            '${data.country}', 
            '${data.validationCode}' 

        )
    `
    
    const result = await performQuery(query) 
    return result

}

// Controlador
const createUser = async (req, res) => {

    console.log('*Create User*');

    let query;
    let user;

    /*

        Crear objeto reqData. Contiene:

            - email
            - password
            - username
            - name
            - surname
            - birthDate
            - country
    
    */ 
    
    let reqData = req.body

    try {

        // Validar y Corregir
        reqData = await createUserValidation.validateAsync(reqData) 
        console.log(`New user to register: ${ reqData.username }`)

        // Comprobar si el email ya existe

            // Crear objeto email
            let email = reqData.email
            email = { email }

            // Obtener query (envía un objeto email)
            query = getUserQuery (email)

            // Procesar query
            user = ( await performQuery (query) ) [0] 

            // Error
            if(user) {

                throw new Error ('Email ya registrado')
            
            }

        // Comprobar si el username ya existe

            // Crear objeto userName
            let username = reqData.username
            username = { username }

            // Obtener query (envía un objeto username)
            query = getUserQuery (username)

            // Perocesar query
            user = ( await performQuery (query) ) [0] 

            // Enviar error si ya existe
            if(user) {

                throw new Error ('El usuario ya existe')
            
            }

        // Procesar los datos

            // Encriptar password y sustituir en reqData
            reqData.password = await bcrypt.hash(reqData.password, 10)
            console.log('Encrypting password')

            // Crear y almacenar código de activación
            reqData.validationCode = randomstring.generate(40)
            console.log('Generating validation code')

            // Formatear y almacenar fecha de nacimiento

                    // Pasar la fecha del formato MM-DD-YYYY a timestamp
                    const timestamp = reqData.birthDate.getTime() / 1000

                    // Transformar de nuevo al formato de BD
                    reqData.birthDate = moment.unix(timestamp).format('YYYY-MM-DD')
                    console.log(`Formatted date: ${reqData.birthDate}`);

        // Enviar a BD
        const result = await createUserQuery(reqData)
        
        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Inserted. Affected Rows: ${result.affectedRows}`);

        // Enviar mail de confirmación
        await sendConfirmationMail(reqData.email, `http://localhost:3000/users/validate/${reqData.validationCode}`)
        console.log('Enviando email de confirmación')

    } catch (e) {

        console.log(`Error al crear el usuario: ${e.message}`)
        res.status(400).send(e.message)
        return
    }

    res.send('Por favor, comprueba tu bandeja de entrada')

}

module.exports = createUser