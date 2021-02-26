import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Vote.css'
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';


function Vote({ parentID, reload }) {
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()


    const answerID = parentID

    const handleSubmit = async e => {
        e.preventDefault()

        let value = '1'

        const res = await fetch(
            // Dirección
            `http://localhost:3001/questions/${parentID}/vote`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
                body: JSON.stringify({ value }),
                method: 'POST'
            })

        console.log(`Res de value ${JSON.stringify(res)}`);
        dispatch({ type: 'update', value })
        // reload()

    }

    return (
        <div>
            <button className="vote button" onClick={handleSubmit}><FontAwesomeIcon className="vote icon" icon={faGratipay} /></button>
        </div>
    )
}


export default Vote;