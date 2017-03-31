import AppDispatcher from './../appDispatcher';

class TaskAction {
  getTask(data){
    AppDispatcher.dispatch({
      eventName: 'get-task',
      data: data
    })
  }
  getTasks(list){
    AppDispatcher.dispatch({
      eventName: 'task-list',
      data: list
    })
  }
  getTasksToday(list){
    AppDispatcher.dispatch({
      eventName: 'task-list-today',
      data: list
    })
  }
  getArchiveTasks(list){
    AppDispatcher.dispatch({
      eventName: 'task-archive',
      data: list
    })
  }
  removeTask(id) {
    AppDispatcher.dispatch({
      eventName: 'remove-task',
      data: id
    });
  }

  updateTask(data) {
    AppDispatcher.dispatch({
      eventName: 'update-task',
      data: data
    });
  }
}

export default new TaskAction();
