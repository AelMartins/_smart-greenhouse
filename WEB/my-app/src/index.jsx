import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import InfoPlanta from './components/InfoPlanta';
import reportWebVitals from './reportWebVitals';
import DataPlant from './components/DataPlant';
import Navbar from './components/Navbar';
import SignIn from './components/SigIn';
import SignUp from './components/SigUp';
import Home from './components/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar/>
    </Router>
    <Home/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
