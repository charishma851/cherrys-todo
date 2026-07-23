let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addTask();
    }
});


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
  tasks.forEach(text => createTask(text));
}

function addTask(){
  if(taskInput.value === ""){
      alert("Write something cutie 🥺");
      return;
  }

  let text = taskInput.value;
  tasks.push(text);
  saveTasks();

  createTask(text);
  taskInput.value = "";
}

function createTask(text){
  let li = document.createElement("li");

  li.innerHTML = `
      <span class="text">${text}</span>

      <div class="btns">
          <button class="done" onclick="markDone(this)">Done ✓</button>
          <button class="delete" onclick="deleteTask(this)">Delete ✖</button>
      </div>
  `;

  taskList.appendChild(li);
}

function markDone(button){
  let taskText = button.parentElement.parentElement.querySelector(".text");
  taskText.classList.toggle("completed");

  confettiHearts(button.parentElement.parentElement);
}

function deleteTask(button){
  let li = button.parentElement.parentElement;

  li.classList.add("remove");

  let text = li.querySelector(".text").innerText;
  tasks = tasks.filter(t => t !== text);
  saveTasks();

  setTimeout(()=> li.remove(), 300);
}


function confettiHearts(element){
  for(let i=0; i<8; i++){
    let heart = document.createElement("span");
    heart.innerHTML = "💖";
    heart.style.position="absolute";
    heart.style.fontSize="20px";
    heart.style.animation="float 1s linear forwards";
    heart.style.left=Math.random()*50 + "px";

    element.appendChild(heart);

    setTimeout(()=> heart.remove(),1000);
  }
}
