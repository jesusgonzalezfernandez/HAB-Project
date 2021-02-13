const getAnswerQuery = require ('../../queries/getAnswerQuery')
const performQuery = require ('../../db/performQuery')

const deleteAnswerQuery = async data => {

    const query = 

        `
            DELETE FROM answers WHERE id = ${data.answerID}
        `

    const result = await performQuery(query)
    return result

}

const deleteAnswer = async (req, res) => {

    console.log('*Delete Answer*');

    /* 
    
        Crear objeto reqData. Contiene: 
        
            - questionID
            - answerID 
    
    */

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
        const result = await deleteAnswerQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Deleted. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error deleting answer: ${e.message}`)
        res.satus(500).send(e.message)
        return
    }

    res.send('Answer Deleted')

}

module.exports = deleteAnswer;