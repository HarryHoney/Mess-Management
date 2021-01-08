import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { store } from '../store/configureStore';
import { startSetMeals } from '../actions/mealCosts';
import '../style/mealCosts.css';

const apiUrl = "http://localhost:3000";

class MealCosts extends React.Component { 
    constructor(props){
        super(props);
        this.handleVisibilityA = this.handleVisibilityA.bind(this);
        this.handleSubmitA = this.handleSubmitA.bind(this);
        this.handleInputChangeA = this.handleInputChangeA.bind(this);
        this.handleVisibilityB = this.handleVisibilityB.bind(this);
        this.handleSubmitB = this.handleSubmitB.bind(this);
        this.handleInputChangeB = this.handleInputChangeB.bind(this);
        this.handleVisibilityC = this.handleVisibilityC.bind(this);
        this.handleSubmitC = this.handleSubmitC.bind(this);
        this.handleInputChangeC = this.handleInputChangeC.bind(this);
        this.state = {
            va : false,
            vb : false,
            vc : false,
            ina : 0,
            inb : 0,
            inc : 0
        };
    }
    handleVisibilityA(){
        this.setState((prevState) => {
            return {
                ...this.state ,
                va : !prevState.va
            };
        });
    }

    handleVisibilityB(){
        this.setState((prevState) => {
            return {
                ...this.state ,
                vb : !prevState.vb
            };
        });
    }

    handleVisibilityC(){
        this.setState((prevState) => {
            return {
                ...this.state ,
                vc : !prevState.vc
            };
        });
    }

    handleInputChangeA(e){
        var x = e.target.value;
        this.setState(() => {
            return {
                ...this.state,
                ina : x
            };
        });
    }

    handleInputChangeB(e){
        var x = e.target.value;
        this.setState(() => {
            return {
                ...this.state,
                inb : x
            };
        });
    }

    handleInputChangeC(e){
        var x = e.target.value;
        this.setState(() => {
            return {
                ...this.state,
                inc : x
            };
        });
    }

    handleSubmitA= (e) => {
        e.preventDefault();
        this.handleVisibilityA();
        this.props.onSubmitA(this.state.ina)
    }

    handleSubmitB= (e) => {
        e.preventDefault();
        this.handleVisibilityB();
        this.props.onSubmitB(this.state.inb)
    }

    handleSubmitC= (e) => {
        e.preventDefault();
        this.handleVisibilityC();
        this.props.onSubmitC(this.state.inc)
    }

    componentDidMount(){

        const meals = this.props.mealCosts;
        if(meals.breakfast===0 && meals.lunch===0 && meals.dinner===0 ){
            store.dispatch(startSetMeals(this.props.token));    
        }
    }

    render(){
        return(
            <div>
                <h2>Meal Costs</h2>
                <div>
                    <h3>BreakFast : {this.props.mealCosts.breakfast}</h3>
                    {
                    !this.state.va &&
                        <button onClick={this.handleVisibilityA} >Edit</button>
                    }
                    {  this.state.va &&  
                            <form>  
                                <input type='number' onChange={this.handleInputChangeA}  />
                                <button className='halfB' type="button" onClick={this.handleSubmitA} >Submit</button>
                                <button className='halfB' type="button" onClick={this.handleVisibilityA} >Cancel</button>
                            </form>
                    }
                </div>
                <div>
                <h3>Lunch : {this.props.mealCosts.lunch}</h3>
                    {
                    !this.state.vb &&
                        <button onClick={this.handleVisibilityB} >Edit</button>
                    }
                    {  this.state.vb &&  
                            <form>  
                                <input type='number' onChange={this.handleInputChangeB}  />
                                <button className='halfB' type="button" onClick={this.handleSubmitB} >Submit</button>
                                <button className='halfB' type="button" onClick={this.handleVisibilityB} >Cancel</button>
                            </form>
                    }
                </div>
                <div>
                <h3>Dinner : {this.props.mealCosts.dinner}</h3>
                    {
                    !this.state.vc &&
                        <button onClick={this.handleVisibilityC} >Edit</button>
                    }
                    {  this.state.vc &&  
                            <form>  
                                <input type='number' onChange={this.handleInputChangeC}  />
                                <button className='halfB' type="button" onClick={this.handleSubmitC} >Submit</button>
                                <button className='halfB' type="button" onClick={this.handleVisibilityC} >Cancel</button>
                            </form>
                    }
                </div>
            </div>
        );
    }
};

const ConnectedMealCosts = connect((state)=>{
    return {
        mealCosts: state.meal.mealCosts,
        token: state.userDetails.token
    }
})(MealCosts);

export default ConnectedMealCosts;