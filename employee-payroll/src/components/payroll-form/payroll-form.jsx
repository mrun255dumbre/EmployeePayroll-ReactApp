import React, { useState, useEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse-3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import logo from "../../assets/images/logo.png";
import { useParams, Link, withRouter } from 'react-router-dom';
import App from '../../App';
import employeeService from '../../services/employee-service';

const PayrollForm = (props) => {
    const { empId = 0 } = useParams()
    let allDepartment= [
        'HR', 'Sales', 'Finance', 'Engineer', 'Others'
    ];
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse-3.png' },
            { url: '../../assets/profile-images/Ellipse 1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' }
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
    }

    const [formValue, setForm] = useState(initialValue);

    useEffect(() => {
        if (empId !== 0) {
            employeeService.getEmployee(empId).then(response => {
                setForm({ ...response.data, isUpdate: true, error:{} });
            });
        }
    }, [])

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1);
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
    }

    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            notes: '',
            startDate: ''
        }
        if (formValue.name.length < 1) {
            error.name = 'Name is required field';
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'Gender is required field';
            isError = true;
        }
        if (formValue.salary.length < 1) {
            error.salary = 'Salary is required field';
            isError = true;
        }
        if (formValue.profileUrl.length < 1) {
            error.profileUrl = 'Profile is required field';
            isError = true;
        }
        if (formValue.departmentValue.length < 1) {
            error.department = 'Department is required field';
            isError = true;
        }
        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        console.log("save");

        if (await validData()) {
            console.log('error', formValue);
            return;
        }
        let object = {
            name: formValue.name,
            departmentValue: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            day: formValue.day,
            month: formValue.month,
            year: formValue.year,
            notes: formValue.notes,
            profileUrl: formValue.profileUrl
        }
        if (empId === 0){
            employeeService.addEmployee(object).then(data => {
                console.log("data added");
                props.history.push('')
            }).catch(err => {
                console.log("error while Add");
            })
        } else {
            employeeService.updateEmployee(empId, object).then(data => {
                console.log("data updated");
                props.history.push('')
            }).catch(err => {
                console.log("error while Add");
            })
        }    
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
        console.log(formValue);
    }
    return (
        <>
            {formValue && (
                <div className="payroll-main">
                    <header className="header header-content row">
                        <div className="logo-content"><img src={logo} alt="logo" />
                            <div>
                                <span className="emp-text">EMPLOYEE</span><br />
                                <span className="emp-text emp-payroll">PAYROLL</span>
                            </div></div>
                    </header>
                    <div className="form-content content">
                        <form className="form" action="#" onSubmit={save}>
                            <div className="form-head">Employee Payroll Form</div>
                            <div className="row-content row">
                                <label className="label text" htmlFor="name">Name</label>
                                <div className="input-error">
                                    <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name..." />
                                    <div className="error">{formValue.error.name}</div>
                                </div>
                            </div>
                            <div className="row-content">
                                <label className="label text" htmlFor="profile">Profile Image</label>
                                <div className="input-error">
                                    <div className="profile-radio-content">
                                        <label>
                                            <input type="radio" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse-3.png'} name="profileUrl"
                                                value="../../assets/profile-images/Ellipse-3.png" onChange={changeValue} id="profile1" />
                                            <img className="profile" src={profile1} alt="" />
                                        </label>
                                        <label>
                                            <input type="radio" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse 1.png'} name="profileUrl" value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} id="profile2" />
                                            <img className="profile" src={profile2} alt="" />
                                        </label>
                                        <label>
                                            <input type="radio" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse -8.png'} name="profileUrl" value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} id="profile3" />
                                            <img className="profile" src={profile3} alt="" />
                                        </label>
                                        <label>
                                            <input type="radio" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse -7.png'} name="profileUrl" value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} id="profile4" />
                                            <img className="profile" src={profile4} alt="" />
                                        </label>
                                    </div>
                                    <div className="error">{formValue.error.profileUrl}</div>
                                </div>
                            </div>
                            <div className="row-content">
                                <label className="label text" htmlFor="gender">Gender</label>
                                <div className="input-error">
                                    <div>
                                        <input type="radio" checked={formValue.gender === 'male'} id="male" name="gender" onChange={changeValue} value="male" />
                                        <label className="text" htmlFor="male">Male</label>
                                        <input type="radio" checked={formValue.gender === 'female'} id="female" name="gender" onChange={changeValue} value="female" />
                                        <label className="text" htmlFor="female">Female</label>
                                    </div>
                                    <div className="error">{formValue.error.gender}</div>
                                </div>
                            </div>

                            <div className="row-content">
                                <label className="label text" htmlFor="department">Department</label>
                                <div className="input-error">
                                    <div>
                                        {allDepartment.map((item, i) => (
                                            <span key={item}>
                                                <input className="checkBox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                                    checked={getChecked(item)} value={item} />
                                                <label className="text" htmlFor={item}>{item}</label>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="error">{formValue.error.department}</div>
                                </div>
                            </div>
                            <div className="row-content">
                                <label className="label text" htmlFor="salary" style={{ paddingTop: '0px' }}>Choose your salary:</label>
                                <div className="input-error">
                                    <input className="input" type="number" name="salary" onChange={changeValue} placeholder="Salary" value={formValue.salary} />
                                    <div className="error" style={{ height: '20px' }}>{formValue.error.salary}</div>
                                </div>
                            </div>
                            <div className="row-content">
                                <label className="label text" htmlFor="startDate">Start Date</label>
                                <select value={formValue.day} className="mr-5" onChange={changeValue} id="day" name="day">
                                    <option value="">Day</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select value={formValue.month} className="mr-5" onChange={changeValue} id="month" name="month">
                                    <option value ="">Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select value={formValue.year} onChange={changeValue} id="year" name="year">
                                    <option value="">Year</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                </select>
                            </div>
                            <div className="error">{formValue.error.startDate}</div>
                            <div className="row-content">
                                <label className="label text" htmlFor="notes">Notes</label>
                                <textarea onChange={changeValue} id="notes" className="input" value={formValue.notes} name="notes" style={{ height: '100px' }}></textarea>
                            </div>
                            <div className="buttonParent">
                                <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                                <div className="submit-reset">
                                    <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                                    <button type="reset" className="resetButton button" onClick={reset}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default withRouter(PayrollForm);