import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import './ExpertProfile.css'
import EditProfile from './EditProfile';


function ExpertProfile({ data }) {
  const [editMode, setEditMode] = useState(false)
  
  return (
    <div className='expert-profile-component'>
      <h2>Admin</h2>
      <aside className='expert-profile'>
      <img src={`http://localhost:3001/${data.avatar}`} alt="avatar"/>
        <h3>{data.name} {data.surname}</h3>
        {/* <h4>{data.username}</h4> */}
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

