import React, { useState } from 'react'
import filterQuestionsQuery from '../Functions/filterQuestionQuery'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import './QuestionsFilter.css'


function QuestionsFilter({ reload }) {

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
        // Avisar al padre para cambiar el display y enviarle el data de vuelta        
        .then(data => reload(data))

    }
        
    return (

        <div className='question-filter'>

            <h1>Encuentra lo que estás buscando</h1>
            
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
                <div className='next-button-container'>
                    <button className='next-button'>
                        <FontAwesomeIcon icon={faAngleDoubleRight} color="#3307ad" size="2x" />
                    </button>
                </div>
            </form>
            
        </div> 
    )
}

export default QuestionsFilter;