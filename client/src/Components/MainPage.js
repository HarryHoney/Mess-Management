import '../style/mainPage.css';
import React from 'react';
import Records from './Records';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setStudentDetails } from '../actions/userDetails';
import { store } from '../store/configureStore';

import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import database from '../firebase/firebase';
var request = require('request');


const apiUrl = "http://localhost:3000";
    

class MainPage extends React.Component {
 state = {
     startDate : moment().add(1, 'day'),
     endDate : moment().add(1, 'week'),
     focusedInput : null,
     userName : "Ashutosh",
     rollNo : 17103017,
     hNo : 4,
     balance : 5010,
     messOffB : "BreakFast",
     messOffE : "BreakFast",
     compTitle : "Food",
     complaint : "",
     jwt : localStorage.getItem('studentToken') || null
 }
 
 records = [
     {   key: 1,
         description: 'regular meal',
         amount: 40,
         date: '12/9/19',
         time: '12:45'
     },
     {
        key: 2,
        description: 'regular meal',
        amount: 40,
        date: '12/9/19',
        time: '20:45'
    },
    {
        key: 3,
        description: 'regular meal',
        amount: 30,
        date: '13/9/19',
        time: '8:15'
    }
 ]
    

    handleDateChange = ({ startDate, endDate }) =>
        this.setState({ startDate, endDate });

    handleFocusChange = focusedInput => this.setState({ focusedInput });

    handleSubmit = (e) => {
        e.preventDefault();
        const x = {
            rollNo : this.state.rollNo,
            startDate : this.state.startDate.format('YYYY-MM-D h:mm:ss'),
            endDate : this.state.endDate.format('YYYY-MM-D h:mm:ss')
        }
        database.ref('messOffList').push(x);
        request.post({
            headers : {'content-type' : 'application/json'},
            url: 'https://us-central1-hactathon2019.cloudfunctions.net/nitjalandhar/mess_off',
            body: {
                "roll" : x.rollNo,
                "start" : x.startDate,
                "end" : x.endDate
            } ,
            json: true
        }, function(error, response, body){
            if(error)
                console.log("Error. "+error);
            console.log(body);
        });
        alert('Mess Off done from ' + this.state.startDate.toString() + " to " + this.state.endDate.toString() );
    }

    handleChangeB = (e) => {
        e.preventDefault();
        const val = e.target.value;
        this.setState(()=>{
            return{
                ...this.state,
                messOffB: val
            }
        });
    }

    handleChangeE = (e) => {
        e.preventDefault();
        const val = e.target.value;
        this.setState(()=>{
            return{
                ...this.state,
                messOffE: val
            }
        });
    }

    changeCompTitle = (e) => {
        const val = e.target.value;
        this.setState(() => {
            return{
                ...this.state,
                compTitle: val
            }
        });
    }

    changeComplaint = (e) => {
        const val = e.target.value;
        this.setState(() => {
            return{
                ...this.state,
                complaint: val
            }
        })
    }

    addComplaint = (e) => {
        e.preventDefault();
        alert(`Adding Complaint : ${this.state.compTitle} -> ${this.state.complaint} ` )

        this.setState(() => {
            return{
                ...this.state,
                compTitle: "Food",
                complaint: ""
            }
        })
    }

    handleLogOut = () => {
        localStorage.removeItem('studentToken');
        this.props.history.push('/');
    }

    async componentDidMount(){
        if(!this.props.userDetails.token){
            axios.get(`${apiUrl}/student/me`,{
                headers : {
                    'Authorization' : this.state.jwt
                }
            }).then((res) => {
               
                const data = {
                    ...res.data,
                    token: this.state.jwt
                }
                store.dispatch(setStudentDetails(data));
            })
        }
    }

    render(){
        return (
            <div className='mainPage'>
                <div className='studentData'>
                    <div className="stuLeft">
                        <h3>User Name : {this.props.userDetails.name}</h3>
                        <h3>Roll No. : {this.props.userDetails.userId}</h3>
                        <h3>Room No. : {this.props.userDetails.roomNo}</h3>
                        <h3>Hostel No. : 4</h3>
                        <h3>Email : {this.props.userDetails.email}</h3>
                        <h3>Balance : {this.props.userDetails.balance}</h3>
                        <button onClick={this.handleLogOut}>Log Out</button>
                    </div>
                    <div className="stuRight">
                        <img 
                            src={this.props.userDetails.photo_buffer}
                            alt="profile"
                        />
                    </div>
                </div>
                <Records
                    record = {this.records}
                />
                <div className='sideBarR'>
                    <div className='messOff'>
                        <h2>Mess Off</h2>
                        <form >
                            <div>
                                <DateRangePicker 
                                className='DateRangePicker'
                                startDate={this.state.startDate}
                                startDateId={'startDateId'}
                                endDate={this.state.endDate}
                                endDateId={'endDateId'}
                                onDatesChange={this.handleDateChange}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={this.handleFocusChange}
                                showClearDates={false}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                                />
                                <select 
                                className='chooseMeal' 
                                value={this.state.messOffB}
                                onChange={this.handleChangeB}
                                >
                                    <option>BreakFast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                <select 
                                className='chooseMeal' 
                                value={this.state.messOffE}
                                onChange={this.handleChangeE}
                                >
                                    <option>BreakFast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>                               
                                <button onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='addComplaint'>
                        <form>
                            <div className='compTitle'>
                                <label>Category: </label>
                                <select 
                                    className='compTitleSelect'
                                    value={this.state.compTitle}
                                    onChange={this.changeCompTitle}
                                >
                                    <option>Food</option>
                                    <option>Electricity</option>
                                    <option>Internet</option>
                                    <option>Sanitization</option>
                                    <option>Staff</option>
                                    <option>Students</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div className='complaint'>
                                <textarea 
                                    value = {this.state.complaint}
                                    onChange = {this.changeComplaint}
                                    placeholder = "Complaint Details"
                                    rows = "4"
                                    cols = "40"
                                />
                            </div>
                            <button onClick={this.addComplaint} >Add Complaint</button>
                            <Link to='/complaintsList'><button>View Complaints</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        )   
    }
};

const mapStateToProps = (state) => {
    return {
        userDetails : state.userDetails
    }
}

export default connect(mapStateToProps)(MainPage);