import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function CreateQuestion() {

    const [content, setContent] = useState('')

    const modules = {

        // Opciones de la barra de herramientas:

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
        ],
      }
    

    return (

        <div>

            <h1>Formula tu Pregunta:</h1>

            <ReactQuill 
                theme="snow"
                modules = {modules}
                value={content}
                onChange={setContent}
            />  

            <div>
                <h1>Test..</h1>
                {content}
            </div>
        </div>
    )
}

export default CreateQuestion
