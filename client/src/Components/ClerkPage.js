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
        vis: false,
        messWastage : [],
        visforW : false
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

    handleFoodWasteManagement = () => {
    
        this.setState((prevState)=>{
            return{
                ...this.state,
                messWastage : data,
                visforW : !prevState.visforW
            }
        });
        console.log("rent");
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
                    <Link to='/charges'>
                        <button >Impose Charges</button>
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

            </div>
        );
    }
}
    


export default connect()(ClerkPage)
