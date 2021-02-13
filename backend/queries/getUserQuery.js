const getUserQuery = data => {

    /* 
    
        Debe recibir un objeto con par 'clave: valor'
        del tipo getUserQuery ({email})

        Al enviar la variable dentro de un corchete,
        crea un objeto con clave igual al nombre de la variable
        y valor igual al valor de la variable

    */

    console.log('Getting User From Database');

    // Object Version
    
    // Query base
    let query = `SELECT * FROM users WHERE `

    if (data.email) { 
        query = query.concat (`email = '${data.email}'`)  
        return query
    } 

    if (data.username) { 
        query = query.concat (`username = '${data.username}'`) 
        return query
    }

    if (data.userID) { 
        query = query.concat (`id = '${data.userID}'`) 
        return query
    }

    if (data.code) { 
        query = query.concat (`validationCode = '${data.code}'`) 
        return query
    }

}

module.exports = getUserQuery;