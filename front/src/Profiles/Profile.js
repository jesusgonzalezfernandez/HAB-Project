// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux'
import useFetch from '../useFetch'
import { NavLink } from 'react-router-dom';

function Profile() {
  const login = useSelector(s => s.login)
  console.log(login.token)

  const data = useFetch("http://localhost:9999/users/profile/" + login.userID) || []

  return (
    <div>
      {login && 
      <div>
            <h3>Mi perfil: {login.username}</h3>
            <h4>{data.username}</h4>
      </div>
      }
        {!login &&
            <NavLink to="/login" activeClassName="selected">Iniciar sesión</NavLink>
        }

    </div>
  );
}


export default Profile
