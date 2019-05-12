import React from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Error from './components/Error';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/" exact component={Home}/> */}
          <Route path="/Login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/dashboard" component={Dashboard}/>
          {/* <Route path="/error" component={Error}/> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
