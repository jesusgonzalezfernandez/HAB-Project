import useFetch from '../useFetch';
import { useState } from 'react';

function LatestQuestions() {
    const [page, setPage] = useState(1)
    const data = useFetch('http://localhost:9999/questions?') || []
    const paginatedData = data.slice(5 * (page - 1), 5 * page)
    const max = Math.ceil(data.length / 5)

    return (
    <div>
                    <h2>Últimas Preguntas:</h2>
                    <div>
                    {paginatedData && paginatedData.map(question =>
                        <div key={question.id}>
                            {question.creationDate} {question.languages} {question.title}
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
    )
}
export default LatestQuestions;