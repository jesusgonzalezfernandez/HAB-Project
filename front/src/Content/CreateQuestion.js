import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './CreateQuestion.css'

function CreateQuestion() {

    // Obtener usuario del redux
    // const user = useSelector(state => state.user)

    // Usuario fake:
    const user = {username: 'demo', isAdmin: true, userID: 1}

    const [content, setContent] = useState('')
    
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
        if (!user) {
            
            return alert('Please log in first!')
            
        }
        
        const questionData = {
            content: content,
            userID: user.userID
        }

        const res = await fetch('http://localhost:9999/', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionData),
            method: 'POST'
        })
        
        console.log(res);
        
        // Enviar a back
        // fetch.post('api/...', questionData)
        
        
        
        console.log(questionData);
        
        
    }
        
    return (
        
        <div>

            <h1>Formula tu Pregunta:</h1>

            <ReactQuill 
                theme="snow"
                modules={modules}
                value= {content}
                placeholder= 'Post your question here...'
                onChange= {setContent}
            />  

            <form onSubmit={handleSubmit}>
                <button>
                    Submit
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
