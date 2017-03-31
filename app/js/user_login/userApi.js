import UserAction from './action';
import axios from 'axios';

class UserApi {

  logIn(){
    axios.post('http://127.0.0.1:5000/login',{
      name: "Mike",
      password: "123m321"
    })
    .then(function (response) {
      console.log(response.data);
      let cook = response.data;
      document.cookie = "_fresh="+cook._fresh;
      document.cookie =  "_id="+cook._id;
      document.cookie = "user_id="+cook.user_id;
      UserAction.logIn(response.data)
    })
    .catch(function (error) {
      console.log("error",error);
    });
  }
  logOut(id){
    axios.get('http://127.0.0.1:5000/logout')
    .then(function(response) {
      UserAction.logOut(id)
    })

  }
}

export default new UserApi();
