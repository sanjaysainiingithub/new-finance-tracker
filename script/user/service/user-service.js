function login(user){
  if(!localStorage.user){
    localStorage.user=JSON.stringify(user);
    location.href='index.html';
  }
}
export default login;