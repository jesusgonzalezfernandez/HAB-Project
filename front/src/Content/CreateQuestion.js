import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import './CreateQuestion.css'



function CreateQuestion() {

    // Obtener usuario del store
    const login = useSelector(state => state.login)
    if(login) console.log(`*CreateQuestion* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [languages, setLanguages] = useState('')
    
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

    const handleSubmit = async e => {
        
        e.preventDefault()
        
        // Reiniciar el contenido
        setContent('')
        
        // Error. Usuario no logueado
        if (!login) {
            
            return alert('Debes iniciar sesión para realizar esta acción')
            
        }
        
        const questionData = {
            body: content,
            title: title,
            languages: languages,
        }

        const res = await fetch(
            // Dirección
            'http://localhost:3001/questions', 
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                body: JSON.stringify(questionData),
                method: 'POST'
            })
        
        console.log(res);
        
    }
        
    return (
        
        <div>

            <h1>Formula tu Pregunta:</h1>

            <input
                className='question-title'
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

            <select value={languages} onChange={e => setLanguages(e.target.value)}>
                <option value='' hidden>Seleciona una opción...</option>
                <option value='javascript'>Javascript</option>
                <option value='python'>Python</option>
                <option value='mysql'>MySQL</option>
                <option value='html'>HTML</option>
            </select>

            <form onSubmit={handleSubmit}>
                <button class="submit">
                    Enviar
                </button>

            </form>

            <div>
                <h1>Test..</h1>
                Contenido: {content}
            </div>
        </div>
    )
}

export default CreateQuestion
