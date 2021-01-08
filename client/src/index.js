// import database from './firebase/firebase';
// import { changeMealCosts } from './actions/mealCosts';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';;


// database.ref('mealCosts')
//           .once('value')
//           .then((snapshot) => {
//               const val = snapshot.val();

//               store.dispatch(changeMealCosts(val.breakFast, val.lunch, val.dinner));
//           })
//           .catch((e) => {
//               console.log('Error fetching data ', e);
//           });

const jsx = (
    <Provider store={store} >
        <App />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('root'));

