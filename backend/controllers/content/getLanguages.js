const performQuery = require("../../db/performQuery")

getLanguagesQuery = async () => {

    const query = 
    
    ` 
        SELECT * FROM languages
    `

    const result = await performQuery(query)
    return result

}

const getLanguages = async (req, res) => {

    console.log('* Obteniendo Lenguajes *');

    let result;
    
    try {

        result = await getLanguagesQuery()
        
        // Si no obtiene resultados, envía un error
        if (!result) {

            throw new Error ('Languages not found')
        
        }

    } catch (e) {
        
        res.status(500).send(e.message)
        return

    }

    const response = result.map(l => language = {name: l.name, id: l.id})

    res.send(response)

}

module.exports = getLanguages;