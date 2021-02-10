import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './User/Login';
import Questions from './Content/Questions';
import Recovery from './User/Recovery';
import Reset from './User/Reset';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/questions">
          <Questions />
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
      </Switch>
    </div >
  );
}

export default App;
