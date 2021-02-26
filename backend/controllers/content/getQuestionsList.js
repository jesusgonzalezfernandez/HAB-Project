// Queries
const performQuery = require('../../db/performQuery')

const getQuestionsListQuery = async data => {

    // Array de objetos, cada uno formado por un par key:valor (Permite leer el nombre del valor para enviarlo a la query)
    const objects = [
        { id: data.id },
        { title: data.title },
        { tags: data.tags },
        { status: data.status },
        { creationDate: data.creationDate }
    ]
    
    // Array de objetos con valor definido
    let array = [];
    
    // Poblar el array con los objetos con valor definido
    objects.forEach (object => {
        
        // Object.values devuelve un nuevo array (Solo nos interesa el valor de la posición 0 en ese nuevo array)
        if ( Object.values (object) [0] ) {
            array.push(object)
        }
        
    })
    
    // String base
    let query = `SELECT * FROM questions`

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

        // Si el key es para una búsqueda sin comparación estricta...
        if(key === 'title' || key === 'tags'){

            // ...añade % a ambos lados
            value = '%' + value + '%'

        }
        
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

const getQuestionLanguagesQuery = async questionID => {

    let query =

        `
            SELECT languages.name FROM languages
                JOIN questions_languages ON questions_languages.languageID = languages.id 
                JOIN questions ON questions.id = questions_languages.questionID
            WHERE questions.id = '${questionID}'
        `

    const result = await performQuery(query)
    return result

}


const getQuestionsList = async (req, res) => {

    console.log('* Get Questions List *');

    let questionsList = [];

    // Obtener variables
    const reqData = req.query

    try {

        // Enviar a BD
        const result = await getQuestionsListQuery (reqData)
        console.log(`Has obtenido: ${result.length} resultados`);

        // Añadir lenguajes a cada pregunta del resultado
        for (let question of result) {

            // Crear un campo languages e inicializar a array
            question = {...question, languages: []}

            // Obtener lenguajes de la pregunta
            const languages = await getQuestionLanguagesQuery(question.id)

            // Añadir cada lenguaje al array dentro del objeto question
            for (language of languages) {
                question.languages.push(language.name)
            }

            // Añadir la pregunta al listado
            questionsList.push(question)

        }

        // Si busca por lenguaje, filtrar los usuarios...
        if (reqData.languages) {
            questionsList = questionsList
                // Que entre sus lenguajes contengan el lenguaje buscado
                .filter(question => ( question.languages
                    .filter(language => language
                        .toLowerCase()
                        .includes(reqData.languages
                            .toLowerCase()) ).length))
        }

    } catch (e) {

        res.status(500).send(e.message)
        return
    
    }

    res.send(questionsList)

}

module.exports = getQuestionsList