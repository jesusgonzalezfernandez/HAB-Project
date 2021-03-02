import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function EditPassword({ reload }) {
  const login = useSelector(state => state.login)
  const { userID } = useParams()
  const dispatch = useDispatch()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [passError, setPassError] = useState(true)

  const [error, setError] = useState()

  // if (confirmPass !== password || !password) {
  //   setPassError(true)
  // }

  const handleSubmit = async e => {
    e.preventDefault()
    if (password === confirmPass) {
      const res = await fetch(`http://localhost:3001/users/${userID}/password`, {
        headers: { 'auth': 'Bearer ' + login.token },
        body: JSON.stringify({ oldPassword, password }),
        method: 'PUT'
      }).then(res => {
        if (!res.ok) {
          console.log('Se ha producido un error');
          throw res;
        }
        console.log('El fetch se ha realizado correctamente');
        return res.json()
      })
        .then(data => {
          // Enviar objeto action al redux, con el type y los datos obtenidos de la API
          dispatch({ type: 'update', data })
        })
        .catch(e =>
          // Capturar error
          e.text().then(e => setError(e))
        )

      reload()
    } else {
      return 'Error'
    }

  }


  return (
    <div className='edit-password'>
      <form onSubmit={handleSubmit}>
        Confirma tu antigua contraseña <input type="password" placeholder='Antigua contraseña...' value={oldPassword} onChange={e => setOldPassword(e.target.value)} minLength='3' required />
        Nueva contraseña <input type="password" placeholder='Nueva contraseña...' value={password} onChange={e => setPassword(e.target.value)} minLength='3' required />
        Confirma tu nueva contraseña <input type="password" placeholder='Nueva contraseña...' value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required />
        <div className='form-buttons'>
          <div>Guardar</div>
          <div onClick={() => reload()}>Cancelar</div>
        </div>
      </form>
      {!passError &&
        <div>Error</div>
      }
    </div>
  )
}

export default EditPassword
