import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetAnswers from './GetAnswers';
import PostAnswer from './PostAnswer';
import Moment from 'react-moment';
import './Question.css'
import Loading from '../Home/Loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import LoginForm from '../User/LoginForm'

function Question() {

    const login = useSelector(state => state.login)

    const [data, setData] = useState()
    const [tags, setTags] = useState([])
    const [key, setKey] = useState(0)

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
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            })

        const data = await res.json();

        setData(data)
        setTags(data.tags.split(','))

        console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)

    }, [])

    if (!data) return <Loading />

    return (
        <main className="question main" key={data.id}>
            <div className="question top">
                <div className="question back">
                    <a href="http://localhost:3000/questions"><FontAwesomeIcon icon={faArrowCircleLeft} color="white" size="lg" /> Volver </a>
                </div>
                {/* El link no funciona, esa ruta no existe */}
                <div className="question language">Posteado en: <span className="question language tag"><a href={`http://localhost:3000/questions?languages=${data.languages}`}> {data.languages} </a> </span></div>
            </div>
            <div className="question box">
                {/* Título */}
                <h2 className="question title"> {data.title}</h2>
                {/* Fecha */}
                <div className="question publish">
                    <div className={data.status === 'open' ? "data status open" : "data closed"} >{data.status}</div>
                    <div className="question author">
                        Publicado por:
                        <img className="question avatar" src={`http://localhost:3001/${data.avatar}`} alt="avatar" />
                        {data.username} el <Moment format='DD/MM/YYYY'>
                            {data.creationDate}
                        </Moment>
                    </div>
                </div>
                {/* Cuerpo */}
                <div className="question body">
                    {data.body}
                </div>
                {/* Tags */}
                <div className='question tags'>
                    {tags && tags.map(tag =>
                        <a href={'http://localhost:3001/questions?tags=' + tag}>
                            {tag}
                        </a>
                    )}
                </div>
            </div>

            <div>
                {/* <h4>Respuestas:</h4> */}
                {/* Para que recargue al enviar necesitamos avisarle al useEffect
                de que hay un cambio, lo hacemos con key. En este caso lo que tiene
                que recargarse es el camponente de las respuestas, por lo que recibe
                ese prop además del propio componente de crear respuestas */}
                {login &&
                    <div>
                        <GetAnswers key={key} reload={() => setKey(key + 1)} />
                        <PostAnswer reload={() => setKey(key + 1)} />
                    </div>
                }
                {!login &&
                    <div>
                        <p>Para ver el registro del contenido debes iniciar sesión</p>
                        <LoginForm />
                    </div>}
            </div>
        </main>

    )
}


export default Question;