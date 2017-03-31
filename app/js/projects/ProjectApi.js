import ProjectAction from "./ProjectAction";
import axios from "axios";
  const config = {
    headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true
    },
    withCredentials: true,
  }

  class ProjectApi {

    getProject(id) {
      axios.get('http://127.0.0.1:5000/project/'+id ,config)
      .then(function(response) {
        ProjectAction.getTask(response.data);
      })
      .catch(function(response) {
        alert(response.data)
      })
    }

    getProjects() {
      axios.get('http://127.0.0.1:5000/projects')
      .then(function(response) {
        ProjectAction.getProjects(response.data);
      });
    }

    setProject(data){
      axios.post('http://127.0.0.1:5000/project/',data, config)
      .then(function(response) {
        console.log("Add", response.data);
      });
    }

    updateProject(item) {
      let now = formatDate(new Date(item.date));
      axios.put('http://127.0.0.1:5000/project/'+item.id,{
        id: item.id,
        name: item.name,
        color: item.color,
        to_user: +item.to_user.id,
      }, config)
      .then(function(response) {
        ProjectAction.updateProject(response.data)
      });
    }

    removeProject(id) {
      axios.delete('http://127.0.0.1:5000/project/'+id, config)
      .then(function(response) {
        ProjectAction.removeProject(id)
        
      })

    }

  }

  export default new ProjectApi();
