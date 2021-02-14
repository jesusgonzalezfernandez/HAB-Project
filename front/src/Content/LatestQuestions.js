import useFetch from '../useFetch';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import QuestionPreview from './QuestionPreview';



function LatestQuestions() {

    
    // Obtiene listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []
    
    // Página actual
    const [page, setPage] = useState(1)

    // Paginación
    const [pagination, setPagination] = useState(5)
    
    // Procesar el data en función de la página actual
    const slice = data.slice( pagination * (page - 1), pagination * page )

    // Obtener el máximo de páginas a partir del total y el número de resultados por página
    const max = Math.ceil(data.length / pagination)


        // // Obtiene listado de preguntas
        // const data = useFetch('http://localhost:3001/questions') || []
     
        // // Paginación
        // const [page, setPage] = useState(1)
        // const paginatedData = data.slice(5 * (page - 1), 5 * page)
        // const max = Math.ceil(data.length / 5)

    return (

        <div className='latest questions'>
                
            <h2>Últimas preguntas:</h2>

            {/* Control de Paginación */}
            <div className='pagination set'>
                <h6>Número de resultados por página:</h6>
                <select name="pagination" id="pagination" value={pagination} onChange={e => setPagination(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

            </div>

            <div className='question list'>


                {data &&

                    slice.map(question => 
                        
                        <div key={question.id}>
                           <QuestionPreview question={question}/>
                        </div>
                        
                )}

                {!data &&
                   
                   <div>
                       <i>No se han podido obtener resultados</i>
                    </div>
                }

            {/* Control de Pagina */}
            <div className='pagination'>

                <span onClick={() => setPage(page > 1 ? page - 1 : 1)}>◄</span>
                <span>{page} / {max}</span>
                <span onClick={() => setPage(page < max ? page + 1 : max)}>►</span>

            </div>


            </div>
        </div>
    )
}
export default LatestQuestions;