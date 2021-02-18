import { useState } from 'react'
import './Acordeon.css'

function Acordeon({ children, onChange, parentID }) {
    const [visible, setVisible] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setVisible(!visible)
        onChange (parentID)       
    }

    return (
        <div className="acordeon">
            <button onClick={handleClick}>Añade un comentario</button>
            {visible &&
                <div className="expand">
                    {children}
                </div>
            }
        </div>
    )
}

export default Acordeon;