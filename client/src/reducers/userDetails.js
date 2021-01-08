// import axios from 'axios';

// const apiUrl = "http://localhost:3000";

var userDetailsDefaultState = {
    name: '',
    userId: 0,
    email: '',
    roomNo: '',
    photo_buffer: null,
    balance: 0,
    mess_detail : {
        startDate: null,
        endDate: null
    },
    last_checkin : '',
    token: '',
    loginTo: ''
}

const userDetailsReducer = (state = userDetailsDefaultState, action) => {
    switch(action.type){
        case 'SET_ADMIN_DETAILS' :
            return {
                ...state, 
                name: action.data.Name, 
                userId: action.data.userID, 
                token: action.data.token,
                loginTo: 'Admin'
            };
        case 'SET_STUDENT_DETAILS' :
            return {
                ...state, 
                name: action.data.name, 
                userId: action.data.roll_number, 
                email: action.data.email,
                roomNo: action.data.room_number,
                photo_buffer: action.data.photo_buffer,
                balance: action.data.balance,
                mess_detail: action.data.mess_detail,
                last_checkin: action.data.last_checkin,
                token: action.data.token,
                loginTo: 'Student'
            }
        case 'GET_DETAILS' : 
            return state;
        default : 
            return state;
    }
}

export default userDetailsReducer;