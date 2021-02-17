import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import avatarPic from '../imagenes/avatar-experto.png';
import './ExpertProfile.css'
import Loading from '../Home/Loading';


function ExpertProfile({ data }) {
  const [question, setQuestion] = useState()
  const login = useSelector(state => state.login)

  if (login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

  const { userID } = useParams()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(

        `http://localhost:3001/answers/user/${userID}`,
        {
          headers: { 'Content-Type': 'application/json', auth: login.token },
          method: 'GET'
        })

      const question = await res.json();
      setQuestion(question)

      console.log(`Resultado de la búsqueda: ${JSON.stringify(question)}`)
    }
    fetchData()
  }, [])

  if (!question) return <Loading />

  return (

    <div className='expert-profile-component'>
      <h2>Admin</h2>
      <aside className='expert-profile'>
        <img src={avatarPic} alt="avatar-expert" />
        <h3>{data.name} {data.surname}</h3>
        <h4>{data.username}</h4>

        <Moment format='DD/MM/YYYY'>
          {data.birthDate}
        </Moment>
      </aside>
      <div className='panel-preguntas'>
        <h3>Tus últimas respuestas</h3>
        <ul>
          {question.map(q =>
            <li key={q.id}>{q.body}</li>
          )}
        </ul>

      </div>

    </div>

  );
}

export default ExpertProfile;

