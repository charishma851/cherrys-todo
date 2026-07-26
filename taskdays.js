let taskTitle = document.getElementById("taskTitle");
let taskInfo = document.getElementById("taskInfo");
let daysList = document.getElementById("daysList");

let task = JSON.parse(localStorage.getItem("currentTask"));

let days = [];

window.onload = () => {
  if(task){
    taskTitle.innerText = task.name + " 🎀";
    taskInfo.innerText = `Duration: ${task.days} Days • Daily Target: ${task.time} Hours`;

    loadDays();
  }
};

function loadDays(){
  daysList.innerHTML = "";

  let completed = JSON.parse(localStorage.getItem("completedDays")) || {};
  let done = completed[task.name] || [];

  for(let i = 1; i <= task.days; i++){
    
    let div = document.createElement("div");
    div.className = "dayCard";

    let isDone = done.includes(String(i)) || done.includes(i);

    div.innerHTML = `
      Day ${i} ${isDone ? "✔️" : ""}
    `;

    if(isDone){
      div.classList.add("completedDay");
    }

    div.onclick = () => openDay(i);
    daysList.appendChild(div);
  }
}

// later this will go to timer page
function openDay(day){
  localStorage.setItem("selectedDay", day);
  window.location.href = "daytimer.html";
}
