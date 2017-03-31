import AppDispatcher from './../appDispatcher';
import BaseStore from './../BaseStore';

class ProjectStore extends BaseStore {
  constructor() {
    super();
    this.list = []
  }
  clone(data){
    data.map((item, index)=>{
        this.list[index] = item;
    })
  }
  setProjectList(data){
    const temp = new Array();
    data.forEach((item)=> {
      let proj = {
        id: item.id,
        name:item.name,
        color: item.color,
        to_user: item.to_user,
        count: item.count
      };
        temp.push(proj);
    })
    this.clone(temp)
  }
  setProject(data){
    console.log("SP", data);
    console.log("SP", this.list);

    this.list.push(data);
    console.log("SP after", this.list);

  }
  getProjectList() {
    return this.list;
  }
  // {"name":"SomeS","text":"lorem ipsum dolor amet lirick treasure Go","date":"2017-03-30","status": 0,"priority": 1,"to_project_id": 1 ,"to_user_id":2}
  removeProject(id) {
    console.log("ID to delete",id);
    this.list = this.list.filter((item)=>{
        if(item.id == id){
          console.log("Delete item", id, "DELETEEEEE");
        }else{
          return item;
        }
    });
  }

  updateProject(data) {
    this.list = this.list.filter((item)=>{
        if(item.id == data.id){
          item = data;
        }
          return item;

    });
  }

}

let instanseProjectStore = new ProjectStore();

instanseProjectStore.dispatchTocken = AppDispatcher.register((action)=> {
  switch (action.eventName) {
    case 'get-project':
      console.log("In ", action.eventName);
      console.log("DATA", action.data);
      instanseProjectStore.setProjectList(action.data);
      instanseProjectStore.emit(action.eventName);
      return false;
    case 'project-list':
      console.log("In ", action.eventName);
      console.log("DATA", action.data);
      instanseProjectStore.setProjectList(action.data);
      instanseProjectStore.emit(action.eventName);
      return false;
    case 'remove-project':
      console.log("In ", action.eventName);
      console.log("DATA", action.data);
      instanseProjectStore.removeProject(action.data);
      instanseProjectStore.emit(action.eventName);
      return false;
    case 'update-project':
      console.log("In ", action.eventName);
      console.log("DATA", action.data);
      instanseProjectStore.updateProject(action.data);
      instanseProjectStore.emit(action.eventName, action.data);
      return false;
    default:
      return false;
  }
});

export default instanseProjectStore;
