import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';


function EditProfile( {reload, data} ) {
    const login = useSelector(state => state.login)
    const { userID } = useParams()

    const [displayName, setDisplayName] = useState(data.name || '')
    const [displayUserName, setDisplayUserName] = useState(data.username || '')
    const [displaySurname, setDisplaySurname] = useState(data.surname || '')
    const [displayBirth, setDisplayBirth] = useState(data.birthData || '')
    const [displayCountry, setDisplayCountry] = useState(data.country || '')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const avatar = e.target.avatar.files[0]
        console.log('esto es e.target     ' + e.target.files)

        const fd = new FormData()
        fd.append('avatar', avatar)
        fd.append('displayName', displayName)
        fd.append('displayUserName', displayUserName)
        fd.append('displaySurname', displaySurname)
        fd.append('displayBirth', displayBirth)
        fd.append('displayCountry', displayCountry)
        
        const res = await fetch(`http://localhost:3001/users/${userID}`,
        {
            headers: { 'Content-Type': 'application/json', auth: login.token },
            method: 'PUT',
            body: fd,

          }
        )
        console.log(res);

        reload()
    }

    const avatarStyle = data && data.avatar && { backgroundImage: 'url(' + data.avatar + ')' }


    return (
        <div className='expert-profile-edit'>
            <form onSubmit={handleSubmit}>
                <div className='avatar' style={avatarStyle} />
                <input name='avatar' type='file' accept='image/*' />
                <input type="text" placeholder='Nombre...' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                <input type="text" placeholder='Apellido...' value={displaySurname} onChange={e => setDisplaySurname(e.target.value)} />
                <input type="text" placeholder='Nombre de usuario' value={displayUserName} onChange={e => setDisplayUserName(e.target.value)} />
                <input type="text" placeholder='País...' value={displayCountry} onChange={e => setDisplayCountry(e.target.value)} />
                <input type="text" placeholder='Fecha de nacimiento...' value={displayBirth} onChange={e => setDisplayBirth(e.target.value)} />
                <button>Guardar</button>
            </form>
            <button onClick={() => reload()}>Cancelar</button>

        </div>
    )
}

export default EditProfile
