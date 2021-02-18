import { useState } from "react";

function Recovery() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('http://localhost:3001/users/recover-account', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      method: 'POST'
    })
    setSent(true)
  }

  if (sent) return (
    <div className="register sent">
      <p>Te hemos enviado un correo para restablecer tu contraseña.<br/> 
      Por favor, revisa tu bandeja de entrada.</p>
    </div>
  )

  return (
    <form className="register form" onSubmit={handleSubmit}>
      <h1>Recuperar contraseña</h1>
      Introduce tu email:
      <div>
        <input className="register input" placeholder="Email ..." type="email" required
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <button className="submit">Iniciar sesión</button>
    </form>
  );
}

export default Recovery;
