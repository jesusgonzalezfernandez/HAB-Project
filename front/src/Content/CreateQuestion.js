import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import './CreateQuestion.css'



function CreateQuestion() {

    // Obtener usuario del store
    const login = useSelector(state => state.login)
    if(login) console.log(`*CreateQuestion* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    // Obtener opciones de lenguajes
    const [languageOptions, setLanguageOptions] = useState()

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [tagError, setTagError] = useState(false)
    const [tagsLimit, setTagsLimit] = useState(false)
    const [apiError, setApiError] = useState()

    if (tagsLimit && tags.length < 15) setTagsLimit(false)
    if (!tagsLimit && tags.length >= 15) setTagsLimit(true)

console.log(tags);


    // Obtener Lenguajes
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/languages`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                method: 'GET'
            })

        const data = await res.json();

        setLanguageOptions(data)

    }, [])
    
    const modules = {

        // Opciones del toolbar
        toolbar: [
    
            [{ 'header': [1, 2, false] }],                                         // Opción para utilizar títulos, y número de opciones de título
            ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],  // Opciones de edición de texto
            [{'list': 'ordered'}, {'list': 'bullet'}],                             // Opciones para crear listas
            [{'indent': '-1'}, {'indent': '+1'}],                                  // Opciones de indentación 
            ['link', 'image'],                                                     // Links e imágenes
            [{ 'size': ['small', false, 'large', 'huge'] }]                        // Estas dos lineas no entiendo lo que hacen ¯\_(ツ)_/¯
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],                               // Opciones de estilo
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ]
            
    }

    // Función para eliminar elementos del array usando la tecla de retroceso
    const handleBackspace = async e => {

        if(e.keyCode === 8 && !tag.length) {
           
            setTags(tags.slice(0, tags.length -1))

        }

    }

    const handleSubmit = async e => {
        
        e.preventDefault()
        
        // Error. Usuario no logueado
        if (!login) {
            
            return alert('Debes iniciar sesión para realizar esta acción')
            
        }
        
        const questionData = {
            body: content,
            title: title,
            languages: languages,
            tags: tags
        }

        const res = await fetch(
            // Dirección
            'http://localhost:3001/questions', 
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                body: JSON.stringify(questionData),
                method: 'POST'
            })

        if (!res.ok) {

            console.log('Se ha producido un error');
            res.text().then(e => setApiError(e))
          
        } else {
          
            console.log('El fetch se ha realizado correctamente');
            const data = await res.json()
            
            // Reiniciar el contenido
            // setContent('')   
        }

        
        console.log(res);
        
    }
        
    return (
        
        <main className="create question main">

            <h1>Formula tu Pregunta:</h1>

            <input
                className='create question title'
                value= {title} 
                placeholder='Título de la pregunta...'
                onChange= {e => setTitle(e.target.value)}
            />

            <ReactQuill 
                theme="snow"
                modules={modules}
                value= {content}
                placeholder= 'Haz tu pregunta aquí...'
                onChange= {setContent}
            />  

            {/* Mostar Opciones de Lenguaje */}
            {languages.length < 3 && 

                <select 
                    className="create question tag" 
                    onChange={e => setLanguages([...languages, e.target.value])}>
                    
                    <option hidden>Lenguaje de Programación...</option>

                    {languageOptions && languageOptions
                        // Eliminar opciones ya elegidas
                        .filter(option => !languages.includes(option.name))
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

            }

            {/* Mostrar opciones elegidas (y borrar) */}
            {languages.length > 0 &&  

                <div className='languages-selected'>

                    {languages.map((language, i) => 
                        <div className='language-box' key={i}>
                            {language}
                            <button onClick={() => setLanguages(languages.filter(l => l !== language))}> 
                                x 
                            </button>
                        </div>
                    )}

                </div>
            }

            {/* Mostrar tags */}
            <div className='question-tags-selection'>
                <p>Insert Your Tags Separated By Comma ( , )</p>

                <div className='tags-text-area'>
                    {/* Para cada tag se crea un div con su valor y un botón para eliminarlo */}
                    {tags.length > 0 && tags.map((tag, i) => 
                        <div className='question-tag-selected' key={i}>
                            {tag}
                            <button onClick={() => setTags(tags.filter((_, j) => j !== i))}> 
                                x 
                            </button>
                        </div>
                    )}
                    
                    <input 
                        value={tag} 
                        type="text" 
                        onChange={e => 
                            // Mientras no se introduzca una coma
                            !e.target.value.includes(',') ?
                            // Se añade el valor a la variable tag
                            setTag(e.target.value) :
                            // Si se introduce una coma... 
                            (
                                // Si no se ha alzado el límite 
                                !tagsLimit ? (

                                    (              
                                        //Comprueba si la longitud es correcta,
                                        tag.length >= 2 
                                        && tag.length <= 50
                                        // que no se trata solo de números
                                        && !tag.match(/^[0-9]+$/)
                                        // que aún no ha sido introducido
                                        && !tags.includes(tag)
                                    
                                    ) ?
                                        // Si todo es correcto, lo introduce
                                        (setTags([...tags, tag]),
                                        // se resetea el tag actual
                                        setTag(''),
                                        // y se elimina el error
                                        setTagError(false))
                                    :
                                        // Si es incorrecto, se reinicia el tag acual,
                                        (setTag(''), 
                                        // y se envía un error
                                        setTagError(true))
                                ) : ''
  
                            )                                       
                        }
                        onKeyDown={e => handleBackspace(e)}
                    />
                            

                </div>

                {/* Si se ha alcanzado el limite de rags se lanza un mensaje debajo */}
                {tagsLimit && <span>Tags Limit Reached</span> }

                {/* Si se ha registrado un error en el tag introducido se lanza un mensaje debajo */}
                {tagError && <span>Tags Must Have Between 2-50 Characters, Cannot Have Only Numbers And Cannot Be Repeated</span> }
            
            </div>

            <form onSubmit={handleSubmit}>
                <button className="submit">
                    Enviar
                </button>

            </form>

            {apiError && 
            
                <div>{apiError}</div>
            
            }

        </main>
    )
}

export default CreateQuestion
