import React, { useState } from 'react'
import QuestionPreview from './QuestionPreview'



function FilterQuestions() {

    const [results, setResults] = useState([])
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState('')
    const [tags, setTags] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [status, setStatus] = useState('')

    console.log(`Resultado de la búsqueda: ${results.length} preguntas`);

    const handleSubmit = async e => {
        e.preventDefault()

        // Array de objetos con valor definido
        let array = []
        
        // URL base
        let URL = 'http://localhost:3001/questions'

        // Array de parámetros de búsqueda
        const objects = [
            {title: title},
            {languages: languages},
            {tags: tags},
            {status: status},
            {creationDate: creationDate}
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

        // Descarga, parseado y envio del resultado.
        const data = await fetch(URL).then(res => res.json())

        setResults(data)

    }

    return (
        <div>
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSubmit}>

                <h1>Encuentra lo que estás buscando:</h1>
                <label>
                    Título:
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                    Lenguaje:
                    <select value={languages} onChange={e => setLanguages(e.target.value)}>
                        <option value="" hidden>Selecciona...</option>
                        <option value="css">css</option>
                        <option value="html">html</option>
                        <option value="javascript">javascript</option>
                        <option value="sql">sql</option>
                    </select>
                </label>
                <label>
                    Tags:
                    <input value={tags} onChange={e => setTags(e.target.value)}></input>
                </label>
                <label>
                    Status:
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="">Selecciona...</option>
                        <option>Pending</option>
                        <option>Closed</option>
                    </select>
                </label>
                <label>
                    Creation Date:
                    <input value={creationDate} onChange={e => setCreationDate(e.target.value)}></input>
                </label>
                <label>
                    <button>Buscar</button>
                </label>
            </form>

            {/* Resultados */}
            {results.length >= 1 && 

                <div className="search results">

                    <h2>Resultados:</h2>
                    {Object.values(results).map(question => 
                        
                        <div key={question.id}>
                           <QuestionPreview question={question}/>
                        </div>
                        
                    )}

                </div>
            
            }

                {/* <div className='search-results'>
                    {results && 
                    
                    <div>
                        <h2>Resultados:</h2>
                            {Object.values(results).map(question =>
                                <div className='questions' key={question.id}>
                                    {question.userID}
                                    {question.title}
                                </div>)}

                        </div>
                    }

                </div>}

            */}
        </div> 
    )
}

export default FilterQuestions
