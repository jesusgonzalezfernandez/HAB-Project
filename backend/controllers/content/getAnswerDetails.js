const performQuery = require('../../db/performQuery')

const getAnswerDataQuery = async data => {
    let array = []
    let query =

        `
            SELECT
                answers.id,   
                answers.questionID,  
                answers.userID,
                answers.parentID,
                answers.body, 
                answers.file, 
                answers.creationDate,
                answers.updateDate,
                users.username,
                users.avatar
                
            FROM answers
            JOIN users
            ON users.id = answers.userID
            WHERE answers.parentID is null
            
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

    // Recorrer el array de elementos definidos
    for (let i = 0; i < array.length; i++) {

        // Obtener key y valor de cada objeto
        const [ key ] = Object.keys(array[i])
        let [ value ] = Object.values(array[i])
        
        query = query.concat(` AND ${key} LIKE '${value}'`)

    }

    const result = await performQuery (query)
    console.log(result)
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