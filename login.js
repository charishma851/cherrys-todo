// Show signup form
function showSignup(){
  document.querySelector(".container").classList.add("hidden");
  document.getElementById("signupBox").classList.remove("hidden");
}

// Hide signup
function hideSignup(){
  document.getElementById("signupBox").classList.add("hidden");
  document.querySelector(".container").classList.remove("hidden");
}

// Signup
function createUser(){
  let user = document.getElementById("newUser").value;
  let pass = document.getElementById("newPass").value;

  if(user === "" || pass === ""){
    alert("Fill everything cutie 🥺");
    return;
  }

  localStorage.setItem("appUser", JSON.stringify({user,pass}));
  alert("Account created successfully 💗");
  hideSignup();
}

// Login
function loginUser(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let saved = JSON.parse(localStorage.getItem("appUser"));

  if(!saved){
    alert("No account found! Please sign up 💖");
    return;
  }

  if(username === saved.user && password === saved.pass){
    alert("Login Successful 🎀");
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  }
  else{
    alert("Wrong username or password 😭");
  }
}

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }
});

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}