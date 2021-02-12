import { useState } from "react";
import useFetch from '../useFetch'
import LatestQuestions from './LatestQuestions'

function Questions() {
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState('')
    const [results, setResults] = useState('')

    // const filteredData = Object.values(results).filter(e => e.title.toLowerCase().includes(title.toLowerCase()))
    // const paginatedData = filteredData.slice(5 * (page - 1), 5 * page)
    // const max = Math.ceil(filteredData.length / 5)

    const handleSubmit = async e => {
        e.preventDefault()
        const url = (`http://localhost:3001/questions?` + `title=${title}&languages=${language}`) || []
        const res = await fetch(url)
        const data = await res.json()
        setResults({ ...data, url })
        console.log(results)
    }

    return (
        <div className="page questions">
            <h1>Preguntas</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Consultar preguntas:
                <input value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                    Lenguaje:
                    <select value={language} onChange={e => setLanguage(e.target.value)}>
                        <option value="" hidden>Selecciona...</option>
                        <option value="css">css</option>
                        <option value="html">html</option>
                        <option value="javascript">javascript</option>
                        <option value="sql">sql</option>
                    </select>
                </label>
                <label>
                    <button>Buscar</button>
                </label>
            </form>
            {results &&
                <div>
                    <h2>Resultados:</h2>
                    {results && Object.values(results).map(r =>
                        <div key={r.id}>
                            {r.title}
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
