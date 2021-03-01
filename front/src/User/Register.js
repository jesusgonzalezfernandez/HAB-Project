import { useState } from "react";
import './Register.css'
import logo from '../logo.png'
import { Link, Redirect } from "react-router-dom";


function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    // const [sent, setSent] = useState('')
    const [error, setError] = useState()

    // if (password !== repeatPassword) return (
    //     'Las contraseñas no coinciden'
    // )
    // setSent(true)

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:3001/users/', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password, name, surname, birthDate }),
            method: 'POST'
        })
        console.log(res)

        // if (res.ok) {
        //     return <Redirect to="/" />
        // }
        // else {
        //     console.log('Se ha producido un error');
        //     res.text().then(e => setError(e))
        // }
        if (!res.ok) {
            res.text().then(e => setError(e))
        } else {
            const data = await res.json()
            return <Redirect to="/" />
        }
    }

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
                {error &&
                    <div className="login error">
                        {error}
                    </div>}
                <button className="submit">Enviar</button>
            </form>
        </main>
    );
}

export default Register;