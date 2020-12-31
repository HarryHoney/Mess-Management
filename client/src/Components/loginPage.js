import React from 'react';
import Login from './login';
import { Link } from 'react-router-dom';
import '../style/LoginPage.css';

// var temp = {
//     userName : 'A',
//     password : 'B',
//     isAuthenticated : false
// }

class LoginPage extends React.Component {
    
    constructor(props){
        super(props);
        this.changeAuthentication = this.changeAuthentication.bind(this);
    }

    state = {
        userName : 'A',
        password : 'B',
    }

    changeAuthentication = () => {
        this.props.history.push('/clerkPage');
    }

    moveToStudent = (id) => {
        this.props.history.push(`/mainPage/${id}`);
    }

    render(){
        return(
            <div className="container">
                <div className="loginPage">
  
                    <div className='list-item list-item--message'>
                        <h2>Login</h2>
                        <Login info={this.state} changeAuthentication={this.changeAuthentication} moveToStudent={this.moveToStudent} />
                    </div>
                            
                </div>
            </div>
            );
    }
}

export default LoginPage;