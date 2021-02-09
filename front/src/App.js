import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact>
            <header className="App-header">
              <h1>Welcome to Howdoi</h1>
            </header>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
