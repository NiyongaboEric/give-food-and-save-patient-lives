import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Login></Login> */}
        <Register></Register>
        {/* <Dashboard></Dashboard> */}
      </header>
    </div>
  );
}

export default App;
