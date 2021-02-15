import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetAnswers from './GetAnswers';
import './Question.css';
import PostAnswer from './PostAnswer'


function Question() {

    const [data, setData] = useState()
    const login = useSelector(state => state.login)
    if (login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(

            // Dirección
            `http://localhost:3001/questions/${questionID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)

        console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)
    }, [])

    // Obtener id de la pregunta
    const { questionID } = useParams()
    console.log(`Buscando la pregunta con ID: ${questionID}`);

    if (!data) return 'Loading ...'

    return (
        <div key={data.id}>
            <div> {data.creationDate}
            </div>
            <h2 className="question title"> {data.title}
            </h2>
            <div className="question body">
                {data.body}
            </div>
            {}
            <div>

                <GetAnswers />
                <PostAnswer />
            
            </div>
        </div>

    )
}


export default Question;