import React from 'react';

const MessOffElement = (props) => (
    <div>
        <h3>Roll No. : {props.rollNo}</h3>
        <h3>Start Time : {props.startTime}</h3>
        <h3>End Time : {props.endTime}</h3>
    </div>
);

export default MessOffElement;