import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, Link, Redirect} from 'react-router';
import axios from "axios";

import UserStore from './user_login/userStore';
import UserApi from './user_login/userApi';

import TaskStore from './tasks/TaskStore';
import TaskApi from './tasks/TaskApi';

import ProjectStore from './projects/ProjectStore';
import ProjectApi from './projects/ProjectApi';

import Task from './components/task/task';
import Project from './components/projects/project';
import Modals from './components/modals/modal';

import AddForm from './components/forms/formTask';
import Header from './components/header/header';

class User extends React.Component{
  constructor(props,context){
    super(props, context)
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      // tasks: TaskStore.getTaskList(),
      count: TaskStore.getCount(),
      projects: ProjectStore.getProjectList(),
      is_loged: false,
      params: this.props.params,
      reload: false,
      task:[],
      pages: parseInt(window.location.hash.split('/')[window.location.hash.split('/').length-1]),
      logedUser: UserStore.getUserLoged(),
      next: false,
      archive: false
    };

    this.onGetProject = this.onGetProject.bind(this);
    this.UserLoged = this.UserLoged.bind(this);
    this.GetPage = this.GetPage.bind(this);
    this.DeleteProject = this.DeleteProject.bind(this);
    this.Sets = this.Sets.bind(this)
  }

  getChildContext() {
   return {
     params: this.state.params,
     pages: this.state.count[0],
     projects: this.state.projects,
     params: this.props.params,
     fDelete: this.DeleteProject.bind(this),
     next: this.state.next,
     archive: this.state.archive,
   }
  }
  DeleteProject(id){
    ProjectApi.removeProject(id);
    return ProjectStore.getProjectList();
  }
  componentDidMount() {

    ProjectStore.addEventListener('project-list', this.onGetProject);
    ProjectStore.addEventListener('remove-project', this.onGetProject);
    ProjectStore.addEventListener('update-project', this.onGetProject);
    ProjectApi.getProjects();


    UserStore.addEventListener('login', this.UserLoged);
    UserApi.logIn();
  }

  componentWillUnmount() {

    ProjectStore.removeEventListener('project-list', this.onGetProject);
    ProjectStore.removeEventListener('remove-project', this.onGetProject);
    ProjectStore.removeEventListener('update-project', this.onGetProject);

    UserStore.removeEventListener('login', this.UserLoged);

  }
  UserLoged(){
    this.setState({
      logedUser: UserStore.getUserLoged(),
    })
  }
  onGetProject(){
    this.setState({
      projects: ProjectStore.getProjectList()
    });
  }
  GetPage(){

    this.setState({
      page: this.props.params.page
    })
  }
  Sets(){
    this.setState({
      next: true
    })
  }
  render(){
    console.log("Count ", this.state.count[0]);
    return(
        <div>
          <Header />
          <div className="main-container">
            <div className="container">
              <div className="row">
                <div className="sidebar --left col-lg-3">
                  <div className="control-panel">
                    <a href="#/tasks/today" >Сегодня</a>
                    <a href="#/tasks/7" onClick={()=>{this.setState({
                        next: true
                      })}}>Следующие 7 дней</a>
                  </div>

                  <Project />
                  {/* <AddButton /> */}
                </div>
                <div className="mainContent col-lg-6">
                  {this.props.children}

                </div>
              </div>
            </div>
          </div>
        </div>


    )
  }
}

App.childContextTypes = {
  pages: React.PropTypes.number,
  params: React.PropTypes.object,
  projects: React.PropTypes.array,
  params: React.PropTypes.object,
  deleteTask: React.PropTypes.func,
  fDelete: React.PropTypes.func,
  next: React.PropTypes.bool,
  archive: React.PropTypes.bool,

}

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Task} />
      <Route path="/tasks/today/:page"  component={Task} />
      <Route path="/tasks/next/:page"  component={Task} />
      <Route path="/tasks/:page"  component={Task} />
      <Route path="*" >
        <Redirect to="/" />
      </Route>

    </Route>
  </Router>
)

ReactDOM.render(
  router,
  document.getElementById('app')
);
