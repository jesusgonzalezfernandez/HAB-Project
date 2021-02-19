import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import './ExpertProfile.css'
import EditProfile from './EditProfile';


function ExpertProfile({ data }) {
  const [editMode, setEditMode] = useState(false)
  const login = useSelector(l => l.login)
  const [displayName, setDisplayName] = useState(data.name || '')
  const [displaySurname, setDisplaySurname] = useState(data.surname || '')
  const [displayUsername, setDisplayUsername] = useState(data.avatar || '')

  console.log('Esto es login -->      ' + login.name)
  console.log('Esto es login -->      ' + JSON.stringify(login))


  const avatarStyle = login && login.avatar && { backgroundImage: 'url(' + login.avatar + ')' }

  return (
    <div className='expert-profile-component'>
      <h2>Admin</h2>
      <aside className='expert-profile'>
        <div className="avatar" style={avatarStyle} />
        <h3>{displayName} {displaySurname}</h3>
        <h4>{displayUsername}</h4>
        <button onClick={() => setEditMode(true)}>Editar</button>
        {editMode && <EditProfile reload={() => setEditMode(!editMode)} data={data} />}
      </aside>
      <div className='panel-preguntas'>
        <h3>Tus últimas respuestas</h3>
        <ul>
          {data.answers.map((q, i) =>
            <li key={i}>{q}</li>
          )}
        </ul>
      </div>
    </div>

  );
}

export default ExpertProfile;

