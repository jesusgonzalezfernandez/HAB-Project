const performQuery = require('../../db/performQuery')
// const { getQuestionDetailQuery } = require ('../../db/queriesDB')

const getQuestionDataQuery = async data => {

    const query = 
        
        `

            SELECT 
                
                questions.title, 
                questions.body,  
                questions.file, 
                questions.tags, 
                questions.status,
                questions.views,
                questions.closeDate,
                questions.creationDate,
                questions.updateDate,
                users.username,
                users.avatar
                
            FROM questions 
            JOIN users
            ON users.id = questions.userID
            WHERE questions.id = ${data.questionID}
            
        `

    const result = ( await performQuery(query) ) [0]
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

const getQuestionDetails = async (req, res) => {

    let questionData;

    // Obtener variables
    let reqData = req.params
    reqData = {...reqData, token: req.auth}

    try {

        // Obtener información de la pregunta
        questionData = await getQuestionDataQuery (reqData)

        // Si la pregunta no existe, se envía un error
        if (!questionData) {

            throw new Error ('User not found')
        
        }
        
        // Obtener lenguajes de la pregunta
        questionLanguages = await getQuestionLanguagesQuery(reqData.questionID)
        
    } catch (e) {

        res.status(500).send(e.message)
        return

    }

    const response = {
        ...questionData, 
        languages: questionLanguages.map(l => l.name)
    }

    console.log(response);
    res.send(response)

}

module.exports = getQuestionDetails