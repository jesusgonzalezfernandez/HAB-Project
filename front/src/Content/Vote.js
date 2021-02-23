import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Vote.css'
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'



function Vote({parentID}) {
    const login = useSelector(state => state.login)
    const [value, setValue] = useState(0)

    const answerID = parentID

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await fetch(
            // Dirección
            `http://localhost:3001/questions/${answerID}/vote`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                body: JSON.stringify({value}),
                method: 'POST'
            })

        console.log(`Res de value ${JSON.stringify(res)}`);

    }

    return (
        <div>
            ¿Te ha resultado útil? <button onClick={handleSubmit} onChange={e => setValue(e.target.value)} ><FontAwesomeIcon className="vote icon" icon={faGratipay} /></button>
            <span>Votos:</span>
        </div>
    )
}


export default Vote;