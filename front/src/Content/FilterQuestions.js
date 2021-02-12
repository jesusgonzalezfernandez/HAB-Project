import { useState } from "react";
import LatestQuestions from './LatestQuestions'



function Questions() {

    const [page, setPage] = useState(1)
    const [results, setResults] = useState([])
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState('')
    const [tags, setTags] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [status, setStatus] = useState('')

    // const paginatedData = filteredData.slice(5 * (page - 1), 5 * page)
    // const max = Math.ceil(filteredData.length / 5)

    // ?title=Titulo&languages=javascript&tags=tag&status=closed

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
        
        console.log(`Array de parámetros de búsqueda: ${array}`);

        for (let i = 0; i < array.length; i++ ){

            const [ key ] = Object.keys(array[i])
            const [ value ] = Object.values(array[i])

            if (i === 0) {
                URL = URL.concat(`?`)
            }

        }

        const res = await fetch(URL)
        const data = await res.json()
        // console.log(data)
        setResults({ ...data, URL })
        // console.log(results)
    }

    return (
        <div className="page questions">
            <h1>Preguntas</h1>
            <form onSubmit={handleSubmit}>
                <h1>Filtrar Preguntas:</h1>
                <label>
                    Título:
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                    Lenguaje:
                    <select value={languages} onChange={e => setLanguages(e.target.value)}>
                        <option value='' hidden>Selecciona...</option>
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
                        <option value='' hidden>Selecciona...</option>
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
            {results &&
                <div>
                    <h2>Resultados:</h2>
                    {results && 
                    Object.values(results).map(question =>
                        <div key={question.id}>
                            {question.title}
                        </div>
                    )}
                </div>
            }
            {/* {!paginatedData &&
                        <div><i>Sin resultados</i></div>
                    }
                </div> */}
            {/* <div className="pagination">
            <span onClick={() => setPage(page > 1 ? page - 1 : 1)}>◄</span>
            <span>{page} / {max}</span>
            <span onClick={() => setPage(page < max ? page + 1 : max)}>►</span>
          </div> */}
            <LatestQuestions />
        </div >
    );
}


export default Questions;
