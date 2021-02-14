import React from 'react'
import './QuestionPreview.css'



function QuestionPreview({ question }) {

    // Generar array de tags para recorrerlo
    const tags = question.tags.split(',')

    return (
    
        <div className='question summary'>

            {/* Sidebar de estadísticas */}
            <aside className='question stats'>
                <div className='question votes'>
                    <span className='counter'>
                        0
                    </span>
                    <span>
                        votes
                    </span>
                </div>
                <div className='question answers count'>
                    <span className='counter'>
                        0
                    </span>
                    <span>
                        answers
                    </span>
                </div>
            </aside>

            {/* Extracto de la pregunta */}
            <main className='question preview'>
                <h3>
                    <a className='question title' href="/">
                        {question.title}
                    </a>
                </h3>
                <div className='question excerpt'>
                    {question.body.substring(0, 150) + ' ...'}
                </div>
                <div className='question tags'>
                    {tags.length >= 1 && 
                        tags.map(tag => 
                            <a href={'http://localhost:3001/questions?tags=' + tag}>
                                {tag}
                            </a>
                    )}
                </div>
            </main>

        </div>
    )
}

export default QuestionPreview


                        // <div key={question.id}>
                        // <div>
                        //     {question.creationDate}
                        // </div>
                        // <span>
                        //     {question.languages}
                        // </span>
                        // {question &&
                        //     <div>
                        //         <NavLink to={`/question/${question.id}`}> {question.title} </NavLink>
                        //     </div>
                        // }
                        // </div>