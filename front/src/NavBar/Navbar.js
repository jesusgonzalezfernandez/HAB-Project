import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import './Navbar.css';
import logo from '../logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogout } from 'react-google-login';

function Navbar() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'logout' })
    return <Redirect to="/" />
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo} alt='logo' className='navbar-logo' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <NavLink
              to='/about'
              className='nav-links'
              activeClassName='selected'
              onClick={closeMobileMenu}
            >
              ¿Qué es Howdoi?
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/questions'
              className='nav-links'
              activeClassName='selected'
              onClick={closeMobileMenu}
            >
              Preguntas
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/contact'
              className='nav-links'
              activeClassName='selected'
              onClick={closeMobileMenu}
            >
              Contacto
            </NavLink>
          </li>
          {!login &&
            <li className='nav-item'>
              <NavLink
                to='/register'
                className='nav-links'
                activeClassName='selected'
                onClick={closeMobileMenu}
              >
                Registro
            </NavLink>
            </li>
          }
          {!login &&
            <li className='nav-item'>
              <NavLink
                to='/login'
                className='nav-links'
                activeClassName='selected'
                onClick={closeMobileMenu}
              >
                Iniciar sesión
          </NavLink>
            </li>
          }
          {login &&
            <li className='nav-item'>
              <NavLink
                to={`/users/profile/${login.userID}`}
                className='nav-links'
                activeClassName='selected'
                onClick={closeMobileMenu}
              >
                <div className='nav-profile'>
                  Perfil
                <img src={`http://localhost:3001/${login.avatar}`} alt='avatar' className='navbar-avatar' />
                </div>
              </NavLink>
            </li>
          }
          {login &&
            <li className='nav-item'>
              <NavLink
                to='/'
                className='nav-links'
                activeClassName='selected'
                onClick={handleLogout}
              >
                <GoogleLogout
                  clientId={'355596453353-8eq0ri18jbug2bvp80jmg4p5jpem1usi.apps.googleusercontent.com'}
                  buttonText="Logout"
                  onLogoutSuccess={handleLogout}
                />
                <FontAwesomeIcon icon={faSignOutAlt} color="#3307ad" size="lg" />
              </NavLink>
            </li>
          }

        </ul>

      </nav>
    </>
  );
}

export default Navbar;
