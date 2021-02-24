import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GetAnswers.css';
import Acordeon from '../utils/Acordeon'
import GetComments from './GetComments';
import PostComment from './PostComment';
import Moment from 'react-moment';
import Vote from './Vote';
import GetVote from './GetVote';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGratipay } from '@fortawesome/free-brands-svg-icons';


function GetAnswers({ key, reload }) {

    const [data, setData] = useState([])

    // Definir el estado del acordeon activo
    const [active, setActive] = useState()

    // Obtener información de login
    const login = useSelector(state => state.login)

    // Obtener el ID de la pregunta
    const { questionID } = useParams()

    // Obtener los datos de la pregunta
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/answers/${questionID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)
        console.log(`Resultado de la respuesta: ${data}`)

    }, [key])


    return (
        <div>

            {/* Si hay resultados los muestra */}
            {data.length >= 1 &&
                <div className="get-answers">
                    <h4>{data.length} {data.length > 1 ? 'Respuestas' : 'Respuesta'} </h4>
                    {/* Y recorre el array de resultados */}
                    {data.map(answer =>
                        <div className="answer box">
                            {/* En la caja de respuestas muestra avatar, autor, fecha, votos y body */}
                            <div className="answer publish">
                                <div className="answer author">
                                    <img className="answer avatar" src={`http://localhost:3001/${answer.avatar}`} alt="avatar" />
                                    {answer.username} respondió el <Moment format='DD/MM/YYYY'>
                                        {answer.creationDate}
                                    </Moment>
                                </div>
                            </div>
                            <main className="answer main">
                                <aside className="answer vote">
                                    Votos:
                                    <FontAwesomeIcon className="vote icon" icon={faGratipay} />
                                    <GetVote
                                        parentID={answer.id} />
                                </aside>
                                <div className="answer body">{answer.body}</div>
                            </main>
                            <div className='get-comments'>
                                {/* Obtener los comentarios a partir del id de respuesta */}
                                <GetComments parentID={answer.id} />
                            </div>
                            <div className="answer footer">
                                <div className="answer acordeon">
                                    {/* Obtener el formulario para realizar un comentario */}
                                    <Acordeon

                                        // Función para cambiar el estado de la respuesta activa
                                        onChange={value => setActive(value)}
                                        // ID de la respuesta actual
                                        parentID={answer.id}
                                        // ID de la respuesta activa
                                        active={active} >

                                        {/* Contenido del acordeon */}
                                        <PostComment
                                            reload={reload}
                                            parentID={answer.id} />

                                    </Acordeon>

                                </div>
                                <div>
                                    <Vote
                                        parentID={answer.id} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }

            {data.length < 1 &&

                <div>
                    <i>Todavía no hay respuestas</i>
                </div>

            }
        </div>
    )
}

export default GetAnswers;