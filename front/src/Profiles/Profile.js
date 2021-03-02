// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Loading from '../Home/Loading';
import DeleteAcount from './DeleteAcount';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import './Profile.css'
import UserActivity from './UserActivity';


function Profile() {
  const [dataUser, setDataUser] = useState()
  const [dataQuestions, setDataQuestions] = useState()
  const [dataAnswers, setDataAnswers] = useState()

  const login = useSelector(state => state.login)
  const [editMode, setEditMode] = useState(false)
  const [active, setActive] = useState('activity')
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

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
    }
    fetchData()
  }, [])

  if (!login) return <Redirect to='/' />

  if (!dataUser) return <Loading />

  const imagenAvatar = `http://localhost:3001/${login.avatar}`

  const imagen = login.email.includes('@gmail.') ? login.avatar : imagenAvatar

  return (

    <div className='profile-component'>
      <div className='profile-card'>
        <div className='user-info'>
          <img src={imagen} alt="avatar" className='profile-avatar' />
          <div>
            <h3>{login.name} {login.surname}</h3>
            <h4>{login.username}</h4>
          </div>
        </div>
        <div className='profile-menu'>
          <ul>
            <li onClick={() => setActive('activity')} className='profile-menu-ul'>
              Actividad
            </li>
            <li onClick={() => setActive('profile')} className='profile-menu-ul'>
              Editar perfil
            </li>
            <li onClick={() => setActive('password')} className='profile-menu-ul'>
              Cambiar contraseña
            </li>
            <li onClick={() => setActive('delete')} className='profile-menu-ul'>
              Eliminar cuenta
            </li>

          </ul>
        </div>
      </div>
      <div className='profile-info'>
        {active === 'activity' && <UserActivity />}
        {active === 'profile' && <EditProfile reload={() => setActive(!active)} />}
        {active === 'password' && <EditPassword reload={() => setActive(!active)} />}
        {active === 'delete' && <DeleteAcount reload={() => setActive(!active)} />}
      </div>
    </div>

  )
}

export default Profile;

