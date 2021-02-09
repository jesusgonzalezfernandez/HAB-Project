const getQuestionQuery = require ('../../queries/getQuestionQuery')
const performQuery = require ('../../db/performQuery')



const deleteQuestionQuery = async data => {

    const query = 

        `
            DELETE FROM questions WHERE id = ${data.questionID}
        `

    await performQuery(query)

}



const deleteQuestion = async (req, res) => {

    // Obtener variables
    const reqData = req.params

    try {

        // Comprobar que la pregunta existe

            // Crear objeto questionID
            let questionID = reqData.questionID;
            questionID = {questionID}

            // Enviar a BD
            question = await getQuestionQuery(questionID)

            // Error
            if (!question) {

                throw new Error ('Question not found')

            }

        // Enviar a BD
        await deleteQuestionQuery (reqData)
        
    } catch (e) {
     
        res.satus(500).send(e.message)

    }

    res.send('Question Deleted')

}

module.exports = deleteQuestion;