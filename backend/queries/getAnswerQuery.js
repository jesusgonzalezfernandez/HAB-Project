const getAnswerQuery = data => {

    console.log('Getting Answer From Database');

    const query = 
        
        `
            SELECT * FROM answers WHERE id = '${data.answerID}'
        `

    return query

}

module.exports = getAnswerQuery;