import AppDispatcher from './../appDispatcher';
import BaseStore from './../BaseStore';
import {Map} from 'immutable';


class TaskStore extends BaseStore {
  constructor(){
    super();
    this.list = [];
    this.count = [];
    this.status = false;
  }

  setTaskList(data){
    const temp = new Array();
    data.data.forEach((item)=>{
      let task = {
        id: item.id,
        name:item.name,
        text: item.text,
        date: new Date(item.date),
        status: item.status,
        priority: item.priority,
        to_project: item.to_project,
        to_user: item.to_user
      };
        temp.push(task);
    })
    this.clone(temp)
    this.count.push(data.pageCount);
  }
  clone(data){
    data.map((item, index)=>{
        this.list[index] = item;
    })
  }
  getTaskList() {
    return this.list;
  }
  getCount(){
    return this.count;
  }
  setStatus(stat = false){
    this.status = stat;
  }
  removeTask(id) {
    this.list = this.list.filter((item)=>{
        if(item.id == id){
          console.log("Delete item", id);
        }else{
          return item;
        }
    });
  }

  updateTask(data) {

    this.list = this.list.filter((item)=>{
        if(item.id == data.id){
          item = data;
        }
        return item;

    });
    if(this.status){
      this.removeTask(data.id)
      this.setStatus()
    }
  }

}

let instanseTaskStore = new TaskStore();

instanseTaskStore.dispatchTocken = AppDispatcher.register((action)=> {
  switch (action.eventName) {
    case 'get-task':
      console.log(action.eventName, action.data);
      instanseTaskStore.setTaskList(action.data);
      instanseTaskStore.emit(action.eventName);
      return false;
    case 'task-list':
      console.log(action.eventName, action.data);
      instanseTaskStore.setTaskList(action.data);
      instanseTaskStore.emit(action.eventName, action.data);
      return false;
    case 'task-list-today':
      console.log(action.eventName, action.data);
      instanseTaskStore.setTaskList(action.data);
      instanseTaskStore.emit(action.eventName, action.data);
      return false;
    case 'task-archive':
      console.log(action.eventName, action.data);
      instanseTaskStore.setTaskList(action.data);
      instanseTaskStore.emit(action.eventName);
      return false;
    case 'remove-task':
      console.log(action.eventName, action.data);
      instanseTaskStore.removeTask(action.data);
      instanseTaskStore.emit(action.eventName);
      return false;
    case 'update-task':
      console.log(action.eventName, action.data);
      instanseTaskStore.updateTask(action.data);
      instanseTaskStore.emit(action.eventName, action.data);
      return false;
    default:
      return false;
  }
});

export default instanseTaskStore;
