import React from 'react';
import ReactDOM from 'react-dom';
import {StyledDate} from './../methods/methods';
let dateAr = []
class Title extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      date: [],
      today: new Date()
    }
  }
  render(){
    let date = "";
    if(this.props.tasks > 1){
      if(dateAr != StyledDate(this.props.date)){
        dateAr =  StyledDate(this.props.date);
        date = StyledDate(this.props.date);
      }
    }else{
      date = StyledDate(this.props.date)
    }
    console.log(dateAr);

    return (
      <h2 className="title">
          {this.props.title}
          <span className="date">{date}</span>
      </h2>
    )
  }
}

export default Title;
