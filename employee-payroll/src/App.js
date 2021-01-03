import './App.css';
import React from 'react';
import Home from "./components/home/home";
import { 
    BrowserRouter as Router,
    Switch,
    Route, Redirect
  } from "react-router-dom";
import payrollForm from './components/payroll-form/payroll-form';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/employee/:empId?" component={payrollForm}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
