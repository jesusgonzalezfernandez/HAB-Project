// Queries
const performQuery = require('../../db/performQuery')

const getQuestionsListQuery = async data => {

    // Array de objetos con valor definido
    let array = [];
    // String base
    let query = `SELECT id, title, languages, tags, status, creationDate FROM questions`
    // Array de objetos, cada uno formado por un par key:valor (Permite leer el nombre del valor para enviarlo a la query)
    const objects = [
        { id: data.id },
        { title: data.title },
        { languages: data.languages },
        { tags: data.tags },
        { status: data.status },
        { creationDate: data.creationDate }
    ]
    
    // Poblar el array con los objetos con valor definido
    objects.forEach (object => {

        // Object.values devuelve un nuevo array (Solo nos interesa el valor de la posición 0 en ese nuevo array)
        if ( Object.values (object) [0] ) {

            array.push(object)
        
        }

    })

    // Recorrer el array de elementos definidos
    for (let i = 0; i < array.length; i++) {

        // Obtener key y valor de cada objeto
        const [ key ] = Object.keys(array[i])
        const [ value ] = Object.values(array[i])
        
        // Para el primer valor...
        if ( i === 0 ) {            

            // ...concatena WHERE, el nombre del campo y el valor
            query = query.concat(` WHERE ${key} = '${value}'`)

        }

        // Para los demás...
        if ( i > 0 ) {

            // ...concatena AND, el nombre del campo y el valor
            query = query.concat(` AND ${key} = '${value}'`)
        }

    }

    const result = await performQuery (query)
    return result

}


const getQuestionsList = async (req, res) => {

    let questionsList;

    // Crear reqData
    const reqData = req.query

    try {

        // Enviar a BD
        questionsList = await getQuestionsListQuery (reqData)

    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }

    res.send(questionsList)

}

module.exports = getQuestionsList