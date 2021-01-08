import database from '../firebase/firebase';
import axios from 'axios';

const apiUrl = "http://localhost:3000";

export const changeBreakFast = (changedValue, token) => ({
    type : 'CHANGE_BREAKFAST',
    changedValue,
    token
});

export const changeLunch = (changedValue, token) => ({
    type : 'CHANGE_LUNCH',
    changedValue,
    token
});

export const changeDinner = (changedValue, token) => ({
    type : 'CHANGE_DINNER',
    changedValue,
    token
});

export const changeMealCosts = (changedB, changedL, changedD, token) => ({
    type : 'CHANGE_MEAL_COSTS',
    changedB,
    changedL,
    changedD, 
    token
});

export const setMealCosts = ( mealCosts ) => ({
    type : 'SET_MEAL_COSTS',
    mealCosts
});

export const startSetMeals = (token) => {
    return (dispatch) => {
      return axios.get(`${apiUrl}/admin/getCurrentCharges`, {
        headers : {
            'Authorization' : token
        }
        }).then((res) => {
            const mealCosts = {
                breakfast: res.data.breakfast,
                lunch: res.data.lunch,
                dinner: res.data.dinner
            }
            console.log(mealCosts);
            
            dispatch(setMealCosts(mealCosts));
        }, () => {
            console.log('unable to set costs');
        })        
    
    };
  };