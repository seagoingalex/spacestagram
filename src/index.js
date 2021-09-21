import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';


//Import the Router property from react-router-dom
// Remember to run npm install react-router-dom first!
import {BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  // Maybe let's look into what StrictMode
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
