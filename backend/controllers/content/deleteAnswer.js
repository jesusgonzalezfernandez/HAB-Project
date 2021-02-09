const getAnswerQuery = require ('../../queries/getAnswerQuery')
const performQuery = require ('../../db/performQuery')

const deleteAnswerQuery = async data => {

    const query = 

        `
            DELETE FROM answers WHERE id = ${data.answerID}
        `

    await performQuery(query)

}

const deleteAnswer = async (req, res) => {

    // Obtener variables
    const reqData = req.params

    try {

        // Comprobar que la respuesta existe

            // Crear objeto questionID
            let questionID = reqData.questionID;
            questionID = {questionID}

            // Enviar a BD
            question = await getAnswerQuery(questionID)

            // Error
            if (!question) {

                throw new Error ('Question not found')

            }
        
        // Enviar a BD
        await deleteAnswerQuery (reqData)

    } catch (e) {

        res.satus(500).send(e.message)
        
    }

    res.send('Answer Deleted')

}

module.exports = deleteAnswer;