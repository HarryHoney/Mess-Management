import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mealReducer from '../reducers/mealCosts';
import userDetailsReducer from '../reducers/userDetails';

const configureStore = () => {
    const reducer = combineReducers({
        meal: mealReducer,
        userDetails: userDetailsReducer
    })
    const store = createStore(reducer, applyMiddleware(thunk));
    return store;
}

var store = configureStore();
 

export { store, configureStore as default }
