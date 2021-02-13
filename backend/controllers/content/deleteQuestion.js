const getQuestionQuery = require ('../../queries/getQuestionQuery')
const performQuery = require ('../../db/performQuery')



const deleteQuestionQuery = async data => {

    const query = 

        `
            DELETE FROM questions WHERE id = ${data.questionID}
        `

    const result = await performQuery(query)
    return result

}



const deleteQuestion = async (req, res) => {

    console.log('*Delete Question*');

    // Crear objeto reqData. Contiene: - questionID
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
        const result = await deleteQuestionQuery (reqData)
        
        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Deleted. Affected Rows: ${result.affectedRows}`);
   
    } catch (e) {
     
        console.log(`Error deleting question: ${e.message}`)
        res.satus(500).send(e.message)
        return

    }

    res.send('Question Deleted')

}

module.exports = deleteQuestion;