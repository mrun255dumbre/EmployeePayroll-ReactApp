import './App.css';
import React from 'react';
import PayrollForm from './components/payroll-form/payroll-form';
import { 
    BrowserRouter as Router,
    Switch,
    Route, Redirect
  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <PayrollForm/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
