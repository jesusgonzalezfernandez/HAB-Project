function getTagCount(data) {
    
    // Contador de tags (vacío de inicio)
    let tagCounter = []

    // Para cada pregunta obtenida...
    for (const question of data) {

        // ..obtener su array de tags mediante split,
        const questionTags = question.tags.split(',')

        // y recorrer ese array
        for(const tag of questionTags){

            // Para cada tag, comprobar si ya existe en el array (y obtener su posición)
            const index = tagCounter.findIndex(count => count.tag === tag)

            // Si no existe, se añade y se inicializa su cuenta
            if(index === -1) {
                tagCounter.push({tag, count: 1})
            } 

            // Si existe, se suma una unidad a la cuenta (en su posición)
            else {
                tagCounter[index].count ++
            }
        }
    }

    // Ordenar los tags en función de su número de resultados
    tagCounter.sort( (a, b) => a.count < b.count ? 1 : -1)

    // Devolver el resultado
    return tagCounter;

}

export default getTagCount