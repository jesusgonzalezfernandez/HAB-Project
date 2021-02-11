import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('http://localhost:9999/users/login', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      method: 'POST'
    })
    const data = await res.json()
    dispatch({ type: 'login', data })
  }
  if (login) return <Redirect to="/" />

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
