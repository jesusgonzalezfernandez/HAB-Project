// Módulos
const questionValidation = require ('../../validators/questionValidation')

// Queries
const getQuestionQuery = require ('../../queries/getQuestionQuery')
const performQuery = require ('../../db/performQuery')



const createQuestionQuery = async data => {

    const query = 
    
        `
        
            INSERT INTO questions (

                userID,
                title,
                body,
                file,
                languages,
                tags,
                creationDate,
                updateDate

            )

            VALUES (

                ${data.userID},
                '${data.title}',
                '${data.body}',
                '${data.file}',
                '${data.languages}',
                '${data.tags}',
                UTC_TIMESTAMP,
                UTC_TIMESTAMP

            )
        
        `

    await performQuery(query)

}

const createQuestion = async (req, res) => {

    let query;
    let question;

    try {
        
        // Obtener, validar y corregir los datos
        const reqData = await questionValidation.validateAsync(req.body, {abortEarly: false})

        // Comprobar si la pregunta ya existe en BD
        
            // Crear objeto title
            let title = reqData.title
            title = { title }

            // Obtener query
            query = await getQuestionQuery (title)

            // Enviar query
            question = ( await performQuery (query) ) [0]

            // Enviar un error si ya existe
            if(question) {
            
                throw new Error ('Question Already Registered')
            
            }

        // Procesar los datos

            // Añadir el ID del usuario
            reqData.userID = req.auth.userID
        
        // Enviar a BD
        await createQuestionQuery (reqData)

    } catch (e) {

        res.status(400).send(e.message)
        return

    }

    res.send('Your question is posted')

}

module.exports = createQuestion