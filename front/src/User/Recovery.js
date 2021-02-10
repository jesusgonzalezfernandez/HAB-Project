import { useState } from "react";

function Recovery() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('http://localhost:9999/users/recover-account', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      method: 'POST'
    })
    setSent(true)
  }

  if (sent) return (
    <div className="page recovery sent">
      Te hemos enviado un correo. Revisa tu bandeja de entrada...
    </div>
  )

  return (
    <form className="page recovery" onSubmit={handleSubmit}>
      Introduce tu email para enviarte instrucciones...
      <div>
        <input placeholder="Email ..." type="email" required
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <button>Iniciar sesión</button>
    </form>
  );
}

export default Recovery;
