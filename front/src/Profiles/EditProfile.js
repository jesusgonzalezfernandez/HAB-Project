import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';


function EditProfile( {reload, data} ) {
    const login = useSelector(state => state.login)
    const { userID } = useParams()

    const [displayName, setDisplayName] = useState(data.name || '')
    const [displaySurname, setDisplaySurname] = useState(data.surname || '')
    const [displayBirth, setDisplayBirth] = useState(data.birthData || '')
    const [displayCountry, setDisplayCountry] = useState(data.country || '')
    const [displayUsername, setDisplayUsername] = useState(data.avatar || '')

    const handleSubmit = async e => {
        e.preventDefault()
        const avatar = e.target.avatar.files[0]
        const fd = new FormData()
        fd.append('avatar', avatar)
        fd.append('name', displayName)
        fd.append('surname', displaySurname)
        fd.append('birthDate', displayBirth)
        fd.append('country', displayCountry)
        fd.append('username', displayUsername)
        
        const res = await fetch(`http://localhost:3001/users/${userID}`,
        {
        
            headers: { 'auth': login.token },
            method: 'PUT',
            body: fd
        })
            // .then(res => res.json)
         
        console.log(res);

        reload()

    }

    const avatarStyle = login && login.avatar && {backgroundImage: 'url(' + login.avatar + ')' }


    return (
        <div className='expert-profile-edit'>
            <form onSubmit={handleSubmit}>
                <div className='avatar' style={avatarStyle} />
                <input name='avatar' type='file' accept='image/*' />
                <input type="text" placeholder='Username...' value={displayUsername} onChange={e => setDisplayUsername(e.target.value)} />
                <input type="text" placeholder='Nombre...' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                <input type="text" placeholder='Apellido...' value={displaySurname} onChange={e => setDisplaySurname(e.target.value)} />
                <input type="text" placeholder='País...' value={displayCountry} onChange={e => setDisplayCountry(e.target.value)} />
                <input type="text" placeholder='Fecha de nacimiento...' value={displayBirth} onChange={e => setDisplayBirth(e.target.value)} />
                <button>Guardar</button>
            </form>
            <button onClick={() => reload()}>Cancelar</button>

        </div>
    )
}

export default EditProfile
