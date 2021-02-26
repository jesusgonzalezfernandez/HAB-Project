// Queries
const performQuery = require('../../db/performQuery')

const getUsersListQuery = async data => {

    // Inicializar un array de objetos con pares key:valor (Permite leer el nombre del valor para enviarlo a la query)
    const objects = [
        { username: data.username },
        { country: data.country },
        { role: data.role }
    ]

    // Inicializar un array de objetos para filtrar las variables con valor definido
    let array = [];
    
    // Poblar el array con los campos con valor definido
    objects.forEach (object => {

        // Object.values devuelve un nuevo array (Solo nos interesa el valor de la posición 0 en ese nuevo array)
        if ( Object.values (object) [0] ) {
            array.push(object)
        }

    })

    // String base
    let query = 
        
        `
            SELECT * FROM users
        `
    
    // Recorrer el array de elementos definidos
    for (let i = 0; i < array.length; i++) {

        // Obtener key y valor de cada objeto
        const [ key ] = Object.keys(array[i])
        const [ value ] = Object.values(array[i])
        
        // Para el primer valor...
        if ( i === 0 ) {            

            // ...concatena WHERE, el nombre del campo y el valor
            query = query.concat(` WHERE users.${key} LIKE '%${value}%'`)

        }

        // Para los demás...
        if ( i > 0 ) {

            // ...concatena AND, el nombre del campo y el valor
            query = query.concat(` AND users.${key} LIKE '%${value}%'`)
        }

    }

    const result = await performQuery (query)

    return result

}

const getUserLanguagesQuery = async userID => {

    let query = 
        
        `
            SELECT languages.name FROM languages
                JOIN users_languages ON users_languages.languageID = languages.id 
                JOIN users ON users.id = users_languages.userID
            WHERE users.id = '${userID}'
        `

    const result = await performQuery(query)
    return result

}

const getUsersList = async (req, res) => {

    console.log('*Get Users List*');

    let usersList = [];

    // Obtener variables
    let reqData = req.query;

    try {

        // Enviar a BD
        const result = await getUsersListQuery(reqData)

        // Añadir lenguajes para cada usuario del resultado
        for (let user of result) {
            
            // Crear un campo languages e inicializar a array
            user = {...user, languages: []}

            // Obtener lenguajes del usuario
            const languages = await getUserLanguagesQuery(user.id)

            // Añadir cada lenguaje al array dentro del objeto de usuario
            for (language of languages) {
                user.languages.push(language.name)
            }

            // Añadir usuario al listado
            usersList.push(user)

        }

        // Si busca por lenguaje, filtrar los usuarios...
        if (reqData.languages) {
            usersList = usersList
                // Que sean expertos en al menos un lenguaje
                .filter(user => user.languages.length > 0)
                // Que entre sus lenguajes contengan el lenguaje buscado
                .filter(user => ( user.languages
                    .filter(language => language
                        .toLowerCase()
                        .includes(reqData.languages
                            .toLowerCase()) ).length))
        }

        // Crear objeto response
        const response = usersList.map(user => object = {
            username: user.username,
            name: user.name,
            role: user.role,
            country: user.country,
            avatar: user.avatar,
            lastConnection: user.lastConnection,
            registrationDate: user.registrationDate,
            languages: user.languages
         })

        console.log(response);
        res.send(response)

    } catch (e) {

        res.status(500).send (e.message)
        return
    
    }

}

module.exports = getUsersList