import { useState } from 'react'
import './Acordeon.css'



function Acordeon({ children, onChange, parentID, active }) {

    // Controlar la acción del click
    const handleClick = e => {
        e.preventDefault()

        /* 
        
            Modifica el valor del estado 'active' a través
            de la función onChange (que recibe del padre)
            
            Si el id del elemento sobre el que se hace click
            no es igual al activo, setea el elemento
            actual como el activo.

            Y si el estado activo es el mismo que el actual,
            lo setea como undefined para que cierre el acordeon.
            
        */

        parentID !== active ? onChange(parentID) : onChange(undefined)       
    
    }

    return (

        <div className="acordeon">
            <button onClick={handleClick}>Añade un comentario</button>

            {/* 
            
                Si el id del padre coincide con el id 
                del elemento seteado como activo, 
                muestra el contenido
                
            */}

            {parentID === active &&
                <div className="expand">
                    {children}
                </div>
            }
        </div>
    )
}

export default Acordeon;