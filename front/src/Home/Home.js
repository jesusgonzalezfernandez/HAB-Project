import { HashLink as Link } from 'react-router-hash-link';
import expert from '../imagenes/expert.png';
import code from '../imagenes/manos-coding.png';
import developer from '../imagenes/desarrollador.png';
import howdoi from '../imagenes/expert-student.png';
import './Home.css'

function Home() {
  return (
    <div className="home">
      <header>
        <div className='home-header-titulo'>
          <h1>Lorem fistrum nostrud dolore no puedor exercitation.</h1>
          <p>A wan te voy a borrar el cerito a wan está la cosa muy malar ullamco caballo blanco caballo negroorl reprehenderit te va a hasé pupitaa. Dolor ut hasta luego Lucas ese que llega.</p>
          <div className='home-enlaces'>
            <Link to="/#steps"><div className='home-conocer'>Conocer más</div></Link>
            <Link to="/register"><div className='home-registro'>Registrarse</div></Link>
          </div>
        </div>
        <div className='home-header-imagen'>
          <img src={howdoi} alt="experto" />
        </div>

      </header>
      <div id="steps">
        <article className='home-articles'>
        <img src={code} alt="experto" />
          <div className='home-section-titles-description'>
            <h2>Haz tu pregunta</h2>
            <p>Por la gloria de mi madre te va a hasé pupitaa ese pedazo de ese que llega diodenoo pupita dolore amatomaa te va a hasé pupitaa incididunt te voy a borrar el cerito.</p>
          </div>
        </article>
        <article className='home-articles'>
          <div className='home-section-titles-description'>
            <h2>Espera la respuesta de un experto</h2>
            <p>Sit amet está la cosa muy malar no puedor quis reprehenderit ese pedazo de exercitation elit condemor commodo consectetur.</p>
          </div>
          <img src={expert} alt="experto" />
        </article>
        <article className='home-articles'>
        <img src={developer} alt="experto" className='experto-imagen-perfil'/>
          <div className='home-section-titles-description'>
            <h2>Se un hacker pro</h2>
            <p>Sit amet está la cosa muy malar no puedor quis reprehenderit ese pedazo de exercitation elit condemor commodo consectetur.</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Home;
