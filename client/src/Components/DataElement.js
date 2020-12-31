import React from 'react';
import '../style/dataElement.css';

const DataElement = (props) => (
    <div className='cRow'>
        <div className='cCell'>{props.description}</div>
        <div className='cCell'>{props.date}</div>
        <div className='cCell'>{props.time}</div>
        <div className='cCell'>{props.amount}</div>
    </div>
)

export default DataElement;