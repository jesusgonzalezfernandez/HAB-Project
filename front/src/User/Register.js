import { useState } from "react";

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [country, setCountry] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://localhost:3001/users/', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, repeatPassword, birthDate, name, surname, country }),
            method: 'POST'
        })
    }

return (
    <form className="register form" onSubmit={handleSubmit}>
        <h2>Bienvenido a Howdoi</h2>
        <div>
            <input placeholder="Email ..." type="email" required
                value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
            <input placeholder="Nombre de usuario ..." required
                value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
            <input placeholder="Password ..." type="password" required
                value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
            <input placeholder="Repeat Password ..." type="password" required
                value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
        </div>
        <div>
            <input placeholder="Nombre ..." required
                value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
            <input placeholder="Apellidos ..." required
                value={surname} onChange={e => setSurname(e.target.value)} />
        </div>
        <div>
            <input placeholder="País ..." required
                value={country} onChange={e => setCountry(e.target.value)} />
        </div>
        <div>
            <input placeholder="Fecha de nacimiento ..." type="date" required
                value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        </div>
        <button>Enviar</button>
    </form>
);
}

export default Register;