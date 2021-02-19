import QuestionsFilter from "./QuestionsFilter";
import LatestQuestions from "./LatestQuestions";
import './QuestionsPortal.css'
import useFetch from "../useFetch";
import getTagCount from "../Functions/getTagCount";



// Portal de preguntas
function QuestionsPortal() {

    // Obtener listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []
    
    let tagCounter = []

    if (data.length >= 1) tagCounter = getTagCount(data)

    return (

        <div className="questions-portal">
            <aside className='left-aside'>
                <div className='links'>
                    <a href="">Tags</a>
                    <a href="">Users</a>
                    <a href="">Jobs</a>
                    <a href="">Courses</a>
                    <a href="">Software</a>
                </div>
                <QuestionsFilter />
            </aside>
            <main>
                <header>
                    <h1 className=''>Últimas Preguntas</h1>
                    <div className=''>
                        <a className='create-question-button' href='http://localhost:3000/create/question'>Haz Tu Consulta</a>
                    </div>
                </header>
                <LatestQuestions />

            </main>
            <aside className='right-aside'>
                <section className='blog'>
                    <h6>Latest Blog Posts:</h6>
                    <ul className='post-list'>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur.</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, earum!</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt optio odio minus?</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                    </ul>
                </section>
                <section className="tags">
                    {tagCounter && tagCounter.map( (count, i) =>             
                        <div key={i} className='tag-counter'>
                            <a 
                                // El tag toma diferentes tamaños según el orden en el array
                                className={i < tagCounter.length / 2 ? ( i < tagCounter.length / 6 ? 'big' : '' ) : 'small'} 
                                href={'http://localhost:3001/questions?tags=' + count.tag}>
                                    {count.tag} 
                            </a>
                            <span>x {count.count}</span>
                        </div>
                    )}
                </section>
            </aside>
        </div >
    );
}

export default QuestionsPortal;