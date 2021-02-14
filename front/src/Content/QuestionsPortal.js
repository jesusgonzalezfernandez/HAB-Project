import FilterQuestions from "./FilterQuestions";
import LatestQuestions from "./LatestQuestions";
import './QuestionsPortal.css'



// Portal de preguntas
function QuestionsPortal() {

    return (
        
        <div className="questions portal">
            <FilterQuestions />
            <LatestQuestions />
        </div >
    );
}


export default QuestionsPortal;
