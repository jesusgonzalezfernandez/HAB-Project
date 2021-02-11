import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';



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
    const res = await fetch('http://localhost:9999/users/login', {
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
    console.log(`Logueado con los datos: ${JSON.stringify(login)}`)
    return <Redirect to="/" />
  }
  
  
  return (
    <form className="page login" onSubmit={handleSubmit}>
        <div>
            <input placeholder="E-mail ..." value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
            <input placeholder="Password ..." type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button>Iniciar sesión</button>
        <p>
            <Link to="/recovery">No recuerdas tu contraseña?</Link>
        </p>
    </form>
  );
}

export default Login;
