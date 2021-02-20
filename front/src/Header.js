import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import './Header.css'
import logo from './logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'logout' })
    return <Redirect to="/" />
  }

  console.log(login)

  return (
    <header className='nav-header'>
      <Link to="/"><img src={logo} className={'logo'} alt={'logo'} /></Link>
      <nav className={'menu-nav'}>
        <NavLink to="/about" activeClassName="selected">¿Qué es Howdoi?</NavLink>
        <NavLink to="/questions" activeClassName="selected">Preguntas</NavLink>
        {!login &&
          <NavLink to="/login" activeClassName="selected">Iniciar sesión</NavLink>
        }

          {login &&
            <div className={'user-nav'}>
              <NavLink to={`/users/profile/${login.userID}`}> Perfil {login.username} </NavLink>
          <button className="logout" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} color="#3307ad" size="lg" /></button>
            </div>
          }
      </nav>

    </header>
  );
}

export default Header;
