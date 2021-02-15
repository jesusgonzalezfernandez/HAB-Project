import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './User/Login';
import FilterQuestions from './Content/FilterQuestions';
import Recovery from './User/Recovery';
import Reset from './User/Reset';
import { Switch, Route } from 'react-router-dom';
import CreateQuestion from './Content/CreateQuestion';
import Profile from './Profiles/Profile';
import LatestQuestions from './Content/LatestQuestions';



function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/questions">
          <FilterQuestions/>
        </Route>
        <Route path="/search">
          <LatestQuestions/>
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
