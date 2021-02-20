import useFetch from '../useFetch';
import { useState } from 'react';
import QuestionPreview from './QuestionPreview';



function LatestQuestions({ setMax, pagination, page }) {

    // Obtiene listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []
    
    // Procesar el data en función de la página actual
    const slice = data.slice( pagination * (page - 1), pagination * page )

    // Obtener el máximo de páginas a partir del total y el número de resultados por página
    const max =  Math.ceil(data.length / pagination)

    // Enviarlo al padre
    setMax(max)

    return (

        <div className='latest-questions'>

            <div className='questions-list'>

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

            </div>
        </div>
    )
}
export default LatestQuestions;