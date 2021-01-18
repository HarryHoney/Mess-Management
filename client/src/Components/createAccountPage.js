import '../style/createAccountPage.css';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import database from '../firebase/firebase';

const apiUrl = "http://localhost:3000";

// var request = require('request');

class CreateAccountPage extends React.Component {

    state={
        rollNo : 0,
        userName : undefined,
        roomNo : 0,
        password : undefined,
        allowSubmit : false,
        img: null,
        balance: 0,
        email: ''
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

    handleEmail = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            email : x
        })
    }

    handleBalance = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            balance : x
        })
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
            // console.log(device.label);
            this.setDevice(device);
        });
    }

    async setDevice(device) {
        const { deviceId } = device;
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } })
        this.videoPlayer.srcObject = this.stream;
        this.videoPlayer.play();
    }

    takePhoto = () => {
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 360, 270);
        var imageURI = this.canvas.toDataURL("image/jpeg");

        this.setState({
            ...this.state,
            img: imageURI
        });
        console.log(this.state.img);
        // this.canvas.toBlob((blob) => {
        //     blob.arrayBuffer().then((buffer) => {
        //         this.setState({
        //             ...this.state,
        //             imgBuffer: buffer
        //         });
        //         console.log(this.state.imgBuffer);
        //     })
        // },sendFile);
    };




    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.allowSubmit){
            // console.log(this.state);
            const data = {
                name: this.state.userName,
                email: this.state.email,
                roll_number: this.state.rollNo,
                room_number: this.state.roomNo,
                photo_buffer: this.state.img,
                balance: this.state.balance,
                password: this.state.password,
                last_checkin: ''
            }
            console.log(data);
            axios.post(`${apiUrl}/admin/add_new_student`, data, {
                headers : {
                    'Authorization' : this.props.userDetails.token
                }
            }).then((res) => {
                console.log('student account added');
                console.log(res);
                this.props.history.push('/clerkPage');
            }, () => {
                console.log('unable to add student account');
            })
        
            console.log(data);

        }
        else{
            alert('Passwords do not match');
        }
    };

    handleClick=(e) => {
        e.preventDefault();
        this.takePhoto();
    };

    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    async componentWillUnmount(){
        this.stream.getTracks().forEach(track => track.stop());
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
                            <h3>Email :</h3>
                            <input type='email' onChange={this.handleEmail} />
                        </div>
                        <div className='box'>
                            <h3>Balance :</h3>
                            <input type='number' onChange={this.handleBalance} />
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

const mapStateToProps = (state) => {
    return {
        userDetails : state.userDetails
    }
}

export default connect(mapStateToProps)(CreateAccountPage);