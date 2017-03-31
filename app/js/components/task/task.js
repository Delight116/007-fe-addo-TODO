import React from 'react';
import ReactDOM from 'react-dom';
import {GetPriorityColor, StyledDate} from './../methods/methods'
import {Collapse, Well, ButtonToolbar, Dropdown, MenuItem, Button} from 'react-bootstrap'
import Paginations from './../pagination/pagination';

import TaskStore from './../../tasks/TaskStore';
import TaskApi from './../../tasks/TaskApi';

import Modals from './../modals/modal';
import Title from './title';

class Task extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      tasks: TaskStore.getTaskList(),
      pages: TaskStore.getCount(),
      isDelete: null,
      isUpdate: null,
      isToday: false,
      toUpdate: false,
      data: {},
      showModal: false,
      form: false,
      next: false,
      archive: false,
    }
    this.onGetTask = this.onGetTask.bind(this);
    this.ShowModal = this.ShowModal.bind(this);
    if(this.context.next){
      this.setState({
        next: true
      })
    }
  }
  componentDidMount() {


    TaskStore.addEventListener('remove-task', this.onGetTask);
    TaskStore.addEventListener('update-task', this.onGetTask);
    TaskStore.addEventListener('get-task', this.onGetTask);
    TaskApi.setPage(this.context.params.page);
    console.log(this.context.next,this.context.archive);
    if(this.state.next){
        TaskStore.addEventListener('task-list', this.onGetTask);
      TaskApi.getTasks();

    }else if(this.state.archive){
      TaskStore.addEventListener('task-archive', this.onGetTask);

      TaskApi.getArchiveTasks();

    }else{
      TaskStore.addEventListener('task-list-today', this.onGetTask);
      TaskApi.getTasksToday();

    }
  }

  componentWillUnmount() {
    TaskStore.removeEventListener('task-archive', this.onGetTask);
    TaskStore.removeEventListener('get-task', this.onGetTask);
    TaskStore.removeEventListener('task-list-today', this.onGetTask);
    TaskStore.removeEventListener('task-list', this.onGetTask);
    TaskStore.removeEventListener('update-task', this.onGetTask);
    TaskStore.removeEventListener('remove-task', this.onGetTask);

  }
  onGetTask(){
    this.setState({
      tasks: TaskStore.getTaskList()
    });
  }
  DeleteTask(id){
    TaskApi.removeTask(id)
  }
  ChangeStatus(data){
    data.status = 1;
    TaskStore.setStatus(true);
    TaskApi.updateTask(data);
    console.log("ch data",data);
  }
  ShowModal(){
    this.setState({
      showModal: false,
      data: {},
      form:false,
      toUpdate: false,
    })
  }
  render(){
    let task = this.state.tasks.map((item, index)=>{
      console.log("item",item.id);
      let title = ""
      if (StyledDate(item.date)==StyledDate(new Date()) && index == 0){
        title = "Сегодня  ";
      }
      var id = item.id;
      return (
        <div key={"Task_"+id}>
        <Title date={item.date} title={title} tasks={this.state.tasks.length}/>
        <section >
          <div className="task">
            <button type="button" className="task_status" style={{'backgroundColor':GetPriorityColor(item.priority)}} onClick={()=>{
                this.ChangeStatus.call(this,item);
              this.setState({
                isUpdate: id,
                tasks: TaskStore.getTaskList()
              })
            console.log("Updated", id);
            }}>
            </button>
            <a href={'#'} onClick={()=>{this.setState({showModal:true, data: item});}}>
              {item.name}
            </a>
            <div className="nameProject">
              <span className="projectName">{item.to_project.name}</span>
              <span className="marks fa fa-star" style={{'color':item.to_project.color}} aria-hidden="true"></span>
            </div>
            <ButtonToolbar>
               <Dropdown id="dropdown">
                 <Dropdown.Toggle noCaret={true} >
                   <span className="fa fa-ellipsis-v" style={{'color':GetPriorityColor(item.priority)}} aria-hidden="true"></span>
                 </Dropdown.Toggle>
                 <Dropdown.Menu className="super-colors">
                    <MenuItem eventKey="1" className="fa fa-pencil" aria-hidden="true" onClick={()=>{
                        this.setState({
                          showModal:true,
                          data: item,
                          form: true,
                          toUpdate: true
                        })
                      }}>Update</MenuItem>
                  <MenuItem eventKey="2" className="fa fa-trash" aria-hidden="true" onClick={()=>{
                      this.DeleteTask.call(this, id)
                      this.setState({
                        isDelete: id,
                        tasks: TaskStore.getTaskList()
                      })
                      console.log("Deleted", id);
                    }
                  }>Delete</MenuItem>
                 </Dropdown.Menu>
               </Dropdown>
             </ButtonToolbar>
          </div>
        </section>
      </div>

      )
    });


    return (
      <div className="list-tasks">
        {task}
        <button className="add" type="button" onClick={()=>{
            this.setState({
              showModal:true,
              form: true,
            })
          }} ><span className="fa fa-plus"  aria-hidden="true"></span> Добавить</button>
        <div className="pBlock">
          <Paginations pages={this.state.pages[0]} />
        </div>
        <Modals showModal={this.state.showModal}
          onHide={this.ShowModal}
          data={this.state.data}
          form={this.state.form}
          toUpdate={this.state.toUpdate}
          />
      </div>
    )
  }
}
Task.contextTypes = {
  params: React.PropTypes.object,
  deleteTask: React.PropTypes.func,
  next: React.PropTypes.bool,
  archive: React.PropTypes.bool,
}

export default Task;
