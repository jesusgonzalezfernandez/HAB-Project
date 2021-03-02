import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function GetVote({voteKey, parentID}) {

console.log('votekey: ' + voteKey);

    const [data, setData] = useState([])
    const login = useSelector(state => state.login)

    // Ejecutar fetch al cargar la página o cambiar el voteKey
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

    }, [voteKey])

    return (
        <div className="vote number">Votos: {data.length}</div>
    )}


export default GetVote;

