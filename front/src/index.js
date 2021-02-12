import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducer from './Store/loginReducer';


// Reducers combinados
const rootReducer = combineReducers({
  login: loginReducer
})

const localStorageMiddleware = store => next => action => {
  let result = next(action)
  localStorage.setItem("session", JSON.stringify(store.getState()))
  return result
}

// Obtener datos guardados en localStorage
const saved = localStorage.getItem("session")

// Si se han obtenido datos de localStorage, se guardan en initialStore
const initialStore = saved ? JSON.parse(saved) : undefined

// Poblar el store
const store = createStore(rootReducer, initialStore, applyMiddleware(localStorageMiddleware))

/*

  El objeto store contiene tantos campos como reducers
  existen en el combinador. Para acceder a los datos
  del login se utilizaría la expresión store.login.data

*/

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
