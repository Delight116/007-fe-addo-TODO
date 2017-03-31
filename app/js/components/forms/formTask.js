import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TaskApi from './../../projects/ProjectApi';
import ProjectStore from './../../projects/ProjectStore';

import config from './../methods/config';
import {formatDate} from './../methods/methods';


class AddTaskForm extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state={
      id: this.props.toUpdate ? this.props.item.id: "",
      name: this.props.toUpdate ? this.props.item.name: "",
      text: this.props.toUpdate ? this.props.item.text: "",
      date: this.props.toUpdate ? this.props.item.date: new Date(),
      status: this.props.toUpdate ? this.props.item.status: "",
      priority: this.props.toUpdate ? this.props.item.priority: "",
      to_project: this.props.toUpdate ? this.props.item.to_project.id: "",
      to_user: this.props.toUpdate ? this.props.item.to_user.id: "",
      isShow: false
    }
    this.updateName =  this.updateName.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updatePriority =   this.updatePriority.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.send = this.send.bind(this);
    this.clear = this.clear.bind(this);
    this.show = this.show.bind(this);
  }

  send(e){
    e.preventDefault();
    // alert(config)
    if(this.props.toUpdate){
      axios.put('http://127.0.0.1:5000/task/'+this.state.id,{
        name: this.state.name,
        text: this.state.text,
        date:  formatDate(new Date(this.state.date)),
        status:  this.state.status,
        priority: +this.state.priority,
        to_project:  +this.state.to_project,
        to_user:  +this.state.to_user,
      })
      .then(function(response) {
        TaskStore.updateTask(response.data)

      });
    }else{
      axios.post('http://127.0.0.1:5000/task/',{
        name: this.state.name,
        text: this.state.text,
        date:  formatDate(new Date(this.state.date)),
        status:  this.state.status,
        priority: +this.state.priority,
        to_project:  +this.state.to_project,
        to_user:  +this.state.to_user,
      })
      .then(function(response) {
        TaskStore.setTaskList(response.data);

      });
    }

    this.clear.call(this);


  }
  clearState(){
    this.setState({
      id: "",
      name:"",
      text:"",
      date: "",
      status: "",
      priority: "",
      to_project: "",
      to_user: "",
    })
  }

  clear(e){
    this.setState({
      name:"",
      text:"",
      date: new Date(),
      status: "",
      priority: "",
      to_project: "",
      to_user: "",
    });
    this.show.call(this);
  }
  show(){
    this.setState({
      isShow: !this.state.isShow
    })
  }
  updateName(e){
    this.setState({name: e.target.value})
  }
  updateText(e){
    this.setState({text: e.target.value})
  }
  updateDate(e){
    this.setState({date: e.target.value})
  }
  updatePriority(e){
    this.setState({priority: e.target.value})
  }
  updateProject(e){
    this.setState({to_project: e.target.value})
  }

  render(){
    let projects = this.context.projects.map((item)=>{
      return (
          <option  value={item.id}>{item.name}</option>
      );
    })

    let form = [(<form key={"Form_"+this.state.id} onSubmit={this.send}>
            <input type="hidden" name="task" value={this.state.id} />

            <input type="text" name="task" value={this.state.name} onChange={this.updateName} />
            <textarea name="text" rows="8" cols="80"  onChange={this.updateText} value={this.state.text} ></textarea>
            <input type="date" name="date" value={formatDate(new Date(this.state.date))} onChange={this.updateDate} />
            <select name="prioritet"  value={this.state.priority} onChange={this.updatePriority}>
              <option value="1">Високий</option>
              <option value="2">Средний</option>
              <option value="3">Низкий</option>
            </select>
            <select name="projects"  value={this.state.to_project} onChange={this.updateProject}>
              {projects}
            </select>
            <input type="submit" value={this.props.toUpdate?"Обновить":"Добавить"} className="btn-add_defult"/>
            <button type="button" name="button" onClick={this.clear} className="btn-add_defult">Отменить</button>
      </form>)]

    return (
      <div>
        {form}
      </div>
    )
  }
}

AddTaskForm.contextTypes = {
  params: React.PropTypes.object,
  projects: React.PropTypes.array
}

export default AddTaskForm;
