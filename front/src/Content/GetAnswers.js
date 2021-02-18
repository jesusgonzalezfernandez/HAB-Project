import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GetAnswers.css'
import Acordeon from '../utils/Acordeon'
import PostAnswer from './PostAnswer';
import GetComments from './GetComments';
import PostComment from './PostComment';


function GetAnswers({ key, reload }) {
    const [data, setData] = useState([])
    const [active, setActive] = useState(1)

    const login = useSelector(state => state.login)
    // if (login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);
    // Obtener el ID de la pregunta
    const { questionID } = useParams()
    // console.log(`Asociando a la pregunta con ID: ${questionID}`);
    console.log(`Active: ${active}`)


    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/answers/${questionID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)
        console.log(`Resultado de la pregunta: ${JSON.stringify(data)}`)

    }, [key])


    return (
        <div>
            {data.length >= 1 &&
                <div className="get answers">
                    {data.map(answer =>
                        <div className="answer box">
                            <div> {answer.username} </div>
                            <div> {answer.body} </div>
                            <div className='get comments'>
                                <GetComments parentID={answer.id} />
                            </div>
                            {active &&
                                <Acordeon onChange={value => setActive(value)} parentID={answer.id}>
                                    {active === answer.id &&
                                        <PostComment reload={reload} parentID={answer.id} />}
                                </Acordeon>
                            }
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