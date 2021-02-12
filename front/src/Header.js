import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './Header.css'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'logout' })
    return <Redirect to="/" />
  }

  return (
    <header>
        <h1><NavLink to="/" activeClassName="selected">Howdoi</NavLink></h1>
        <NavLink to="/about" activeClassName="selected">¿Qué es Howdoi?</NavLink>
        <NavLink to="/questions" activeClassName="selected">Preguntas</NavLink>
        {!login &&
            <NavLink to="/login" activeClassName="selected">Iniciar sesión</NavLink>
        }
        {login &&
            <div>
                <button onClick={handleLogout}>Logout</button>
                <NavLink to={`/users/profile/${login.userID}`}> Perfil {login.username} </NavLink>
            </div>
        }
    </header>
  );
}

export default Header;
