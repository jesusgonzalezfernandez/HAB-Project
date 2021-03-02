import './App.css';
import Home from './Home/Home';
import Login from './User/Login';
import Recovery from './User/Recovery';
import Reset from './User/Reset';
import { Switch, Route, useLocation } from 'react-router-dom';
import CreateQuestion from './Content/CreateQuestion';
import Profile from './Profiles/Profile';
import Question from './Content/Question'
import QuestionsPortal from './Content/QuestionsPortal';
import Contact from './Content/Contact';
import Register from './User/Register'
import Navbar from './NavBar/Navbar';
import Footer from './Home/Footer';
import ValidateUser from './User/ValidateUser';
import NotFound from './assets/components/NotFound';

// Obtener query de la URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {

  let query = useQuery();

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/questions">
          <QuestionsPortal query={query.get('tags')} />
        </Route>
        <Route path="/question/:questionID">
          <Question />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/recovery" exact>
          <Recovery />
        </Route>
        <Route path="/recovery/:code" exact>
          <Reset />
        </Route>
        <Route path="/users/validate/:code">
          <ValidateUser />
        </Route>
        <Route path="/create/question" exact>
          <CreateQuestion />
        </Route>
        <Route path="/users/profile/:userID" exact>
          <Profile />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div >
  );

}


export default App;
