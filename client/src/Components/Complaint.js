import React from 'react';
import '../style/complaint.css';

const setStatus = function(status){
    if(status==0)
        return "Submitted";
    if(status==1)
        return "Processing";
    
    return "Resolved";
}

class Complaint extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        status: setStatus(this.props.Status)
    }

    changeStatus = (e) => {
        const val = e.target.value;
        //change data in the database
        this.props.changeStatus(this.props.Id, val);

        this.setState(() => {
            return {
                ...this.state,
                status: val
            }
        })
    }

    render(){
        return(
            <div className='comp'>
                <div className='mRow'>
                    <div className='mCell'>Title : {this.props.Title}</div>
                    <div className='mCell_d'>Details : {this.props.Details}</div>  
                    {
                        !this.props.disp ? (
                            <div className='mCell'>Status : {this.state.status}</div>
                        ) : (
                            <div className='mCell'>
                                <lable>Status:  </lable>
                                <select
                                    value={this.state.status}
                                    onChange={this.changeStatus}
                                >
                                    <option>Submitted</option>
                                    <option>Processing</option>
                                    <option>Resolved</option>
                                </select>
                            </div>
                        )
                    }
                    
                </div>
                {
                    this.props.disp ? ( 
                        <div className='compButtons'>
                            <button onclick={this.props.deleteComplaint(this.props.Id)}>Delete</button> 
                        </div> 
                ) : (
                        <div>

                        </div>
                    )
                }
               
            </div>
        );
    }
} 

export default Complaint;