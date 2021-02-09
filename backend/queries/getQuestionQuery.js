const getQuestionQuery = data => {

    console.log('Getting Question');

    // Obtener el nombre del tipo de dato recibido en el objeto
    let type = ( Object.keys(data) ) [0] 

    // Query base
    let query = `SELECT * FROM questions WHERE `

    // Diferentes concatenaciones
    if (type === 'title') { query = query.concat (`title = '${data.title}'`) } 

    if (type === 'questionID') { query = query.concat (`id = '${data.questionID}'`) }

    // if (type === 'userName') { query = query.concat (`userName = '${data.userName}'`) }

    // if (type === 'code') { query = query.concat (`validationCode = '${data.code}'`) }

    return query

}

module.exports = getQuestionQuery