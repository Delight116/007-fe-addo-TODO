import AppDispatcher from './../appDispatcher';
import BaseStore from './../BaseStore';
import {Map} from 'immutable';

class UserStore extends BaseStore {
  constructor(){
    super();
    this.cur_user = Map({})
  }

  UserIn(data){
    let user = Map({
      id: data.user_id.toString(),
      _id: data._id,
      _fresh: data._fresh
    })

    this.cur_user =  this.cur_user.set(user.get('id'), user)
  }
  getUserLoged(){
    return this.cur_user;
  }
  UserOut(id){
    this.cur_user = this.cur_user.remove(id.toString())
  }
}

let instanceUser = new UserStore();

instanceUser.dispatchTocken = AppDispatcher.register((action)=> {
  switch (action.eventName) {
    case 'login':
      instanceUser.UserIn(action.data);
      instanceUser.emit(action.eventName);
      return false;
    case 'logout':
        instanceUser.UserOut(action.data);
        instanceUser.emit(action.eventName);
        return false;
    default:
      return false;
  }
});

export default instanceUser;
