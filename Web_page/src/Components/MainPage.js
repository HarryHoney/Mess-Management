import '../style/mainPage.css';
import React from 'react';
import Records from './Records';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import database from '../firebase/firebase';
var request = require('request');
    

class MainPage extends React.Component {
 state = {
     startDate : moment(),
     endDate : moment().add(1, 'week'),
     focusedInput : null,
     userName : "Ashutosh",
     rollNo : 17103017,
     hNo : 4,
     balance : 5010
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

    render(){
        return (
            <div className='mainPage'>
                <div className='studentData'>
                    <h3>User Name : {this.state.userName}</h3>
                    <h3>Hostel No. : {this.state.hNo}</h3>
                    <h3>Roll No. : {this.state.rollNo}</h3>
                    <h3>Balance : {this.state.balance}</h3>
                    <Link to='/' ><button>Log Out</button></Link>
                </div>
                <Records  
                    record = {this.records}
                />
                <div>
                    <h2>Mess Off</h2>
                    <form >
                        <div>
                            <h3>duration :</h3>
                            <DateRangePicker 
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
                            <button onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )   
    }
};

export default MainPage;