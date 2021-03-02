import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import './Navbar.css';
import logo from '../logo.png';
import Dropdown from './Dropdown';


function Navbar() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

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

  let imagen = undefined
  if (login) {
    imagen = login.email.includes('gmail') ? login.avatar : `http://localhost:3001/${login.avatar}`
  }

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
            className='nav-item'>
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
            <li className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            >
              <NavLink
                to={`/users/profile/${login.userID}`}
                className='nav-links'
                activeClassName='selected'
                onClick={closeMobileMenu}
              >
                <div className='nav-profile'>
                <img src={imagen} alt='avatar' className='navbar-avatar' />
                {login.name}
                </div>
              </NavLink>
              {dropdown && <Dropdown />}
            </li>
          }

        </ul>

      </nav>
    </>
  );
}

export default Navbar;
