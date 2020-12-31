import '../firebase/firebase';
import database from '../firebase/firebase';

var mealReducerDefaultState = {
    mealCosts : {
    breakFast : 0 ,
    lunch : 0, 
    dinner : 0
    }
}

const mealReducer = (state = mealReducerDefaultState, action) => {
    

    switch (action.type){
        case 'CHANGE_BREAKFAST':
            var temp1 = state.mealCosts;
            database.ref('mealCosts/breakFast').set(action.changedValue);
            return { ...state , mealCosts : { ...temp1 , breakFast : action.changedValue }
            }
        case 'CHANGE_LUNCH':
            var temp2 = state.mealCosts;
            database.ref('mealCosts/lunch').set(action.changedValue);
            return { ...state , mealCosts : { ...temp2 , lunch : action.changedValue }
            }
        case 'CHANGE_DINNER':
            var temp3 = state.mealCosts;
            database.ref('mealCosts/dinner').set(action.changedValue);
            return { ...state , mealCosts : { ...temp3 , dinner : action.changedValue }
            }
        case 'CHANGE_MEAL_COSTS':
            var temp4 = state.mealCosts;
            var x = { ...temp4 , 
                breakFast : action.changedB ,
                lunch : action.changedL ,
                dinner : action.changedD }
            database.ref('mealCosts').set(x);
            return { ...state , mealCosts : {...x}
                
            }
        case 'SET_EXPENSES':
            return action.mealCosts;
        default :
            return state;
    }
};






export default mealReducer;