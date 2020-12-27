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
        changeUserName : '',
        changePassword: '',
        isAuthenticated : false
    }

    changeAuthentication = () => {
        //console.log(this.state);
        this.setState(()=>{
            return{
                ...this.state,
                isAuthenticated : true
            }
        });

    }

    handleChangeUserName = (e) => {
        const x = e.target.value;
        this.setState(()=>{
            return{
                ...this.state,
                changeUserName : x
            }
        });
    }

    handleChangePassword = (e) => {
        const x = e.target.value;
        this.setState(()=>{
            return{
                ...this.state,
                changePassword : x
            }
        });
    }
    
    handleChange = (e) => {
        e.preventDefault();
        const x = this.state.changeUserName;
        const y = this.state.changePassword;
        this.setState(()=>{
            return{
                ...this.state,
                userName : x,
                password : y,
                changeUserName : '',
                changePassword : '',
                isAuthenticated : false
            }
        });
        console.log(this.state);
    }
    

    render(){
        return(
            <div className="container">
                <div className="loginPage">
                    {/* <h2>Login</h2>
                    <Login info={temp} changeAuthentication={this.changeAuthentication}/> */}
                    {
                        this.state.isAuthenticated === false
                         ? (
                            <div className='list-item list-item--message'>
                                <h2>Login</h2>
                                <Login info={this.state} changeAuthentication={this.changeAuthentication}/>
                            </div>
                            ) : (
                            <div>
                                <h2>Clerk Page</h2>                            
                                <div>
                                    <form onSubmit={this.handleChange}>
                                        <div>
                                            <h3>UserName :</h3>
                                            <input type='text' onChange={this.handleChangeUserName} />
                                        </div>
                                        <div>
                                            <h3>Password :</h3>
                                            <input type='text' onChange={this.handleChangePassword} />
                                        </div>
                                        <button>Save Changes</button>
                                    </form> 
                                </div>
                                <Link to='/clerkPage'> <button onClick={this.onLoginClick}>Enter</button></Link>
                             </div>
                        )
                    }
                    </div>
            </div>
            );
    }
}

export default LoginPage;