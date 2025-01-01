import UserModel from "../model/user-model.js";
import login from "../service/user-service.js";

document.querySelector('#btn').addEventListener('click',getUserDetails);

function getUserDetails(){
  const email=document.querySelector('#userEmail').value;
  const password=document.querySelector('#userPassword').value;
  const user=new UserModel(email,password);
  login(user);
}