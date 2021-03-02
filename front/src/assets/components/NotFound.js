import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <div className='not-found'>
            <div className='imagen-404' />
            <div className='message-404'>
                <h3 className='error-message'>Error 404. No encontramos lo que buscas.</h3>
                <Link to='/Home'>Volver</Link>
            </div>
        </div>
    )
}

export default NotFound
