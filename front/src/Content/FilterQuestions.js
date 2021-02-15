import React, { useState } from 'react'
import filterQuestionsQuery from '../Functions/filterQuestionQuery'
import QuestionPreview from './QuestionPreview'
import './FilterQuestions.css'


function FilterQuestions() {

    // Resultados
    const [results, setResults] = useState()

    // Variables
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState('')
    const [tags, setTags] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async e => {

        e.preventDefault()
        
        // Crear objeto data
        const queryData = {
            title, 
            languages, 
            tags, 
            status, 
            creationDate
        }
        
        // Obtener URL a partir del objeto data
        const URL = filterQuestionsQuery(queryData)
        
        // Descarga, parseado y envio del resultado.
        await fetch(URL)
        .then(res => res.json())
        .then(data => setResults(data))

    }
    
    if (results && results.length >= 1) console.log(`Resultado de la búsqueda: ${results.length} preguntas`);
    
    return (

        <div>

            <h1>Encuentra lo que estás buscando:</h1>
            
            {/* Formulario de búsqueda */}
            <form className='question-filter-form' onSubmit={handleSubmit}>

                <label className='question-filter-form-title'>
                    <input placeholder='Título...' value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label className='question-filter-form-languages'>
                    <select value={languages} onChange={e => setLanguages(e.target.value)}>
                        <option value="" selected disabled hidden>Lenguaje de Programación...</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                        <option value="javascript">Javascript</option>
                        <option value="sql">MySql</option>
                    </select>
                </label>
                <label className='question-filter-form-tags'>
                    <input placeholder='Tags...' value={tags} onChange={e => setTags(e.target.value)}></input>
                </label>
                <label className='question-filter-form-status'>
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="" selected disabled hidden>Estado de la Pregunta...</option>
                        <option>Pending</option>
                        <option>Closed</option>
                    </select>
                </label>
                <label className='question-filter-form-date'>
                    <input placeholder='Fecha de Creación...' value={creationDate} onChange={e => setCreationDate(e.target.value)}></input>
                </label>
                <label className='question-filter-form-button'>
                    <button>Buscar</button>
                </label>
            </form>

            {/* Resultados */}
            <div>

                {results && results.length >= 1 && 

                    <div className="search results">

                        <h2>Resultados:</h2>
                            {results.map(question => 
                        
                                <div key={question.id}>
                                   <QuestionPreview question={question}/>
                                </div>
                            )}

                    </div> 
                }

                {results && results.length < 1 &&
                
                    <div>
                        <i>Sin Resultados</i>
                    </div>
                
                }
            
            </div>
            
        </div> 
    )
}

export default FilterQuestions