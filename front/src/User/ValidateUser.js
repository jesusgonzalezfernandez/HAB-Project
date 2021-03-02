import { useEffect, useState } from 'react';
import { useParams, Redirect } from "react-router-dom";

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

    if (data) return <Redirect to='/login' />

    return (
        'Usuario validado correctamente'
    );
}

export default ValidateUser;