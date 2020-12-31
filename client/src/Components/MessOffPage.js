import React from 'react';
import { connect } from 'react-redux';
import MessOffElement from './messOffElement';
import database from '../firebase/firebase';

class MessOffPage extends React.Component {
    state={
        messOffList : [],
    }

    handleMessOffList = () => {
        database.ref('messOffList')
          .once('value')
          .then((snapshot) => {
                var list = [];
                snapshot.forEach((childSnapshot) => {
                    list.push(
                        {
                        rollNo : childSnapshot.node_.children_.root_.value.value_,
                        startDate : childSnapshot.node_.children_.root_.right.value.value_,
                        endDate : childSnapshot.node_.children_.root_.left.value.value_
                    }
                    );
                })
                
               

                this.setState(()=>{
                    return{
                        ...this.state,
                        messOffList: list,
                    }
                });

          })
          .catch((e) => {
              console.log('Error fetching data ', e);
          });

    }

    componentDidMount(){
        this.handleMessOffList();
    }

    render(){
        return (
            <div>
                <div>
                    {
                        this.state.messOffList.map((data) => {
                            return <MessOffElement key={data.rollNo} {...data}/>
                        })    
                    }
                </div>
            </div>
        );
    }
}


export default connect()(MessOffPage);