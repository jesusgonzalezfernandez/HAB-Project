import useFetch from '../useFetch';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';



function LatestQuestions() {

    // Obtiene listado de preguntas
    const data = useFetch('http://localhost:3001/questions') || []
     
    // Paginación
    const [page, setPage] = useState(1)
    const paginatedData = data.slice(5 * (page - 1), 5 * page)
    const max = Math.ceil(data.length / 5)

    return (

        <div>

            <h2>Últimas preguntas:</h2>

            <div>

                {paginatedData && paginatedData.map(question =>
                    <div key={question.id}>
                        <div>
                            {question.creationDate}
                        </div>
                        <span>
                            {question.languages}
                        </span>
                        {question &&
                            <div>
                                <NavLink to={`/question/${question.id}`}> {question.title} </NavLink>
                            </div>
                        }
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