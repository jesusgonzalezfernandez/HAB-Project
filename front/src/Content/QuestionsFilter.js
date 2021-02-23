import React, { useEffect, useState } from 'react'
import filterQuestionsQuery from '../Functions/filterQuestionQuery'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import './QuestionsFilter.css'


function QuestionsFilter({ query, reload }) {

    // Variables
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState('')
    // Tags recibe un valor por defecto si hay una query definida
    const [tags, setTags] = useState(query)
    const [creationDate, setCreationDate] = useState('')
    const [status, setStatus] = useState('')

    /* 
    
        Use effect simula un submit, y se ejecuta
        cuando al cargar el componente hay una query
        en la URL, o cada vez que esa query cambie
    
    */

    useEffect(() => {query && handleSubmit()}, [query])

    const handleSubmit = async e  => {

        // Como useEffect no tiene evento 'e', hay que evitar el error
        e && e.preventDefault()
                
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
        
        // Descargar contenido a partir de la URL
        await fetch(URL)
        // Parsear el contenido
        .then(res => res.json())
        // Avisar al padre para cambiar el display y enviarle el contenido    
        .then(data => reload(data))

    }
    
    
    return (

        <div className='question-filter'>

            {/* Formulario de búsqueda */}
            <form className='question-filter-form' onSubmit={handleSubmit}>
                
                <h1>Encuentra lo que estás buscando</h1>

                <label className='question-filter-form-title'>
                    Título
                    <input placeholder='...' value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label className='question-filter-form-languages'>
                    Lenguaje
                    <select value={languages} onChange={e => setLanguages(e.target.value)}>
                        <option value=''selected disabled hidden>Selecciona...</option>
                        <option value=''>...</option>
                        <option value='css'>CSS</option>
                        <option value='html'>HTML</option>
                        <option value='javascript'>Javascript</option>
                        <option value='sql'>MySql</option>
                    </select>
                </label>
                <label className='question-filter-form-tags'>
                    Tags
                    <input placeholder='...' value={tags} onChange={e => setTags(e.target.value)}></input>
                </label>
                <label className='question-filter-form-status'>
                    Status
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="" selected disabled hidden>Selecciona...</option>
                        <option value=''>...</option>
                        <option value='pending'>Pending</option>
                        <option value='closed'>Closed</option>
                    </select>
                </label>
                <label className='question-filter-form-date'>
                    Fecha de Creación
                    <input placeholder='dd/mm/aa' value={creationDate} onChange={e => setCreationDate(e.target.value)}></input>
                </label>
                <div className='next-button-container'>
                    <button className='next-button'>
                        <a href="">
                            <FontAwesomeIcon icon={faAngleDoubleRight} color="#3307ad" size="2x" />
                        </a>
                    </button>
                </div>
            </form>
            
        </div> 
    )
}

export default QuestionsFilter;