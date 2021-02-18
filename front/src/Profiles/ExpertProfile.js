import Moment from 'react-moment';
import avatarPic from '../imagenes/avatar-experto.png';
import { useState } from 'react'
import './ExpertProfile.css'
import EditProfile from './EditProfile';


function ExpertProfile({ data }) {
  const [editMode, setEditMode] = useState(false)
  
  const avatar = data && data.avatar && {backgroundImage: 'url(' + data.avatar + ')' }


  return (
    <div className='expert-profile-component'>
      <h2>Admin</h2>
      <aside className='expert-profile'>
        {/* <img src={avatarPic} alt="avatar-expert" /> */}
        <div className='avatar' style={avatar} />
        <h3>{data.name} {data.surname}</h3>
        <h4>{data.username}</h4>
        <Moment format='DD/MM/YYYY'>
          {data.birthDate}
        </Moment>
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

