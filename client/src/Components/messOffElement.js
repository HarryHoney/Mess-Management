import React from 'react';
import '../style/messOffElement.css';

const MessOffElement = (props) => (
    <div className='mRow'>
        <div className='mCell'>Roll No. : {props.rollNo}</div>
        <div className='mCell'>Start Time : {props.startTime}</div>
        <div className='mCell'>End Time : {props.endTime}</div>
    </div>
);

export default MessOffElement;