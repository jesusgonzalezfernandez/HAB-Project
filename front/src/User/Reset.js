import { useState } from "react";
import { useParams } from "react-router-dom";

function Reset() {
  const { code } = useParams();
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('http://localhost:9999/users/reset-account', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, code }),
      method: 'POST'
    })
    setSent(true)
  }

  if (sent) return (
    <div className="page reset sent">
      Contraseña cambiada con éxito!
    </div>
  )

  return (
    <form className="page reset" onSubmit={handleSubmit}>
      Selecciona una nueva contraseña:
      <div>
        <input placeholder="Password ..." type="password" required
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button>Cambiar contraseña</button>
    </form>
  );
}

export default Reset;
