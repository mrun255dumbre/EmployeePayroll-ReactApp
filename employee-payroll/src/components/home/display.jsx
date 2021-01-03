import React, { useEffect, useState } from 'react';
import './home.scss';
import deleteIcon from "../../assets/icons/delete-black-18dp.svg";
import editIcon from "../../assets/icons/create-black-18dp.svg";
import { withRouter } from "react-router-dom";
import employeeService from '../../services/employee-service';
const Display = (props) => {
    const [employees, setEmployees]= useState([]);
    const  getEmployeeData = () => {
        employeeService.getAllEmployee().then(data => {  
            setEmployees(data.data);
        });
    }
    useEffect(() => {
            getEmployeeData();
    },[])

    const updateEmployee = (id) => {
        props.history.push("/employee/"+id);
    }

    const removeEmployee = (id) => {
        employeeService.deleteEmployee(id).then(() => {
            getEmployeeData();
        });
    }

    return (
        <table className="table-display">
            <tbody>
                <tr key={-1}>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                </tr>
                {
                    employees.length > 0 && employees.map((emp, index) => (
                        <tr key={`${index}`}>
                            <td><img className="profile" src={emp.profileUrl}/></td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.departmentValue}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.startDate}</td>
                            <td>
                                <img onClick={() => updateEmployee(emp.id)}  src={editIcon} />
                                <img onClick={() => removeEmployee(emp.id)} src={deleteIcon} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default withRouter(Display);