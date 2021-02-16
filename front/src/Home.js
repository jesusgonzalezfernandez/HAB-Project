import './Home.css'
import { HashLink as Link } from 'react-router-hash-link';
import expert from './imagenes/expert.png';
import code from './imagenes/manos-coding.png';
import developer from './imagenes/desarrollador.png';
import howdoi from './imagenes/expert-student.png';

function Home() {
  return (
    <div className="home">
      <header>
        <div className='home-header-titulo'>
          <h1>Lorem fistrum nostrud dolore no puedor exercitation.</h1>
          <p>A wan te voy a borrar el cerito a wan está la cosa muy malar ullamco caballo blanco caballo negroorl reprehenderit te va a hasé pupitaa. Dolor ut hasta luego Lucas ese que llega.</p>
          <Link to="/#steps">Conocer más</Link>
          <Link to="/#registro">Registrarse</Link>
        </div>
        <div className='home-header-imagen'>
          <img src={howdoi} alt="experto" />
        </div>

      </header>
      <div id="steps">
        <article>
          <img src={code} alt="experto" />
          <h2>Haz tu pregunta</h2>
          <p>Por la gloria de mi madre te va a hasé pupitaa ese pedazo de ese que llega diodenoo pupita dolore amatomaa te va a hasé pupitaa incididunt te voy a borrar el cerito.</p>
        </article>
        <article>
          <img src={expert} alt="experto" />
          <h2>Espera la respuesta de un experto</h2>
          <p>Sit amet está la cosa muy malar no puedor quis reprehenderit ese pedazo de exercitation elit condemor commodo consectetur.</p>
        </article>
        <article>
          <img src={developer} alt="experto" />
          <h2>se un hacker pro</h2>
          <p>Sit amet está la cosa muy malar no puedor quis reprehenderit ese pedazo de exercitation elit condemor commodo consectetur.</p>
        </article>
      </div>
      <div id='registro'>
        <h1>Próximamente ...</h1>
      </div>

    </div>
  );
}

export default Home;
