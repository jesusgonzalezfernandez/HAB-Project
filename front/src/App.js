import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './User/Login';
import FilterQuestions from './Content/FilterQuestions';
import Recovery from './User/Recovery';
import Reset from './User/Reset';
import { Switch, Route } from 'react-router-dom';
import CreateQuestion from './Content/CreateQuestion';
import GetUserProfileData from './Profiles/GetUserProfileData';



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
          <FilterQuestions/>
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
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div >
  );
}

export default App;
