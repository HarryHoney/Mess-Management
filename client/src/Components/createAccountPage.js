import '../style/createAccountPage.css';
import React from 'react';
import database from '../firebase/firebase';

var request = require('request');

class CreateAccountPage extends React.Component {

    state={
        rollNo : undefined,
        userName : undefined,
        roomNo : undefined,
        password : undefined,
        allowSubmit : false,
        imgBlob: null
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

    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } })
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    takePhoto = () => {
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 360, 270);
        this.canvas.toBlob((blob) => {
            this.setState(() => {
                return{
                    ...this.state,
                    imgBlob : blob
                }
            })
            console.log(this.state.imgBlob);
        },sendFile);
    };




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
            // request.post({
            //     headers : {'content-type' : 'application/json'},
            //     url: 'https://us-central1-hactathon2019.cloudfunctions.net/nitjalandhar/student_signup',
            //     body: {
            //         "roll" : data.rollNo,
            //         "name" : data.userName,
            //         "room" : data.roomNo,
            //         "hostel" : 4,
            //     } ,
            //     json: true
            // }, function(error, response, body){
            //     if(error)
            //         console.log("Error. "+error);
            //     console.log(body);
            // });
        }
        else{
            alert('Passwords do not match');
        }
    };

    handleClick=(e) => {
        e.preventDefault();

        this.takePhoto();

    };


    setCam = (cam) => {
        this.setState(() => {
            return {
                ...this.state,
                cam
            }
        })
    }

    render(){
        return (
        
            <div className='createAccountPage'>
                <h2>Create Account</h2>
                <form>
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

                    <div className='camBox'>
                        <canvas width="270" height="270" ref={ref => (this.canvas = ref)} />
                    </div> 
                    
                    <div className='right_box'>
                        <video ref={ref => (this.videoPlayer = ref)} width="270" height="270" />
                        <button onClick={this.handleClick}>Take Photo</button>
                        <button onClick={this.onSubmit} >Sign Up</button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        );
    }
}

export default CreateAccountPage;