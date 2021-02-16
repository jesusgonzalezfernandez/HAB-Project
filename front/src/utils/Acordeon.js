import { useState } from 'react'
import './Acordeon.css'

function Acordeon({ children }) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="acordeon">
            <button onClick={() => setVisible(!visible)}>Añade un comentario</button>
            {visible &&
                <div className="expand">
                    {children}
                </div>
            }
        </div>
    )
}

export default Acordeon;