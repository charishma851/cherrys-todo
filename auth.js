function logout(){
  localStorage.removeItem("loggedIn");
  alert("Logged out successfully 💗");
  window.location.href = "index.html";   // or login.html if that's your file
}

if(localStorage.getItem("loggedIn") !== "true"){
  window.location.href = "index.html";   // send back to login
}
