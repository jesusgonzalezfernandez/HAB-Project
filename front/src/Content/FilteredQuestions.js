import React, { useState } from 'react'
import QuestionPreview from './QuestionPreview'



function FilteredQuestions({data, setMax, pagination, page}) {

    // Procesar el data en función de la página actual
    const slice = data.slice( pagination * (page - 1), pagination * page )
    
    // Obtener el máximo de páginas a partir del total y el número de resultados por página
    const max =  Math.ceil(data.length / pagination)
    
    // Enviarlo al padre
    setMax(max)
    
    if (data && data.length >= 1) console.log(`Resultado de la búsqueda: ${data.length} preguntas`);

    return (

        <div>

           {data && data.length >= 1 && 

               <div className="search results">
       
                    {slice.map(question => 

                        <div key={question.id}>
                            <QuestionPreview question={question}/>
                        </div>
                    )}

               </div> 
           }

           {data && data.length < 1 &&

               <div>
                   <i>Sin Resultados</i>
               </div>

           }
        
        </div>
    
    )

}

export default FilteredQuestions
