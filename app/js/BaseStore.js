import AppDispatcher from './appDispatcher';
import EventEmiter from "events";

class BaseStore extends EventEmiter{
  constructor(){
    super();
  }
  addEventListener(event, callback) {
    this.on(event, callback);
  }

  removeEventListener(event, callback) {
    this.removeListener(event, callback);
  }
}


export default BaseStore;
