import database from '../firebase/firebase';

export const changeBreakFast = (changedValue) => ({
    type : 'CHANGE_BREAKFAST',
    changedValue
});

export const changeLunch = (changedValue) => ({
    type : 'CHANGE_LUNCH',
    changedValue
});

export const changeDinner = (changedValue) => ({
    type : 'CHANGE_DINNER',
    changedValue
});

export const changeMealCosts = (changedB, changedL, changedD) => ({
    type : 'CHANGE_MEAL_COSTS',
    changedB,
    changedL,
    changedD
});

export const setMealCosts = ( mealCosts ) => ({
    type : 'SET_MEAL_COSTS',
    mealCosts
});

export const startSetMeals = () => {
    return (dispatch) => {
      return database.ref('mealCosts').once('value').then((snapshot) => {
        const mealCosts = {
            breakFast : snapshot.val().breakFast,
            lunch : snapshot.val().lunch,
            dinner : snapshot.val().dinner
        }
  
        dispatch(setMealCosts( mealCosts ));
      });
    };
  };