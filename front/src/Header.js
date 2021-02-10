import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'logout' })
  }

  return (
    <header>
        <h1><Link to="/">Howdoi</Link></h1>
        <Link to="/about">¿Qué es Howdoi?</Link>
        <Link to="/questions">Preguntas</Link>
        {!login &&
            <Link to="/login">Iniciar sesión</Link>
        }
        {login &&
            <div>
                {login.username}
                <button onClick={handleLogout}>Logout</button>
            </div>
        }
    </header>
  );
}

export default Header;
