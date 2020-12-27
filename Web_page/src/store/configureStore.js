import { createStore } from 'redux';
import mealReducer from '../reducers/mealCosts';

const configureStore = () => {
    const store = createStore(mealReducer);
    return store;
}

var store = configureStore();
 

export { store, configureStore as default }
