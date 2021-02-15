const performQuery = require('../../db/performQuery')

const getAnswerDataQuery = async data => {
    let array = []
    let query =

        `

            SELECT   
                questionID,  
                userID, 
                body, 
                file, 
                creationDate,
                updateDate 
                
            FROM answers
            
        `
    const objects = [
        { questionID: data.questionID },
        { userID: data.userID },
        { body: data.body },
        { file: data.file },
        { creationDate: data.creationDate }
    ]

    // Poblar el array con los objetos con valor definido
    objects.forEach(object => {

        // Object.values devuelve un nuevo array (Solo nos interesa el valor de la posición 0 en ese nuevo array)
        if (Object.values(object)[0]) {

            array.push(object)

        }

    })
    // Si el array tiene al menos un elemento...
    if(array.length > 0) {

        // ...concatena el where
        query = query.concat(' WHERE')

    }

    // Recorrer el array de elementos definidos
    for (let i = 0; i < array.length; i++) {

        // Obtener key y valor de cada objeto
        const [ key ] = Object.keys(array[i])
        let [ value ] = Object.values(array[i])
        
        // Para el primer elemento...
        if ( i === 0 ) {            

            // ...concatena el nombre del campo y el valor
            query = query.concat(` ${key} LIKE '${value}'`)
        
        }
        
        // Para los demás...
        if ( i > 0 ) {

            // ...concatena AND, el nombre del campo y el valor
            query = query.concat(` AND ${key} LIKE '${value}'`)
        }

    }

    const result = await performQuery (query)
    return result

}

const getAnswerDetails = async (req, res) => {

    let answerData;

    // Obtener variables
    let reqData = req.params
    reqData = { ...reqData, token: req.auth }

    try {

        // Obtener información de la pregunta
        answerData = await getAnswerDataQuery(reqData)

        // Si la pregunta no existe, se envía un error
        if (!answerData) {

            throw new Error('User not found')

        }

    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    res.send(answerData)

}

module.exports = getAnswerDetails

