function filterQuestionsQuery(data) {

    // Array de objetos con valor definido
    let array = []
        
    // URL base
    let URL = 'http://localhost:3001/questions'

    // Array de parámetros de búsqueda
    const objects = [
        {title: data.title},
        {languages: data.languages},
        {tags: data.tags},
        {status: data.status},
        {creationDate: data.creationDate}
    ]

    // Poblar el array con los objetos con valor definido
    objects.forEach (object => {

        if( Object.values (object) [0] ) {
            array.push(object)
        }

    })
    
    // Crear URL concatenando campos y valores
    for (let i = 0; i < array.length; i++ ){

        const [ key ] = Object.keys(array[i])
        const [ value ] = Object.values(array[i])

        console.log(`Key ${i} del array: ${key}`);
        console.log(`Value ${i} del array: ${value}`);
        
        if (i === 0) {
            URL = URL.concat(`?${key}=${value}`)
        }

        if (i > 0) {
            URL = URL.concat(`&${key}=${value}`)
        }

    }

    console.log(`Dirección de búsqueda: ${URL}`);
    return URL

}

export default filterQuestionsQuery;
