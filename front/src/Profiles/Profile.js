// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import QuestionPreview from '../Content/QuestionPreview';
import Loading from '../Home/Loading';
import DeleteAcount from './DeleteAcount';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import './Profile.css'


function Profile() {
  const [dataUser, setDataUser] = useState()
  const [dataQuestions, setDataQuestions] = useState()
  const [dataAnswers, setDataAnswers] = useState()

  const login = useSelector(state => state.login)
  const [editMode, setEditMode] = useState(false)
  const [active, setActive] = useState()


  // Obtener id del usuario buscado
  const { userID } = useParams()

  // Ejecutar fetch al cargar la página
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(

        `http://localhost:3001/users/profile/${userID}`,
        {
          headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
          method: 'GET'
        })

      const data = await res.json();
      setDataUser(data.user)
      setDataQuestions(data.questions)
      setDataAnswers(data.answers)
      // console.log(`Resultado del perfil del usuario: ${JSON.stringify(data)}`)
    }
    fetchData()
  }, [])

  if (!login) return <Redirect to='/' />

  if (!dataUser) return <Loading />

  const imagen = dataUser.map(user => user.avatar)
  console.log('esto es avatar:' + login.avatar)


  return (

    <div className='profile-component'>
      <div className='profile-card'>
        <div className='user-info'>
          <img src={`http://localhost:3001/${login.avatar}`} alt="avatar" className='profile-avatar' />
          <div>
            <h3>{login.name} {login.surname}</h3>
            <h4>{login.username}</h4>
          </div>
        </div>
        <div className='profile-card-menu'>
          <div onClick={() => setActive('profile')}>Editar perfil</div>
          {active === 'profile' && <EditProfile reload={() => setActive(!active)} />}
          <div onClick={() => setActive('password')}>Editar password</div>
          {active === 'password' && <EditPassword reload={() => setActive(!active)} />}
          <div onClick={() => setActive('delete')}>Eliminar cuenta</div>
          {active === 'delete' && <DeleteAcount reload={() => setActive(!active)} />}
        </div>
      </div>
      <div className='profile-data'>
        <div className='panel-respuestas'>
          <h3>Tus últimas respuestas</h3>
          <ul>
            {dataAnswers && dataAnswers.map((answer, i) =>
              <li className='profile-lista-respuestas' key={i}>
                <Link to={`/question/${answer.questionID}`}> {answer.body} </Link>
              </li>
            )}
          </ul>
        </div>
        <div className='panel-preguntas'>
          <h3>Tus últimas preguntas</h3>
          <ul>
            {dataQuestions && dataQuestions.map((question, i) =>
              <li className='profile-lista-preguntas' key={i}>
                <QuestionPreview question={question} />
              </li>
            )}
          </ul>
        </div>
      </div>

    </div>

  )
}

export default Profile;

