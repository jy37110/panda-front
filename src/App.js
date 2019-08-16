import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './component/NavBar';
import Home from './page/Home';
import Login from './page/Login';

function App() {
  return (
    <Router>
        <NavBar/>
        <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route path = '/login' component = {Login}/>
        </Switch>
    </Router>
  );
}

export default App;
