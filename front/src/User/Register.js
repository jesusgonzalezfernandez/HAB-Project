import { useState } from "react";
import { Redirect } from "react-router-dom";
import './Register.css'
import logo from '../logo.png'

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [country, setCountry] = useState('')
    const [sent, setSent] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://localhost:3001/users/', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, birthDate, name, surname }),
            method: 'POST'
        })
        setSent(true)
    }

    if (sent) return (
        <div className="register sent">
            <p>Gracias por registrarte en Howdoi.<br/>
            Por favor, revisa tu bandeja de entrada para validar el registro.</p>
        </div>
    )


    return (
        <main className="register main">
            <form className="register form" onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <img src={logo} className={'logo'} alt={'logo'} />
                <h2>¡Bienvenido a Howdoi!</h2>
                <div>
                    <input className="register input" placeholder="Email ..." type="email" required
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <input className="register input" placeholder="Nombre de usuario ..." required
                        value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <input className="register input" placeholder="Contraseña ..." type="password" required
                        value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <input className="register input" placeholder="Repite tu contraseña ..." type="password" required
                        value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                </div>
                <div>
                    <input className="register input" placeholder="Nombre ..." required
                        value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <input className="register input" placeholder="Apellidos ..." required
                        value={surname} onChange={e => setSurname(e.target.value)} />
                </div>
                <div>
                    <input className="register input" placeholder="Fecha de nacimiento ..." type="date" required
                        value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                </div>
                <button className="submit">Enviar</button>
            </form>
        </main>
    );
}

export default Register;