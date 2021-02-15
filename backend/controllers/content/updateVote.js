const performQuery = require('../../db/performQuery')

const updateVoteQuery = async data => {

    const query = 

        `
        
            UPDATE votes SET

                value = '${data.value}',
                updateDate = UTC_TIMESTAMP

            WHERE id = ${data.voteID}
        
        `

    const result = await performQuery(query) 
    return result

}

const updateVote = async (req, res) => {

    console.log('*Update Vote*');

    // Obtener variables
    let reqData = req.params
    const { value } = req.query

    /* 

        Crear objeto reqData. Contiene:

            - questionID
            - answerID
            - voteID
            - value
    
    */
    
    reqData = {...reqData, value}

    try {

        // Enviar a BD
        const result = await updateVoteQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Updated. Affected Rows: ${result.affectedRows}`);

    } catch (e) {
        
        console.log(`Error updating vote: ${e.message}`)
        res.status(400).send(e.message)
        return

    }

    res.send('Vote updated')

}

module.exports = updateVote