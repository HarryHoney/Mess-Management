import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDhhJ198hPKAzWwXaqVM7n6ipiYuIQEwfI",
  authDomain: "hactathon2019.firebaseapp.com",
  databaseURL: "https://hactathon2019.firebaseio.com",
  projectId: "hactathon2019",
  storageBucket: "hactathon2019.appspot.com",
  messagingSenderId: "62564563940",
  appId: "1:62564563940:web:d9d7498c1fd7bfc72325f1"

    // apiKey: "AIzaSyAeL6KYUbYByWunbQSHfvsJcfERRWZgHW4",
    // authDomain: "asutoss-expensify-test.firebaseapp.com",
    // databaseURL: "https://asutoss-expensify-test.firebaseio.com",
    // projectId: "asutoss-expensify-test",
    // storageBucket: "asutoss-expensify-test.appspot.com",
    // messagingSenderId: "296500469335",
    // appId: "1:296500469335:web:ed84c7372f4676c7ef4d12"
  };

  firebase.initializeApp(config);

  const database = firebase.database();


  // database.ref('accounts').push({
  //   rollNo: 17103017,
  //   userName: "Ashutosh",
  //   roomNo: 311,
  //   password: 'a'
  // });

  // database.ref('mealCosts').set({ breakFast : 30,
  //                                 lunch: 40,
  //                                 dinner: 40
  //                               })
  // // database.ref()
  //         .once('value')
  //         .then((snapshot) => {
  //             const val = snapshot.val();
  
  //             console.log(val);
  //             // mealReducerDefaultState = { ...mealReducerDefaultState , mealCosts : { breakFast , lunch, dinner } };
  //             // console.log(mealReducerDefaultState);
  //         })
  //         .catch((e) => {
  //             console.log('Error fetching data ', e);
  //         });




  export {   database as default };