import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {ButtonToolbar, Dropdown, MenuItem} from 'react-bootstrap';
import ProjectApi from './../../projects/ProjectApi';
import ProjectStore from './../../projects/ProjectStore';

import AddForm from './../forms/formProject';
class Projects extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      projects: this.context.projects,
      isDelete: null,
      isUpdate: null,
      fDelete: this.context.fDelete,
      toUpdate: false,
      item: {}
    }
    this.CH = this.CH.bind(this)
  }
  CH(){
    this.setState({
      toUpdate: false
    })
  }
  DeleteProject(id){

    this.setState({
      projects:   this.state.fDelete.call(this,id)
    })
  }
  render(){
    let proj = this.state.projects.map((item)=>{
      let id = item.id;
      return(
        <div key={"Project_"+id} className="project">
          <a href={"#/project/:"+id}>
            <span className="marks fa fa-star" style={{color:item.color}} aria-hidden="true"></span>
          <span className="projectName">{item.name}</span>
        <span className="countProject">{item.count}</span>
          </a>
          <ButtonToolbar>
             <Dropdown id="dropdown">
               <Dropdown.Toggle noCaret={true} >
                 <span className="fa fa-ellipsis-v" style={{'color':item.color}} aria-hidden="true"></span>
               </Dropdown.Toggle>
               <Dropdown.Menu className="super-colors">
                  <MenuItem eventKey="1" className="fa fa-pencil" aria-hidden="true" onClick={()=>{
                    this.setState({
                      item: item,
                      toUpdate: true
                    })
                    }

                    }>Update</MenuItem>
                <MenuItem eventKey="2" className="fa fa-trash" aria-hidden="true" onClick={()=>{
                    this.DeleteProject(id)
                    this.setState({
                      isDelete: id,
                    })

                    console.log("Deleted", id);
                  }
                }>Delete</MenuItem>
               </Dropdown.Menu>
             </Dropdown>
           </ButtonToolbar>

        </div>

      )
    })
    return(
      <div className="projects">
        <h3 className="title">Проекти</h3>
        {proj}
        <AddForm toUpdate={this.state.toUpdate} closes={this.CH} data={this.state.item}/>
      </div>
    )
  }
}
Projects.contextTypes = {
  projects: React.PropTypes.array,
  fDelete: React.PropTypes.func,
}

export default Projects;
