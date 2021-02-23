import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GetVote({parentID}) {
    const [data, setData] = useState([])
    const login = useSelector(state => state.login)

    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(`http://localhost:3001/question/${parentID}/vote`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)
        console.log(data)

    }, [])
    return (
        <div>{data.value}</div>
    )}


export default GetVote;

