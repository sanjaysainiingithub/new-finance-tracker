function isLogin(){
  if(!localStorage.user){
    location.href='login.html';
  }
}
export default isLogin;
