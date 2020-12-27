import React from 'react';
import DataElement from './DataElement';

const Records = (props) => (
    <div className='records'>
        {
            props.record.map((data) => {
                return <DataElement  {...data}/>
            })
        }
    </div>
);

export default Records;