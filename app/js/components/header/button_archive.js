import React from 'react';
import ReactDOM from 'react-dom';


class ButtonArchive extends React.Component{

  render(){
    return(
      <button className="arhive" type="button" name="arhive">
        <span className="fa fa-history" aria-hidden="true"></span>
      </button>
    );
  }
}

export default ButtonArchive;
