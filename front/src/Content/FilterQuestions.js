import { useState } from "react";
import useFetch from '../useFetch'
import LatestQuestions from "./LatestQuestions";


function Questions() {
    // const [page, setPage] = useState(1)
    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState('')
    const [results, setResults] = useState('')


    // const filteredData = data.filter(e => e.title.toLowerCase().includes(title.toLowerCase()))


    const handleSubmit = async e => {
        e.preventDefault()
        const url = (`http://localhost:9999/questions?` + `title=${title}&language=${language}`) || []
        const res = await fetch(url)
        const data = await res.json()
        setResults(data)
        console.log(results)
    }

    return (
        <div className="page questions">
            <h1>Preguntas</h1>
            <form onClick={handleSubmit}>
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
            {results &&
                <div>
                    <h2>Resultados:</h2>
                    {results && results.map(r =>
                        <div key={r.id}>
                            {r.title}
                        </div>
                    )}
                </div>
            }
            <LatestQuestions/>
        </div>
    );
}


export default Questions;
