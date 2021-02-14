import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './User/Login';
import Recovery from './User/Recovery';
import Reset from './User/Reset';
import { Switch, Route } from 'react-router-dom';
import CreateQuestion from './Content/CreateQuestion';
import Profile from './Profiles/Profile';
import Answers from './Content/Answers';
import Question from './Content/Question'
import Questions from './Content/QuestionsPortal';



function App() {
  return (
    <div className="App">
      <Header />
      <h1>Welcome to Howdoi!</h1>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/questions">
          <Questions/>
        </Route>
        <Route path="/answers">
          <Answers/>
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
