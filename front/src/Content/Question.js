import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetAnswers from './GetAnswers';
import PostAnswer from './PostAnswer';
import Moment from 'react-moment';
import './Question.css'



function Question() {

    const login = useSelector(state => state.login)
    
    if (login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    const [data, setData] = useState()
    const [tags, setTags] = useState([])
    
    // Obtener id de la pregunta
    const { questionID } = useParams()
    console.log(`Buscando la pregunta con ID: ${questionID}`);

    // Obtener pregunta al cargar la página
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
        setTags(data.tags.split(','))

        console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)

    }, [])

    if (!data) return 'Loading ...'

    return (

        <div key={data.id}>

            {/* Fecha */}
            <div className='question-creation-date'>
                <Moment format='YYYY/MM/DD'>
                    {data.creationDate}
                </Moment> 
            </div>
            
            {/* Título */}
            <h2 className="question-title"> {data.title}</h2>

            {/* Cuerpo */}
            <div className="question-body">
                {data.body}
            </div>

            {/* Tags */}
            <div className='question-tags'>
                {tags && tags.map(tag => 
                    <a href={'http://localhost:3001/questions?tags=' + tag}>
                        {tag}
                    </a>
                )}

            </div>

            <div>

                <GetAnswers />
                <PostAnswer />
            
            </div>

        </div>

    )
}


export default Question;