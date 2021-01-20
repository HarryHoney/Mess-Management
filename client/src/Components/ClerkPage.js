import '../style/clerkPage.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAdminDetails } from '../actions/userDetails';
import { startSetMeals } from '../actions/mealCosts';
import { store } from '../store/configureStore';
import MealCosts from './MealCosts';
import {changeBreakFast,changeLunch, changeDinner} from '../actions/mealCosts';
//import database from '../firebase/firebase';
const apiUrl = "http://localhost:3000";

class ClerkPage extends React.Component { 

    state={
        rNo : "",
        details : "",
        charges : "",
        jwt : localStorage.getItem('adminToken') || null,
    }

    changeRNo = (e) => {
        const val = e.target.value;
        this.setState(() => {
            return {
                ...this.state,
                rNo : val
            }
        })
    }

    changeDetails = (e) => {
        const val = e.target.value;
        this.setState(() => {
            return {
                ...this.state,
                details : val
            }
        })
    }

    changeCharges = (e) => {
        const val = e.target.value;
        this.setState(() => {
            return {
                ...this.state,
                charges : val
            }
        })
    }

    handleChargesSubmit = (e) => {
        e.preventDefault();
        
        //check values
        //upload charges
        console.log('charges uploaded')

        this.setState(() => {
            return{
                ...this.state,
                rNo : "",
                details : "",
                charges : ""
            }
        })
    }

    handleLogOut = () => {
        localStorage.removeItem('adminToken');
        this.props.history.push('/');
    }

    async componentDidMount(){
        if(!this.props.userDetails.token){
            axios.get(`${apiUrl}/admin/me`,{
                headers : {
                    'Authorization' : this.state.jwt
                }
            }).then((res) => {

                const data = {
                    Name: res.data.Name,
                    userID: res.data.userID,
                    token: this.state.jwt
                }

                store.dispatch(setAdminDetails(data));
                store.dispatch(startSetMeals(this.props.userDetails.token));
            })
        }
        
    }


    render(){
        return(
            <div className='clerkPage'>

                <div className='sideBar'>
                    <Link to='/createAccount'>
                        <button >Create Account</button>
                    </Link>
                    <Link to='/messOff'>
                        <button >Mess-Off</button>
                    </Link>
                    <Link to={{
                        pathname : '/complaints',
                        disp: true
                    }}>
                        <button >Complaints</button>
                    </Link>

                    <button onClick={this.handleLogOut} >LogOut</button>
                    
                </div>
                <div className='mPage'>
                    <div className='mealCosts'>
                        <MealCosts  
                            onSubmitA={(breakfast) => {
                                this.props.dispatch(changeBreakFast(breakfast, this.props.userDetails.token));
                            }}
                            onSubmitB={(lunch) => {
                                this.props.dispatch(changeLunch(lunch, this.props.userDetails.token));
                            }}
                            onSubmitC={(dinner) => {
                                this.props.dispatch(changeDinner(dinner, this.props.userDetails.token));
                            }}
                        />
                    </div>
        

                </div>
                <div className='imposeCharges'>
                    <div className='charges'>
                            <h2>Impose Charges</h2>
                            <form>
                                <div className='fBox'>
                                    <label>Roll No. : </label>
                                    <input type='number' value={this.state.rNo} onChange={this.changeRNo} />
                                </div>
                                <div className='fBox'>
                                    <label>Details : </label>
                                    <input type='text' value={this.state.details} onChange={this.changeDetails} />
                                </div>
                                <div className='fBox'>
                                    <label>Charge : </label>
                                    <input type='number' value={this.state.charges} onChange={this.changeCharges} />
                                </div>
                                <button onClick={this.handleChargesSubmit} >Submit</button>
                            </form>
                    </div>
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


export default connect(mapStateToProps)(ClerkPage);
