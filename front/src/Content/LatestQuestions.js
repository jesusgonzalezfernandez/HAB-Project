import useFetch from '../useFetch';
import QuestionPreview from './QuestionPreview';
import './LatestQuestions.css'



function LatestQuestions({ setMax, pagination, page, titleFilter, bodyFilter, timeFilter, sortBy }) {

    // Obtiene listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []

    let slice;

    if (data) {
        
        if(titleFilter) {data = data.filter(question => question.title.toLowerCase().includes(titleFilter.toLowerCase()))}
        if(bodyFilter) {data = data.filter(question => question.body.toLowerCase().includes(bodyFilter.toLowerCase()))}
        if(timeFilter === 'day') {data = data.filter(question => ( new Date() - new Date(question.creationDate) ) < (60*60*24*1000) )}
        if(timeFilter === 'week') {data = data.filter(question => ( new Date() - new Date(question.creationDate) ) < (60*60*24*7*1000) )}
        if(timeFilter === 'month') {data = data.filter(question => ( new Date() - new Date(question.creationDate) ) < (60*60*24*7*31*1000) )}
        if(sortBy === 'views') {data = data.sort((a,b) => b.views - a.views)} 
        if(sortBy === '!views') {data = data.sort((a,b) => a.views - b.views)} 
        if(sortBy === 'answers') {data = data.sort((a,b) => b.answers.length - a.answers.length )} 
        if(sortBy === '!answers') {data = data.sort((a,b) => a.answers.length - b.answers.length )} 
        if(sortBy === 'date') {data = data.sort((a,b) => new Date(b.creationDate) - new Date(a.creationDate) )} 
        if(sortBy === '!date') {data = data.sort((a,b) => new Date(a.creationDate) - new Date(b.creationDate) )} 
        
        // Procesar el data en función de la página actual
        slice = data.slice( pagination * (page - 1), pagination * page )
        
        // Obtener el máximo de páginas a partir del total y el número de resultados por página
        const max =  Math.ceil(data.length / pagination)
        
        // Enviarlo al padre
        setMax(max)
    
    }

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