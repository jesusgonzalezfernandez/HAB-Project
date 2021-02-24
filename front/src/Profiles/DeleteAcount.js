import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function DeleteAcount({ reload }) {
  const login = useSelector(state => state.login)
  const { userID } = useParams()
  const dispatch = useDispatch()
  const [reason, setReason] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(`http://localhost:3001/users/${userID}`,
      {
        headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
        method: 'DELETE',
        body: JSON.stringify({reason})
      })

    dispatch({ type: 'logout' })
    return <Redirect to='/' />

    reload()
  }


  return (
    <div className='expert-profile-edit'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Razón...' value={reason} onChange={e => setReason(e.target.value)} minLength='3' />
        <button>Guardar</button>
        <button onClick={() => reload()}>Cancelar</button>
      </form>
    </div>
  )
}

export default DeleteAcount
