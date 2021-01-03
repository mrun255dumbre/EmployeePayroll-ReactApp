import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import logo from "../../assets/images/logo.png";
import addIcon from "../../assets/icons/add-24px.svg";
import Display from "./display";
class Home extends React.Component {
  render() {
    return (
        <div>
          <header className="header-content header">
            <div className="logo-content">
                <img src={logo} alt="Employee Payroll"/>
                <div>
                    <span className="emp-text">EMPLOYEE</span><br/>
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>
            </div>
          </header>
          <div className="main-content">
              <div className="header-content">
                  <div className="emp-detail-text">
                      Employee Details
                  </div>
                  <Link to="/employee/0" className="add-button">
                      <img src={addIcon} alt="Add Button"/><div>Add User</div>
                  </Link>
              </div>
              <div className="table-main">
                  <Display/>
              </div>
          </div>
        </div>
    );
  }
}

export default Home;
