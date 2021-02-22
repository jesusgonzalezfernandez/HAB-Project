import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import './ExpertProfile.css'
import EditProfile from './EditProfile';


function ExpertProfile({ data }) {
  const login = useSelector(state => state.login)
  const [editMode, setEditMode] = useState(false)

  
  
  return (
    <div className='expert-profile-component'>
      <aside className='expert-profile'>
      <h2>Experto</h2>
      <img src={`http://localhost:3001/${data.avatar}`} alt="avatar"/>
        <h3>{login.name} {login.surname}</h3>
        <h4>{login.username}</h4>
        <button onClick={() => setEditMode(true)}>Editar</button>
        {editMode && <EditProfile reload={() => setEditMode(!editMode)} data={data} />}
      </aside>
      <div className='panel-preguntas'>
        <h3>Tus últimas respuestas</h3>
        <ul>
          {data.answers.map((q, i) =>
            <li className='profile-lista-respuestas' key={i}>{q}</li>
          )}
        </ul>
      </div>
    </div>

  );
}

export default ExpertProfile;

