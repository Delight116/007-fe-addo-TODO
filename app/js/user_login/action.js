import AppDispatcher from './../appDispatcher';

class UserAction {

  logIn(item){
    AppDispatcher.dispatch({
      eventName: 'login',
      data: item
    });
  }
  logOut(id){
    AppDispatcher.dispatch({
      eventName: 'logout',
      data: id
    });
  }

}

export default new UserAction();
