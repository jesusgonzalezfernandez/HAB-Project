import React from 'react'
import './QuestionPreview.css'

function QuestionPreview({ question }) {

    const tags = question.tags.split(',')

    console.log(tags);

    return (
    
        <div className='question summary'>
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
            <main className='question preview'>
                <h3>
                    <a href="/">
                        {question.title}
                    </a>
                </h3>
                <div className='question excerpt'>
                    {question.body.substring(0, 100) + ' ...'}
                </div>
                <div className='question tags'>
                    {tags.length >= 1 && 
                        tags.map(tag => 
                            <a href="">{tag}</a>
                    )}
                </div>

            </main>
        </div>

    )
}

export default QuestionPreview
