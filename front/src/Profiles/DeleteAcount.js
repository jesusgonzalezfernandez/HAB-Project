import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function DeleteAcount() {

  // Obtener Login
  const login = useSelector(state => state.login)

  // Obtener ID
  const { userID } = useParams()

  // States
  const [reason, setReason] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [error, setError] = useState()

  const dispatch = useDispatch()

  const handleSubmit = async e => {

    e.preventDefault()

    // Si la contraseña de confirmación no coincide se lanza un error y se detiene el proceso
    if (repeatPassword !== password) {
      setError('Las Contraseñas No Coinciden')
      return
    }

    const res = await fetch(`http://localhost:3001/users/${userID}`,
      {
        headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
        method: 'DELETE',
        body: JSON.stringify({ reason, password })
      })

    if (!res.ok) {
      // Si ha habido algún error, se guarda para mostrarlo
      res.text().then(e => setError(e))
      console.log('Se ha producido un error');
    } else {
      // Si ha sido exitoso, se anula el login y se redirige al home
      dispatch({ type: 'logout' })
      return <Redirect to='/' />
    }

  }


  return (
    <div className='delete-acount'>

      <form onSubmit={handleSubmit}>
        {error &&
          <div className='delete-profile-error'>Se Ha Producido un Error: {error}</div>
        }

        ¿Cuál es el motivo? Nos ayudarás a mejorar <textarea
          type="text"
          placeholder='Razón...'
          value={reason}
          minLength='3'
          onChange={e => setReason(e.target.value)}
        />

        Confirma tu contraseña
        <input
          type="password"
          placeholder='Contraseña...'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        Confirma tu contraseña para continuar. Será definitivo 
        <input
          type="password"
          placeholder='Confirmar Contraseña...'
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />

        <div className='form-buttons'>
          <div>Guardar</div>
          <div onClick={() => { setPassword(''); setRepeatPassword(''); setReason('') }}>Cancelar</div>
        </div>

      </form>

      {/* <button 
        onClick={() => {setPassword(''); setRepeatPassword(''); setReason('')}}>
          Cancelar
      </button> */}

    </div>
  )
}

export default DeleteAcount
