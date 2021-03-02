import { useState } from "react";
import './Contact.css'

function Contact() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:3001/contact/', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, phone, message }),
            method: 'POST'
        })
        setSent(true)
    }

    return (
        <main className="contact main">
            <div>
                <form className="contact form" onSubmit={handleSubmit}>
                    <h2>¡Contacta con Howdoi!</h2>
                    <div>
                        <input className="contact input" placeholder="Nombre" required
                            value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <input className="contact input" placeholder="Email" type="email" required
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input className="contact input" placeholder="Teléfono" type="phone" required
                            value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <input className="contact input" placeholder="Mensaje" type="text-area" required
                            value={message} onChange={e => setMessage(e.target.value)} />
                    </div>
                    <button className="submit">Enviar</button>
                </form>
            </div>
            <div className="contact text">
            <h3>¿Quieres conocer más sobre Howdoi?</h3>
            <p>La mayor comunidad de expertos.
            Consúltanos tus dudas o contáctanos para conocer cómo puedes ayudar a nuestra comunidad de aprendizaje.</p>
            </div>
        </main>
    );
}

export default Contact;