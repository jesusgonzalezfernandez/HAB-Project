import FilterQuestions from "./FilterQuestions";
import LatestQuestions from "./LatestQuestions";
import './QuestionsPortal.css'



// Portal de preguntas
function QuestionsPortal() {

    return (
        
        // Falta enviar una función a filterquestions 
        // para que al lanzar una búsqueda desaparezca
        // el listado de ultimas preguntas

        <div className="questions-portal">
            <FilterQuestions />
            <LatestQuestions />
        </div >
    );
}


export default QuestionsPortal;
