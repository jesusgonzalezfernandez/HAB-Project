import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Vote.css'
import { faGratipay } from '@fortawesome/free-brands-svg-icons';

function Vote() {
    const [value, setValue] = useState(0)
    return (
        <div>
            ¿Te ha resultado útil? <button onClick={() => setValue(value + 1)}><FontAwesomeIcon className="vote icon" icon={faGratipay} /></button>
        </div>
    )
}


export default Vote;