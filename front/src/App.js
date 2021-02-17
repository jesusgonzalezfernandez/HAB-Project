import './App.css';
import Header from './Header';
import Home from './Home/Home';
import Login from './User/Login';
import Recovery from './User/Recovery';
import Reset from './User/Reset';
import { Switch, Route } from 'react-router-dom';
import CreateQuestion from './Content/CreateQuestion';
import Profile from './Profiles/Profile';
import Question from './Content/Question'
import Questions from './Content/QuestionsPortal';
import Loading from './Home/Loading';



function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Loading />
          <Home />
        </Route>
        <Route path="/questions">
          <Questions/>
        </Route>
        <Route path="/question/:questionID">
          <Question/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/recovery" exact>
          <Recovery />
        </Route>
        <Route path="/recovery/:code" exact>
          <Reset />
        </Route>
        <Route path="/create-question" exact>
          <CreateQuestion />
        </Route>
        <Route path="/users/profile/:userID" exact>
          <Profile />
        </Route>
      </Switch>
    </div >
  );
}


export default App;
