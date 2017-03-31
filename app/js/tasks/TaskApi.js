import TaskAction from "./TaskAction";
import axios from "axios";
import {formatDate, getCookie} from './../components/methods/methods';
import config from './../components/methods/config';
//
// const config = {
//     headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials':true
//     },
//     withCredentials: true,
//   }
//

class TaskApi {
  constructor(){
    this.page = 1;
    this.onPage = 15;
  }

  setPage(page){
    this.page = page;
  }
  getPage(){
    return this.page;
  }
  setOnPage(elem){
    this.onPage = elem;
  }
  getOnPage(elem){
    return this.onPage;
  }

  getTask(id) {
    axios.get('http://127.0.0.1:5000/tasks'+id ,config)
    .then(function(response) {
      TaskAction.getTask(response.data);
    });
  }

  getTasks() {
    axios.get('http://127.0.0.1:5000/tasks/next/7',{params:{
      page: this.getPage(),
      onPage: this.getOnPage()
    }})
    .then(function(response) {
      TaskAction.getTasks(response.data);
    });
  }

  getTasksToday() {
    axios.get('http://127.0.0.1:5000/tasks/today',{params:{
      page: this.getPage(),
      onPage: this.getOnPage()
    }})
    .then(function(response) {
      TaskAction.getTasks(response.data);
    });
  }

  getArchiveTasks() {
    axios.get('http://127.0.0.1:5000/tasks/archive',{params:{
      page: this.getPage()
    }})
    .then(function(response) {
      TaskAction.getArchiveTasks(response.data);
    });
  }

  updateTask(item) {
    let now = formatDate(new Date(item.date));
    console.log("Status", item.status);
    axios.put('http://127.0.0.1:5000/task/'+item.id,{
      id: item.id,
      name:item.name,
      text: item.text,
      date: now,
      status: +item.status,
      priority: +item.priority,
      to_project: +item.to_project.id,
      to_user: +item.to_user.id

    })
    .then(function(response) {
      TaskAction.updateTask(response.data)
      console.log("Api", response.data);
    });
  }

  removeTask(id) {
    axios.delete('http://127.0.0.1:5000/task/'+id)
    .then(function(response) {
      TaskAction.removeTask(id)
    });
  }
}

export default new TaskApi();
