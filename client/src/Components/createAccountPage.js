import '../style/createAccountPage.css';
import React from 'react';
import database from '../firebase/firebase';
const axios = require('axios');
var request = require('request');

class CreateAccountPage extends React.Component {
    
    state={
        rollNo : undefined,
        userName : undefined,
        roomNo : undefined,
        password : undefined,
        allowSubmit : false
    }

    handleRollNo = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            rollNo : x
        });
    }

    handleUserName = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            userName : x
        });
    }

    handleRoomNo = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            roomNo : x
        });
    }

    handlePassword = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            password : x
        });
    }

    checkPassword = (e) => {
        const x = e.target.value;
        if(this.state.password === x){
            this.setState({
                ...this.state,
                allowSubmit: true
            })
        }
        else{

        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.allowSubmit){
            console.log(this.state);
            const data = {
                userName : this.state.userName,
                rollNo : this.state.rollNo,
                roomNo : this.state.roomNo,
                password : this.state.password
            }
            database.ref('accounts').push({
                userName : data.userName,
                password : data.password
            });
            this.props.history.push('/ClerkPage');
            request.post({
                headers : {'content-type' : 'application/json'},
                url: 'https://us-central1-hactathon2019.cloudfunctions.net/nitjalandhar/student_signup',
                body: {
                    "roll" : data.rollNo,
                    "name" : data.userName,
                    "room" : data.roomNo,
                    "hostel" : 4,
                } ,
                json: true
            }, function(error, response, body){
                if(error)
                    console.log("Error. "+error);
                console.log(body);
            });
        }
        else{
            alert('Passwords do not match');
        }
    };

    handleClick=(e) => {
        e.preventDefault();
        const roll_number = JSON.stringify(this.state.rollNo);
        const url = `http://localhost:3030/server?roll_number=${roll_number}`
        const doit = async (req, res) => {
            const re = await axios.get(url)
            res.send(re)
        }
        doit();
      
    };
    render(){
        return (
        
            <div className='createAccountPage'>
                <h2>Create Account</h2>
                <form onSubmit={this.onSubmit} >
                    <div className='left_box'>
                        <div className='box'>
                            <h3>Roll No. :</h3>
                            <input type='number' onChange={this.handleRollNo} />
                        </div>
                        <div className='box'>
                            <h3>User Name :</h3>
                            <input type='text' onChange={this.handleUserName} />
                        </div>
                        <div className='box'>
                            <h3>Room No. :</h3>
                            <input type='number' onChange={this.handleRoomNo} />
                        </div>
                        <div className='box'>
                            <h3>Password :</h3>
                            <input type='password' onChange={this.handlePassword} />
                        </div>
                        <div className='box'>
                            <h3>Password Again :</h3>
                            <input type='password' onChange={this.checkPassword}/>
                        </div>
                    </div>
                    <div className='right_box'>
                        <button onClick={this.handleClick}>Take Photos</button>
                        <button >Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateAccountPage;