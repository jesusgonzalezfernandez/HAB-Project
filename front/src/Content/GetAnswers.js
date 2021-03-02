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


function GetAnswers({ key, reload }) {

    const [data, setData] = useState([])

    // Definir el estado del acordeon activo
    const [active, setActive] = useState()

    // Estado de recarga de las respuestas para obtener los votos
    const [voteKey, setVoteKey] = useState(0)

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
        
        if(!res.ok) {
            console.log('Se ha producido un error');
        } else {
            const data = await res.json()
            setData(data)
        }

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
                                <div className="answer body">{answer.body}</div>
                            </main>
                            <div className='get-comments'>
                                {/* Obtener los comentarios a partir del id de respuesta */}
                                <GetComments parentID={answer.answerID} />
                            </div>
                            <div className="answer footer">
                                <div className="answer acordeon">
                                    {/* Obtener el formulario para realizar un comentario */}
                                    <Acordeon

                                        // Función para cambiar el estado de la respuesta activa
                                        onChange={value => setActive(value)}
                                        // ID de la respuesta actual
                                        parentID={answer.answerID}
                                        // ID de la respuesta activa
                                        active={active} >

                                        {/* Contenido del acordeon */}
                                        <PostComment
                                            reload={reload}
                                            parentID={answer.answerID} />

                                    </Acordeon>
                                </div>
                                {/* Votos */}
                                <div className="answer vote">
                                    <div className="answer get vote">
                                        {/* Recibe voto */}
                                        <GetVote
                                            voteKey={voteKey}
                                            parentID={answer.answerID} />
                                        {/* Emite voto */}
                                        <Vote
                                            reload={() => setVoteKey(voteKey + 1)}
                                            parentID={answer.answerID} />
                                    </div>
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