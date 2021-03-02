import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

function PostAnswer({ reload }) {

    // Obtener usuario del store
    const login = useSelector(state => state.login)
    if (login) console.log(`*CreateAnswer* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    const { questionID } = useParams()
    console.log(`Buscando la pregunta con ID: ${questionID}`);

    const [content, setContent] = useState('')

    const [apiError, setApiError] = useState()
    console.log(apiError);

    const modules = {

        // Opciones del toolbar
        toolbar: [

            [{ 'header': [1, 2, false] }],                                         // Opción para utilizar títulos, y número de opciones de título
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],  // Opciones de edición de texto
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],                             // Opciones para crear listas
            [{ 'indent': '-1' }, { 'indent': '+1' }],                                  // Opciones de indentación 
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

        if (!login) {

            return alert('Please log in first!')

        }

        const answerData = {
            body: content,
        }

        const res = await fetch(
            // Dirección
            `http://localhost:3001/questions/${questionID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                body: JSON.stringify(answerData),
                method: 'POST'
            })

        if(!res.ok) {
            console.log('Se ha producido un error');
            res.text().then(e => setApiError(e))
        } else {
            // Reiniciar el contenido
            setContent('')
            setApiError('')
            reload()
        }
    
    }

    return (

        <div>

            <h1>Respuesta:</h1>

            <ReactQuill
                theme="snow"
                modules={modules}
                value={content}
                placeholder='Publica tu respuesta aquí...'
                onChange={setContent}
            />

            <form onSubmit={handleSubmit}>
                <button className="submit">
                    Enviar
                    <div class="success"></div>
                </button>
                {apiError && 
                    <span>{apiError}</span>
                }
            </form>
        </div>
    )
}

export default PostAnswer;
