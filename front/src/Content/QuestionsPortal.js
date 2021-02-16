import QuestionsFilter from "./QuestionsFilter";
import LatestQuestions from "./LatestQuestions";
import './QuestionsPortal.css'



// Portal de preguntas
function QuestionsPortal() {

    const tags = ['tag', 'tag', 'tag', 'tag', 'tag', 'tag', 'tag']

    return (
        
        // Falta enviar una función a filterquestions 
        // para que al lanzar una búsqueda desaparezca
        // el listado de ultimas preguntas

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
            <LatestQuestions />
            <aside className='right-aside'>
                <section className="blog">
                    <h6>Latest Blog Posts:</h6>
                    <ul>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur.</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat.</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur.</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat.</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur.</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat.</p>
                       </li>
                    </ul>
                </section>
                <section className="tags">
                    <h6>Common Tags:</h6>
                    <ul>
                        {tags && tags.map(tag => 
                            <li>{tag}</li>
                        )}
                    </ul>
                </section>
            </aside>
        </div >
    );
}


export default QuestionsPortal;
