import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Login.css'


function Login() {

  // Inicializar estados y dispatch
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

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

    // Parsear los datos que devuelve la API (token, role, username, userID, avatar)
    const data = await res.json()
    console.log(`La API devuelve: ${JSON.stringify(data)}`);

    // Enviar objeto action al redux, con el type y los datos obtenidos de la API
    dispatch({ type: 'login', data })
  
  }

  // if (login) return <Redirect to="/" />

  if (login) {
    console.log('Logueado con éxito, redirigiendo...')
    console.log(`Username: ${login.username}, Role: ${login.role}, userID: ${login.userID}`);
    return <Redirect to="/" />
  }
  
  
  return (
    <main className = "login main">
    <form className="login form" onSubmit={handleSubmit}>
      <h2>Inicia sesión:</h2>
        <div>
            <input className="login input" placeholder="E-mail ..." value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
            <input className="login input" placeholder="Password ..." type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="submit">Iniciar sesión</button>
        <p>
            <Link to="/recovery">Recordar contraseña</Link>
        </p>
    </form>
    </main>
  );
}

export default Login;
