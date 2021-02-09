const getAnswerQuery = data => {

    const query = 
        `
            SELECT * FROM answers WHERE id = '${data.answerID}'
        `

    return query

}

module.exports = getAnswerQuery;