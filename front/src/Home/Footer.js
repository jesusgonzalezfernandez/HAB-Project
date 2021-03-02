import { NavLink } from 'react-router-dom';
import logo from '../logo.png';
import './Footer.css'

function Footer() {
    return (
        <div className='footer main'>
            <div className='footer-logo'>
                <img src={logo} alt='logo' className='footer-logo-img' />
            </div>
            <div className='menu'>
                <p className='footer-title'>Menú</p>
                <NavLink to='/about'
                    className='nav-links-footer'
                    activeClassName='selected'>Qué es Howdoi</NavLink>
                <NavLink to='/questions'
                    className='nav-links-footer'
                    activeClassName='selected'>Preguntas</NavLink>
                <NavLink to='/contact'
                    className='nav-links-footer'
                    activeClassName='selected'>Contacto</NavLink>
            </div>
            <div className='authors'>
                <ul>
                <p className='footer-title'>Autores</p>
                    <li>
                        <a href='https://www.linkedin.com/in/jesusgonzalezfernandez/' className='author-link'>Jesús González</a>
                    </li>
                    <li>
                        <a href='https://www.linkedin.com/in/monkeyscymbal/' className='author-link'>Pablo Martín</a>
                    </li>
                    <li>
                        <a href='https://www.linkedin.com/in/lorenabao/' className='author-link'>Lorena Bao</a>
                    </li>
                </ul>
            </div>
            <div className='acceso'>
                <p className='footer-title-1'>Accede</p>
                <p className='footer-subtitle'>
                    <NavLink to='/login'>Inicia sesión</NavLink> o <NavLink to='/register'>hazte usuario</NavLink>
                </p>
            </div>
        </div>
    )
}

export default Footer
