const performQuery = require('../../db/performQuery')

const updateVoteQuery = async data => {

    const query = 

        `
        
            UPDATE votes SET

                value = '${data.value}',
                updateDate = UTC_TIMESTAMP

            WHERE id = ${data.voteID}
        
        `

    await performQuery (query)

}

const updateVote = async (req, res) => {

    // Obtener variables
    let reqData = req.params
    const { value } = req.query

    // Añadir a reqData
    reqData = {...reqData, value}

    try {


        // Enviar a BD
        await updateVoteQuery (reqData)

    } catch (e) {
        
        res.status(400).send(e.message)
        return

    }

    res.send('Vote updated')

}

module.exports = updateVote