import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, ButtonToolbar, Dropdown, MenuItem, Button} from 'react-bootstrap'

let Logged = (props)=>{
  return (
    <ButtonToolbar>
       <Dropdown id="dropdown">
         <Dropdown.Toggle noCaret={true} >
            <img src="" alt="" className="userImage"/>
            <span className="userName">{props.name}</span>
         </Dropdown.Toggle>
         <Dropdown.Menu className="">
           <MenuItem eventKey="1" onClick={()=>{console.log("Out")}}>Вийти</MenuItem>
         </Dropdown.Menu>
       </Dropdown>
     </ButtonToolbar>
  )
}

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loged: {
        id: 1,
        name: "Liric",
        is_loged:false
      },
      showModal: false
    }
  }
  open(){
    this.setState({
      showModal: true
    })
  }
  close(){
    this.setState({
      showModal: false
    })
  }
  render(){
    let doIt = (<ButtonToolbar>
                  <Button onClick={this.open.bind(this)} > Войти </Button>
                </ButtonToolbar>)
    let is_l = this.state.loged.is_loged;
    if(is_l){
      doIt = Logged(this.state.loged);
    }
    return (
      <div className="login">
          {doIt}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Login form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}



export default Login;
