import React from 'react';

const DataElement = (props) => (
    <div>
        <p>{props.description}</p>
        <p>{props.amount}</p>
        <p>{props.date}</p>
        <p>{props.time}</p>
    </div>
)

export default DataElement;