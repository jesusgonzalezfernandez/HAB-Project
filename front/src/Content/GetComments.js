import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GetComment.css'

function GetComments({parentID}) {
    const [data, setData] = useState([])
    const login = useSelector(state => state.login)

    // Obtener el ID de la pregunta y de la respuesta
    const { questionID } = useParams()
    console.log(`Asociando a la pregunta con ID: ${questionID} y a la respuesta con ID: ${parentID}`);

    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/questions/${questionID}/${parentID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)
        console.log(`Resultado de la respuesta: ${JSON.stringify(data)}`)
    }, [])

return (
    <div>
        {data.length >= 1 &&
            <div className="get comments">
                {data.map(comment =>
                    <div className="comment box">
                        <div> {comment.username} </div>
                    <div> {comment.body} </div>
                    </div>
                )}
            </div>
        }
        {data.length < 1 &&

            <div>
                <i></i>
            </div>
        }
    </div>
)
}

export default GetComments;