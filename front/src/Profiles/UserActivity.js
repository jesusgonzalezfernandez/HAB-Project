// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import QuestionPreview from '../Content/QuestionPreview';
import Loading from '../Home/Loading';


function UserActivity() {
  const [dataUser, setDataUser] = useState()
  const [dataQuestions, setDataQuestions] = useState()
  const [dataAnswers, setDataAnswers] = useState()

  const login = useSelector(state => state.login)

  // Obtener id del usuario buscado
  const { userID } = useParams()

  // Ejecutar fetch al cargar la página
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(

        `http://localhost:3001/users/profile/${userID}`,
        {
          headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
          method: 'GET'
        })

      const data = await res.json();
      setDataUser(data.user)
      setDataQuestions(data.questions)
      setDataAnswers(data.answers)
    }
    fetchData()
  }, [])

  if (!login) return <Redirect to='/' />

  if (!dataUser) return <Loading />

  if (!dataAnswers) return <Loading />

  if (!dataQuestions) return <Loading />

  return (
    <div className='profile-data'>
      <div className='panel-respuestas'>
        <h3>Tus últimas respuestas</h3>
        <ul>
          {dataAnswers.length >= 1 && dataAnswers.map((answer, i) =>
            <li className='profile-lista-respuestas' key={i}>
              <Link to={`/question/${answer.questionID}`}> {answer.body} </Link>
            </li>
          )}
          {dataAnswers.length < 1 &&
            <div><i>Todavía no tienes respuestas</i></div>
          }
        </ul>
      </div>

      <div className='panel-preguntas'>
        <h3>Tus últimas preguntas</h3>
        <ul>
          {dataQuestions.length >= 1 && dataQuestions.map((question, i) =>
            <li className='profile-lista-preguntas' key={i}>
              <QuestionPreview question={question} />
            </li>
          )}
          {dataAnswers.length < 1 &&
            <div><i>Todavía no tienes preguntas</i></div>
          }
        </ul>
      </div>
    </div>
  )
}

export default UserActivity;

