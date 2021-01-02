import React from 'react';
import Complaint from './Complaint';

/* status
    0 -> no action taken
    1 -> processing
    2 -> resolved
*/

class ComplaintsPage extends React.Component{
    state = {
        complaints: [   {Id:'1', Title: 'Wifi', Details: " Wifi not working", Status: 0},
                        {Id:'2', Title: 'Food', Details: " not sufficient snacks", Status: 1},
                    ]
    }

    getComplaints = () => {

    }

    componentDidMount(){
        this.getComplaints();
        console.log(this.props);
    }

    render(){
        return(
            <div>
                {
                    this.state.complaints.map((data) => {
                        return <Complaint 
                                key={data.Id} 
                                {...data} 
                                disp={false}
                                />
                    })    
                }
            </div>
        );
    }

} 

export default ComplaintsPage;