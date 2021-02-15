import useFetch from '../useFetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GetAnswers.css'


function GetAnswers() {
    const [data, setData] = useState()
    const login = useSelector(state => state.login)
    if (login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    const { questionID } = useParams()
    console.log(`Asociando a la pregunta con ID: ${questionID}`);

    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(

            `http://localhost:3001/answers/${questionID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)


        console.log(`Resultado de la pregunta: ${JSON.stringify(data)}`)

    }, [])

    return (
        <div>
            {data &&
                <div className="get answers">
                    {/* Esto está mal, sólo devuelve la primera */}
                    {Object.values(data).map(answer =>
                        <div key={answer.id}>
                            {answer}
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default GetAnswers;

{/* {data.length >= 1 &&

                <div className="search answers">

                    {data.map(answer =>

                        <div key={answer.id}>
                            {answer}
                        </div>
                    )}

                </div>
            }

            {data.length < 1 &&

                <div>
                    <i>Todavía no hay respuestas</i>
                </div>
            } */}