import '../firebase/firebase';
// import database from '../firebase/firebase';
import axios from 'axios';

var mealReducerDefaultState = {
    mealCosts : {
    breakfast : 0 ,
    lunch : 0, 
    dinner : 0
    }
}

const apiUrl = "http://localhost:3000";

const mealReducer = (state = mealReducerDefaultState, action) => {
    

    switch (action.type){
        case 'CHANGE_BREAKFAST':
            var temp1 = state.mealCosts
            var data1 = {
                breakfast: action.changedValue,
                lunch: temp1.lunch,
                dinner: temp1.dinner
            }
            axios.post(`${apiUrl}/admin/editCharges`, data1, {
                headers : {
                    'Authorization' : action.token
                }
            }).then((res) => {
                console.log(res.data);
            }, () => {
                console.log('unable to change breakfast');
            })

            return { ...state , mealCosts : { ...temp1 , breakfast : action.changedValue }
            }
        case 'CHANGE_LUNCH':
            var temp2 = state.mealCosts;
            var data2 = {
                breakfast: temp2.breakfast,
                lunch: action.changedValue,
                dinner: temp2.dinner
            }
            axios.post(`${apiUrl}/admin/editCharges`, data2, {
                headers : {
                    'Authorization' : action.token
                }
            }).then((res) => {
                console.log(res.data);
            }, () => {
                console.log('unable to change lunch');
            })

            return { ...state , mealCosts : { ...temp2 , lunch : action.changedValue }
            }
        case 'CHANGE_DINNER':
            var temp3 = state.mealCosts;
            var data3 = {
                breakfast: temp3.breakfast,
                lunch: temp3.lunch,
                dinner: action.changedValue
            }
            axios.post(`${apiUrl}/admin/editCharges`, data3, {
                headers : {
                    'Authorization' : action.token
                }
            }).then((res) => {
                console.log(res.data);
            }, () => {
                console.log('unable to change dinner');
            })
            
            return { ...state , mealCosts : { ...temp3 , dinner : action.changedValue }
            }
        case 'CHANGE_MEAL_COSTS':
            var data = {
                breakfast : action.changedB ,
                lunch : action.changedL ,
                dinner : action.changedD 
            }
            
            axios.post(`${apiUrl}/admin/editCharges`, data, {
                headers : {
                    'Authorization' : action.token
                }
            }).then((res) => {
                console.log(res.data);
            }, () => {
                console.log('unable to change mealCosts');
            })
            return { ...state , mealCosts : {...data}    
            }

        case 'SET_MEAL_COSTS':
            return { mealCosts : {...action.mealCosts}}

        default :
            return state;
    }
};






export default mealReducer;