import AppDispatcher from './../appDispatcher';

class ProjectAction {
  getProject(data){
    AppDispatcher.dispatch({
      eventName: 'get-project',
      data: data
    })
  }
  getProjects(list){
    AppDispatcher.dispatch({
      eventName: 'project-list',
      data: list
    })
  }

  removeProject(id) {
    AppDispatcher.dispatch({
      eventName: 'remove-project',
      data: id
    });
  }

  updateProject(data) {
    AppDispatcher.dispatch({
      eventName: 'update-project',
      data: data
    });
  }
}

export default new ProjectAction();
