import { HashLink as Link } from 'react-router-hash-link';
import expert from '../imagenes/expert.png';
import code from '../imagenes/manos-coding.png';
import developer from '../imagenes/desarrollador.png';
import howdoi from '../imagenes/expert-student.png';
import './Home.css'
import LatestQuestions from '../Content/LatestQuestions';
import { useState } from "react";
import useFetch from "../useFetch";
import { ReviewsSection } from './reviewSection';
import { SectionTitle } from './sectionTitle';


function Home() {

    // Estado que define el resultado del filtrado
    const [filterData, setFilterData] = useState([]);

    // Estado que define el tipo de display (últimas o filtradas)
    const [filterMode, setFilterMode] = useState(false);
  
    // Paginación
    const [pagination, setPagination] = useState(5);
  
    // Página actual
    const [page, setPage] = useState(1);
  
    // Valor de páginas máximo (definido por los componentes LatestQuestions y FilteredQuestions)
    const [max, setMax] = useState(1);
  
    // Estado que define el filtro del título en el cliente
    const [titleFilter, setTitleFilter] = useState();
  
    // Estado que define el filtro del contenido en el cliente
    const [bodyFilter, setBodyFilter] = useState();
  
    // Estdo que define el filtro de fecha
    const [timeFilter, setTimeFilter] = useState();

      // Estado que define el tipo de ordenación
  const [sortBy, setSortBy] = useState("");
  
  // Obtener listado de preguntas
  let data = useFetch("http://localhost:3001/questions") || [];
  
  return (
    <div className="home">
      <header>
        <div className='home-header-titulo'>
          <h1>Aprende programación con los mejores expertos.</h1>
          <p>La mayor comunidad de programación de habla hispana enfocada en los principales lenguajes de programación. Contacta con expertos del sector, con años de experiencia y un amplio bagaje profesional en el ámbito de las TIC.</p>
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
            <p>Te asignaremos un experto en el sector que podrá resolver tus dudas y ayudarte a avanzar en tu carrera profesional en el mundo de la programación. Por la gloria de mi madre te va a hasé pupitaa ese pedazo cerito.</p>
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
      <ReviewsSection />
      <div className='last-cuestions-home'>
        <SectionTitle>Últimas preguntas</SectionTitle>
        <div className='home-questions'>
        <LatestQuestions
            setMax={(value) => setMax(value)}
            pagination={pagination}
            page={page}
            titleFilter={titleFilter}
            bodyFilter={bodyFilter}
            timeFilter={timeFilter}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
