import '../style/clerkPage.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MealCosts from './MealCosts';
import {changeBreakFast,changeLunch, changeDinner} from '../actions/mealCosts';
import database from '../firebase/firebase';


const axios = require('axios');

var data = [];

const func = async() => {
    const ata = await axios.get('https://us-central1-hactathon2019.cloudfunctions.net/nitjalandhar/per_for_clerk');
        data = ata.data;
}

window.onload = func();

class ClerkPage extends React.Component { 
    state={
        messOffList : [],
        rNo : "",
        details : "",
        charges : ""
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

    handleMessOffList = () => {
        database.ref('messOffList')
          .once('value')
          .then((snapshot) => {
                var list = [];
                snapshot.forEach((childSnapshot) => {
                    list.push(
                        {
                        rollNo : childSnapshot.node_.children_.root_.value.value_,
                        startDate : childSnapshot.node_.children_.root_.right.value.value_,
                        endDate : childSnapshot.node_.children_.root_.left.value.value_
                    }
                    );
                })
                
               

                this.setState((prevState)=>{
                    return{
                        ...this.state,
                        messOffList: list,
                        vis: !prevState.vis
                    }
                });

          })
          .catch((e) => {
              console.log('Error fetching data ', e);
          });

    }

    handleLogOut = () => {
        this.props.history.push('/');
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
                            onSubmitA={(breakFast) => {
                                this.props.dispatch(changeBreakFast(breakFast));
                            }}
                            onSubmitB={(lunch) => {
                                this.props.dispatch(changeLunch(lunch));
                            }}
                            onSubmitC={(dinner) => {
                                this.props.dispatch(changeDinner(dinner));
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
    


export default connect()(ClerkPage)
