import React from 'react'
import './QuestionPreview.css'
import { Link, NavLink } from 'react-router-dom';



function QuestionPreview({ question }) {

    // Generar array de tags para recorrerlo
    const tags = question.tags.split(',')

    return (
    
        <div className='question-preview-summary'>

            {/* Sidebar de estadísticas */}
            <aside className='question-preview-stats'>
                <div className='question-preview-votes'>
                    <span className='counter'>
                        0
                    </span>
                    <span>
                        votes
                    </span>
                </div>
                <div className='question-preview-answers-count'>
                    <span className='counter'>
                        0
                    </span>
                    <span>
                        answers
                    </span>
                </div>
            </aside>

            {/* Extracto de la pregunta */}
            <main className='question-preview'>
                <h3>
                <NavLink to={`/question/${question.id}`} className="question-preview-title"> {question.title} </NavLink>
                </h3>
                <div className='question-preview-excerpt'>
                    {question.body.substring(0, 250) + ' ...'}
                </div>
                <div className='question-preview-tags'>
                    {tags.length >= 1 && 
                        tags.map((tag, i) => 
                            <Link to={'/questions?tags=' + tag} key={i}>
                                {tag}
                            </Link>

                    )}
                </div>
            </main>

        </div>
    )
}

export default QuestionPreview
                            
                            
                            // <a key={i} href={'http://localhost:3000/questions?tags=' + tag}>
                            //     {tag}
                            // </a>