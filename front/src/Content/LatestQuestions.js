import useFetch from '../useFetch';
import { useState } from 'react';
import QuestionPreview from './QuestionPreview';
import './LatestQuestions.css'



function LatestQuestions({ setMax, pagination, page, titleFilter, bodyFilter, timeFilter, sortBy }) {

    // Obtiene listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []

    if(data.length > 0) {

        
        console.log(new Date(data[0].creationDate));
        console.log('Fecha de Creación de la Pregunta' + Date.now(new Date(data[0].creationDate)));
        console.log('Fecha de Hoy' + Date.now());

        // console.log( ( Date.now() - (Date.now(new Date(data[0].creationDate)) ) < 400) );
    
    }

    if(titleFilter) {data = data.filter(question => question.title.toLowerCase().includes(titleFilter.toLowerCase()))}
    if(bodyFilter) {data = data.filter(question => question.body.toLowerCase().includes(bodyFilter.toLowerCase()))}
    if(timeFilter === 'week') {data = data.filter(question => ( Date.now() - (Date.now(question.creationDate) ) < 604800000))}
    if(timeFilter === 'month') {data = data.filter(question => question.creationDate)}
    if(sortBy === 'views') {data = data.sort((a,b) => b.views - a.views)} 
    if(sortBy === '!views') {data = data.sort((a,b) => a.views - b.views)} 
    if(sortBy === 'answers') {data = data.sort((a,b) => b.answers.length - a.answers.length )} 
    if(sortBy === '!answers') {data = data.sort((a,b) => a.answers.length - b.answers.length )} 
    
    // Procesar el data en función de la página actual
    const slice = data.slice( pagination * (page - 1), pagination * page )

    // Obtener el máximo de páginas a partir del total y el número de resultados por página
    const max =  Math.ceil(data.length / pagination)

    // Enviarlo al padre
    setMax(max)

    return (

        <div className='latest-questions'>

            <div className='questions list'>

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