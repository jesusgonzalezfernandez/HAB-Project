import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Login.css'
import logo from '../logo.png';
import { GoogleLogin } from 'react-google-login';


function Login() {

  // Inicializar estados y dispatch
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [error, setError] = useState()

  // Obtener datos del store
  const login = useSelector(s => s.login)
  console.log(`Objeto login del store: ${JSON.stringify(login)}`);


  const handleSubmit = async e => {
    e.preventDefault()

    // Enviar una consulta a la API con el email y la password
    const res = await fetch(
      // Dirección:
      `http://localhost:3001/users/login`,
      // Contenido:
      {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        method: 'POST'
      })

    if (!res.ok) {

      console.log('Se ha producido un error');
      res.text().then(e => setError(e))

    } else {

      console.log('El fetch se ha realizado correctamente');
      const data = await res.json()
      // Enviar objeto action al redux, con el type y los datos obtenidos de la API
      dispatch({ type: 'login', data })

    }

  }

  if (login) {
    console.log('Logueado con éxito, redirigiendo...')
    console.log(`Username: ${login.username}, Role: ${login.role}, userID: ${login.userID}`);
    return <Redirect to="/" />
  }

  const handleLogin = async googleData => {
    const res = await fetch("http://localhost:3001/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
    console.log(googleData)
  }

  return (
    <main className="login main">

      {error &&
        <div>
          {error}
        </div>}

      <form className="login form" onSubmit={handleSubmit}>
        <img src={logo} className={'logo'} alt={'logo'} />
        <div>
          <input className="login input" placeholder="E-mail ..." value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <input className="login input" placeholder="Password ..." type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="submit">Iniciar sesión</button>
        <p>
          <Link to="/recovery">Recordar contraseña</Link>
        </p>
        <GoogleLogin
          clientId={'355596453353-8eq0ri18jbug2bvp80jmg4p5jpem1usi.apps.googleusercontent.com'}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
        />
        <p>
          ¿Todavía no tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
