// Queries
const performQuery = require('../../db/performQuery')

const getUsersListQuery = async data => {

    // Inicializar un array de objetos con pares key:valor (Permite leer el nombre del valor para enviarlo a la query)
    const objects = [
        { username: data.username },
        { country: data.country },
        { languages: data.languages }
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
    let query = `SELECT username, name, surname, role, country, languages FROM users`
    
    // Recorrer el array de elementos definidos
    for (let i = 0; i < array.length; i++) {

        // Obtener key y valor de cada objeto
        const [ key ] = Object.keys(array[i])
        const [ value ] = Object.values(array[i])
        
        // Para el primer valor...
        if ( i === 0 ) {            

            // ...concatena WHERE, el nombre del campo y el valor
            query = query.concat(` WHERE ${key} = '${value}'`)

        }

        // Para los demás...
        if ( i > 0 ) {

            // ...concatena AND, el nombre del campo y el valor
            query = query.concat(` AND ${key} = '${value}'`)
        }

    }

    const result = await performQuery (query)

    return result

}


const getUsersList = async (req, res) => {

    // Obtener variables
    reqData = req.query

    try {

        // Enviar a BD
        const usersList = await getUsersListQuery (reqData)

        res.send(usersList)


    } catch (e) {

        res.status(500).send (e.message)
    
    }


}

module.exports = getUsersList