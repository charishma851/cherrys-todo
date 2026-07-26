let popup = document.getElementById("popup");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("goals")) || [];

let editName = null;

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// ---------------- POPUP ----------------

function openPopup() {
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";

    document.getElementById("taskName").value = "";
    document.getElementById("taskDays").value = "";
    document.getElementById("taskTime").value = "";

    editName = null;
}

// ---------------- LOCAL STORAGE ----------------

function saveTasks() {
    localStorage.setItem("goals", JSON.stringify(tasks));
}

// ---------------- SAVE GOAL ----------------

function saveTask() {

    let name = document.getElementById("taskName").value.trim();
    let days = document.getElementById("taskDays").value;
    let time = document.getElementById("taskTime").value;

    if (name === "" || days === "" || time === "") {
        alert("Please fill all fields 🌸");
        return;
    }

    if (editName) {

        let index = tasks.findIndex(t => t.name === editName);

        if (index !== -1) {
            tasks[index] = {
                name,
                days,
                time
            };
        }

    } else {

        // prevent duplicate names
        if (tasks.some(t => t.name === name)) {
            alert("A goal with this name already exists 🌸");
            return;
        }

        tasks.push({
            name,
            days,
            time
        });
    }

    saveTasks();

    taskList.innerHTML = "";
    loadTasks();

    closePopup();
}

// ---------------- LOAD GOALS ----------------

function loadTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {
        createCard(task.name, task.days, task.time);
    });

}

// ---------------- CREATE CARD ----------------

function createCard(name, days, time) {

    let div = document.createElement("div");
    div.className = "taskCard";

    let completed = JSON.parse(localStorage.getItem("completedDays")) || {};

    let done = completed[name] ? completed[name].length : 0;

    let percent = Math.floor((done / days) * 100);

    if (percent > 100) percent = 100;

    div.innerHTML = `

        <h3>${name} 🎯</h3>

        <p>📅 Duration : ${days} Days</p>

        <p>⏰ Daily Target : ${time} Hours</p>

        <div class="progress">
            <div class="progressFill" style="width:${percent}%"></div>
        </div>

        <p>${percent}% Completed 💗</p>

        <div class="taskBtns">

            <button onclick="editTask('${name}')">
                ✏️ Edit
            </button>

            <button onclick="deleteTask('${name}')">
                🗑️ Delete
            </button>

        </div>

    `;

    div.onclick = function (e) {

        if (e.target.tagName === "BUTTON")
            return;

        openTask(name, days, time);

    };

    taskList.appendChild(div);

}

// ---------------- DELETE ----------------

function deleteTask(name) {

    if (!confirm("Delete this goal?")) return;

    tasks = tasks.filter(task => task.name !== name);

    saveTasks();

    let completed = JSON.parse(localStorage.getItem("completedDays")) || {};

    delete completed[name];

    localStorage.setItem(
        "completedDays",
        JSON.stringify(completed)
    );

    loadTasks();

}

// ---------------- EDIT ----------------

function editTask(name) {

    let task = tasks.find(t => t.name === name);

    if (!task) return;

    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDays").value = task.days;
    document.getElementById("taskTime").value = task.time;

    editName = name;

    openPopup();

}

// ---------------- OPEN GOAL ----------------

function openTask(name, days, time) {

    localStorage.setItem(
        "currentTask",
        JSON.stringify({
            name,
            days,
            time
        })
    );

    window.location.href = "taskdays.html";

}