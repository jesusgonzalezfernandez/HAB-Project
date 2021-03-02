import { useEffect, useState } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './ValidateUser.css'

function ValidateUser() {
    const [data, setData] = useState([])

    const { code } = useParams();

    useEffect(async () => {
        const res = await fetch(`http://localhost:3001/users/validate/${code}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        })
        const data = await res.json();
        setData(data)
    }, [])

    // if (data) return <Redirect to='/login' />

    return (
        <div className= "validate user">
        <p>Usuario validado correctamente</p>
        <p>¡Inicia sesión para unirte a la comunidad Howdoi!</p>
        <Link to='/login' className="submit"> <p>Iniciar sesión</p></Link>
        </div>        
    );
}

export default ValidateUser;