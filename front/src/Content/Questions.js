import { useState } from "react";
import useFetch from '../useFetch'


function Questions() {
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState('')
    // const [results, setResults] = useState('')

    const data = useFetch('http://localhost:9999/questions?') || []

    const filteredData = data.filter(e => e.title.toLowerCase().includes(title.toLowerCase()))
    const paginatedData = filteredData.slice(5 * (page - 1), 5 * page)
    const max = Math.ceil(filteredData.length / 5)

    // const handleSubmit = async e => {
    //     e.preventDefault()
    //     const url = (`http://localhost:9999/questions?` + `title=${title}&language=${language}`) || []
    //     const res = await fetch(url)
    //     const data = await res.json()
    //     setResults(data)
    //     console.log(results)
    // }

    return (
        <div className="page questions">
            <h1>Preguntas</h1>
            <form >
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
                <button>Buscar</button>
            </form>
                <div>
                    <h2>Preguntas:</h2>
                    {paginatedData && paginatedData.map(question =>
                        <div key={question.id}>
                            {question.title}
                        </div>
                    )}
                    {!paginatedData &&
                        <div><i>Sin resultados</i></div>
                    }
                </div>
            <div className="pagination">
            <span onClick={() => setPage(page > 1 ? page - 1 : 1)}>◄</span>
            <span>{page} / {max}</span>
            <span onClick={() => setPage(page < max ? page + 1 : max)}>►</span>
          </div>
        </div>
    );
}


export default Questions;