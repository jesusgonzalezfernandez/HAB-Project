import React, { useState } from 'react';
import './Dropdown.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogout } from 'react-google-login';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Dropdown() {
    const [click, setClick] = useState(false);
    const login = useSelector(s => s.login)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch({ type: 'logout' })
        return <Redirect to="/" />
    }


    const handleClick = () => setClick(!click);

    return (
        <>
            <ul
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {login &&
                    <li className='nav-item' className='dropdown-link'>
                        <NavLink
                            to={`/users/profile/${login.userID}`}
                            className='nav-links'
                            activeClassName='selected'
                            onClick={() => setClick(false)}
                        >Perfil</NavLink>
                    </li>
                }
                {login &&
                    <li className='nav-item' className='dropdown-link'>
                        <GoogleLogout
                            clientId={'355596453353-8eq0ri18jbug2bvp80jmg4p5jpem1usi.apps.googleusercontent.com'}
                            onLogoutSuccess={handleLogout}
                            icon={false}
                            onClick={() => setClick(false)}
                        ><FontAwesomeIcon icon={faSignOutAlt} color="#3307ad" size="lg" />
                        </GoogleLogout>
                    </li>
                }
            </ul>
        </>
    );
}

export default Dropdown;