import React from 'react';
import '../style/LoginPage.css';
import axios from 'axios';
import { setAdminDetails, setStudentDetails } from '../actions/userDetails';
import { store } from '../store/configureStore';

const apiUrl = "http://localhost:3000";

class LoginPage extends React.Component {

    state = {
        userID : '',
        password : '',
        loginTo : 'Admin',
        jwt : localStorage.getItem('token') || null,
    }

    setPassword = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            password: x
        });  
    }

    setUserID = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            userID: x
        });
    }

    handleLoginTo = (e) => {
        const val = e.target.value;
        this.setState({
            ...this.state,
            loginTo : val
        });
    }

    getJWT = (userID, password) => {
        
    if(this.state.loginTo === 'Admin'){
        axios.post(`${apiUrl}/admin/login`,{
            userID,
            password
        }).then((res) => {

            const data = {
                Name: res.data.admin.Name,
                userID: res.data.admin.userID,
                token: res.data.token
            }

            store.dispatch(setAdminDetails(data));
            this.moveToAdmin();
            
        }, () => {
            console.log('Admin not found');
            alert('userID and password do not match');
            this.setState({
                ...this.state,
                userID: '',
                password: ''
            })
        })

    }
    else{
        axios.post(`${apiUrl}/student/login`,{
            roll_number: userID,
            password
        }).then((res) => {
            const data = {
                ...res.data.data,
                token: res.data.token,
            }

            store.dispatch(setStudentDetails(data));
            this.moveToStudent(data.roll_number);
            
        }, () => {
            console.log('Student not found');
            alert('userID and password do not match');
            this.setState({
                ...this.state,
                userID: '',
                password: ''
            })
        })

    }


    }

    moveToAdmin = () => {
        this.props.history.push('/clerkPage');
    }

    moveToStudent = (id) => {
        this.props.history.push(`/mainPage/${id}`);
    }

    handleAuthentication = (e) => {
        e.preventDefault();
        this.getJWT(this.state.userID, this.state.password);
    }

    componentDidMount(){
        // axios.post(`${apiUrl}/admin/add_admin`,{
        //     Name : "Ashutosh",
        //     userID : 87654321,
        //     password : "asutoss"
        // }).then((res) => {
        //     console.log('admin account added');
        //     console.log(res);
        // }, () => {
        //     console.log('unable to add admin account');
        // })
    }

    render(){
        return(
            <div className="container">
                <div className="loginPage">
  
                    <div className='list-item list-item--message'>
                        <select
                            value={this.state.loginTo}
                            onChange={this.handleLoginTo}
                        >
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                        <h2>Login</h2>
                        <form className='form' >
                            <div className='form_input'>
                                <h3>UserID :</h3>
                                <input type='number' value={this.state.userID} onChange={this.setUserID} />
                            </div>
                            <div className='form_input'>
                                <h3>Password :</h3>
                                <input type='password' value={this.state.password} onChange={this.setPassword} />
                            </div>
                        
                            <button onClick={this.handleAuthentication}>Submit</button>
                        
                        </form>
                    </div>
                            
                </div>
            </div>
            );
    }
}

export default LoginPage;