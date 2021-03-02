import './Vote.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';


function Vote({ parentID, reload }) {

    const login = useSelector(state => state.login)

    const [apiError, setApiError] = useState()

    const handleSubmit = async e => {
        e.preventDefault()

        let value = 1

        const res = await fetch(
            // Dirección
            `http://localhost:3001/questions/${parentID}/vote`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                body: JSON.stringify({ value }),
                method: 'POST'
            })

        if(!res.ok) {
            console.log('Se ha producido un error');
            res.text().then(e => setApiError(e))
        } else {
            console.log('El voto se ha emitido correctamente');
            setApiError('')
            reload()
        }

    }

    console.log(apiError);

    return (

        <div>

            <div>
                <button className="vote button" onClick={handleSubmit}><FontAwesomeIcon className="vote icon" icon={faGratipay} /></button>
            </div>

        </div>
    )
}


export default Vote;