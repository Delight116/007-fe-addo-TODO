import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProjectApi from './../../projects/ProjectApi';
import ProjectStore from './../../projects/ProjectStore';

import config from './../methods/config';
import {getCookie} from './../methods/methods';

class AddForm extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state={
      id: this.props.data.id,
      name: this.props.data.name,
      color: this.props.data.color ,
      isShow: false
    }
    this.updateName =  this.updateName.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.send = this.send.bind(this);
    this.clear = this.clear.bind(this);
    this.show = this.show.bind(this);
    this.enterState = this.enterState.bind(this);
  }
  updateName(e){
    this.setState({name: e.target.value})
  }
  updateColor(e){
    this.setState({color: e.target.value})
  }
  enterState(){
    this.setState({
      id: this.props.data.id,
      name: this.props.data.name,
      color: this.props.data.color ,
    })
  }
  send(e){
    e.preventDefault();
  if(this.props.toUpdate){
    axios.put('http://127.0.0.1:5000/project/'+this.props.data.id,{
      name : this.state.name,
      color: this.state.color,
      to_user: getCookie('user_id')
    })
    .then(function(response) {
      console.log("Add", response.data.add);
      ProjectStore.setProject(response.data.add)

    });
  }else{
    axios.post('http://127.0.0.1:5000/project',{
      name : this.state.name,
      color: this.state.color,
      to_user: getCookie('user_id')
    })
    .then(function(response) {
      console.log("Add", response.data.add);
      ProjectStore.setProject(response.data.add[0])

    });
  }
    this.clear.call(this);

  }
  clear(e){
    this.setState({
      id: "",
      name: "",
      color: "#000000",
      user: "",
      isShow: false
    });
  }
  show(){
    this.setState({
      isShow: !this.state.isShow
    })
  }
  render(){
    console.log("PROJ",this.props.data)

    let form = (<button className="add" type="button" onClick={()=>{
      this.setState({
        isShow: true
      });
    }} ><span className="fa fa-plus"  aria-hidden="true"></span> Добавить</button>)

    if(this.state.isShow){
      form = [(<form key={"Add_"+this.state.id} onSubmit={this.send}>
              <input type="text" name="project" value={this.state.name} onChange={this.updateName} />
              <input type="color" name="color" value={this.state.color} onChange={this.updateColor} />
              <input type="submit" value="Добавить" className="btn-add_defult"/>
            <button type="button" name="button" onClick={()=>{
                this.props.closes.call(this)
              this.setState({
                isShow: false,

              });
              }} className="btn-add_defult">Отменить</button>
        </form>)]
    }

    if(this.props.toUpdate){

      form = [(<form key={"Up_"+this.state.id} onSubmit={this.send}>

              <input type="text" name="project" value={this.state.name} onChange={this.updateName} />
              <input type="color" name="color" value={this.state.color} onChange={this.updateColor} />
              <input type="submit" value="Добавить" className="btn-add_defult"/>
            <button type="button" name="button" onClick={()=>{
                this.props.closes.call(this)
              this.setState({
                isShow: false,

              });
              }} className="btn-add_defult">Отменить</button>
        </form>)]
    }
    return (
      <div>
        {form}
      </div>
    )
  }
}

AddForm.contextTypes = {
  params: React.PropTypes.object,
  projects: React.PropTypes.array
}

export default AddForm;
