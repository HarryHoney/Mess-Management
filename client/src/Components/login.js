import React from 'react';
import '../style/login.css';

class Login extends React.Component { 
    constructor(props){
        super(props);
        this.setName=this.setName.bind(this);
        this.setPassword=this.setPassword.bind(this);
        this.handleAuthentication=this.handleAuthentication.bind(this);
    }
    state = {
        name : '',
        pwd : ''
    }
    setName = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
                name: x
            });
    }
    setPassword = (e) => {
        const x = e.target.value;
        this.setState({
            ...this.state,
            pwd: x
        });  
    }
    handleAuthentication = (e) => {
                e.preventDefault();

        console.log("test : ", this.props.info.userName, " ", this.props.info.password);

        if(
            this.props.info.userName === this.state.name 
            && 
            this.props.info.password === this.state.pwd 
            ){
            this.props.changeAuthentication();
        }
        else if(false){
            //check for student account
            // this.props.moveToStudent(this.state.name);
        }
        else{
            alert('OOPS! Try Again');
        }
       
    }
    render(){
        return (
            <form className='form' onSubmit={this.handleAuthentication} >
                <div className='form_input'>
                    <h3>UserName :</h3>
                    <input type='text' onChange={this.setName} />
                </div>
                <div className='form_input'>
                    <h3>Password :</h3>
                    <input type='password' onChange={this.setPassword} />
                </div>
               
                <button onClick={this.handleAuthentication}>Submit</button>
               
            </form>
        );
    }
};

export default Login;