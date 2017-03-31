import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button} from 'react-bootstrap';
import FormTaskAdd from './../forms/formTask';
let rand = ()=> (Math.floor(Math.random() * 20) - 10);

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {

  return {
    position: 'absolute',
    width: '50%',
    left: '25%',
    'min-widht': 400,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};


class Modals extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showModal: false,
      data: {}
    }
  }

  render() {
    let data = this.props.data
    console.log("MODAL", this.props.data);
    let inModal = (<div>
              <h1 className="title">{this.props.data.name}</h1>
              <div className="inner">{this.props.data.text}</div>
              </div>);
    if(this.props.form){
        inModal = (<FormTaskAdd toUpdate={this.props.toUpdate} item={this.props.data} />)
      }



    return (
      <div className='modal-example'>
        <Modal
          aria-labelledby='modal-label'
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.props.showModal}
          onHide={this.props.onHide}
        >
          <div style={dialogStyle()} >
            {inModal}
          </div>
        </Modal>
      </div>
    );
  }

  close(){
    this.setState({ showModal: false });
  }

  open(data){
    this.setState({ showModal: true, data: data });
  }
}

export default Modals;
