import React, { useEffect, useState } from 'react'
import filterQuestionsQuery from '../Functions/filterQuestionQuery'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import './QuestionsFilter.css'
import { useHistory } from 'react-router-dom';

function QuestionsFilter({ queryTags, queryLanguages, reload }) {

    // Variables
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState('')
    const [tags, setTags] = useState('')    
    const [creationDate, setCreationDate] = useState('')
    const [status, setStatus] = useState('')
    const [languageOptions, setLanguageOptions] = useState([])

    const history = useHistory()

    /* 
    
        Use effect se ejecuta al cargar el componente,
        o cada vez que hay un cambio en la query.
        
        Simula un submit y envía el valor de la
        nueva query.

    */

    useEffect(() => {
        if (queryTags) {
            handleSubmit('', queryTags)
        }
        if (queryLanguages) {
            handleSubmit('','', queryLanguages)
        }
    }, [queryTags, queryLanguages])

    // Obtener Lenguajes
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/languages`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            })
    
        const data = await res.json();
    
        setLanguageOptions(data)
    
    }, [])

    const handleSubmit = async (e, tags, languages)  => {

        // Como el handleSubmit del useEffect no tiene evento 'e', hay que evitar el error
        e && e.preventDefault()

        /* 
        
            Crear objeto data.

            La variable query solo tomará valor cuando
            handleSubmit sea llamado desde el useEffect.

            Si hay query, el objeto que se envía
            al filtro solo tiene esa query. De forma
            que se evita que los parámetros se concatenen
            si se ha realizado alguna búsqueda previa
            desde el formulario.

            En el resto de los casos, se utilizarán las variables
            que hayan sido definidas en el formulario.

        */

        let queryData;
       
        if(!tags && !languages) {

            queryData = {
                title, 
                languages: languages,  
                tags: tags,
                status, 
                creationDate
            }

        } else { queryData = { 
            tags: tags,
            languages: languages
        } }

        // Obtener URL a partir del objeto data
        const URL = filterQuestionsQuery(queryData)
        
        // Descargar contenido a partir de la URL
        await fetch(URL)
        // Parsear el contenido
        .then(res => res.json())
        // Avisar al padre para cambiar el display y enviarle el contenido    
        .then(data => reload(data))
        
        // Si se ha hecho un filtrado desde el formulario, se elimina la query de la URL
        !tags && !languages && history.push('/questions')

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

                {/* Mostar Opciones de Lenguaje */}
                <select value={languages} onChange={e => setLanguages(e.target.value)}>
                    <option hidden>Lenguaje de Programación...</option>
                    {languageOptions && languageOptions
                        // Mostrar opciones
                            .map(option => 
                                <option 
                                    key={option.id} 
                                    value={option.name}>
                                        {option.name}
                                </option>
                            )
                    }
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

                        {/* 
                        
                            Se utiliza 'a' en lugar de 'Link'
                            porque Link relanza el componente 
                            sin hacer el handleSubmit, y por
                            lo tanto no renueva los parámetros
                            de búsqueda si había una query previa.

                            Para eliminar la query de la URL,
                            se introduce el history.push al final.
                            
                        */}
                        
                        <a>
                            <FontAwesomeIcon icon={faAngleDoubleRight} color="#3307ad" size="2x" />
                        </a>

                    </button>
                </div>
            </form>
            
        </div> 
    )
}

export default QuestionsFilter;