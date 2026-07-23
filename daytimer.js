let task=JSON.parse(localStorage.getItem("currentTask"));
let day=localStorage.getItem("selectedDay");

document.getElementById("taskName").innerText=task.name+" 🎀";
document.getElementById("dayText").innerText=`Day ${day} • Target: ${task.time} Hours`;

let notesBox=document.getElementById("notes");

let savedNotes=JSON.parse(localStorage.getItem("dayNotes"))||{};
let noteKey=task.name+"_day_"+day;

if(savedNotes[noteKey]){
    notesBox.value=savedNotes[noteKey];
}

let duration=Number(task.time)*60*60;
let remainingTime=duration;
let interval=null;
let isRunning=false;

const timer=document.getElementById("timer");
const status=document.getElementById("statusText");

displayTime();
loadState();

function displayTime(){
    let hrs=Math.floor(remainingTime/3600);
    let mins=Math.floor((remainingTime%3600)/60);
    let secs=remainingTime%60;

    timer.innerText=
    `${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

function saveState(){
    localStorage.setItem("timerState",JSON.stringify({
        taskName:task.name,
        day:day,
        remainingTime:remainingTime,
        isRunning:isRunning,
        lastSaved:Date.now()
    }));
}

function loadState(){

    let data=JSON.parse(localStorage.getItem("timerState"));

    if(!data) return;

    if(data.taskName!==task.name||data.day!=day) return;

    remainingTime=data.remainingTime;
    isRunning=data.isRunning;

    if(isRunning){

        let passed=Math.floor((Date.now()-data.lastSaved)/1000);

        remainingTime-=passed;

        if(remainingTime<=0){

            remainingTime=0;
            isRunning=false;
            displayTime();
            status.innerText="🎉 Timer Finished! Click Finish Day.";

        }else{

            displayTime();
            startTimer(true);

        }

    }else{

        displayTime();

    }

}

function startTimer(resume=false){

    if(isRunning&&!resume) return;

    isRunning=true;

    status.innerText="📚 Stay Focused!";

    saveState();

    interval=setInterval(()=>{

        remainingTime--;

        displayTime();

        saveState();

        if(remainingTime<=0){

            clearInterval(interval);

            remainingTime=0;

            isRunning=false;

            displayTime();

            saveState();

            status.innerText="🎉 Time's Up! Click Finish Day.";

            alert("🎉 Congratulations! You finished today's study session.");

        }

    },1000);

}

function pauseTimer(){

    if(!isRunning) return;

    clearInterval(interval);

    isRunning=false;

    status.innerText="⏸ Paused";

    saveState();

}

function resetTimer(){

    clearInterval(interval);

    isRunning=false;

    remainingTime=duration;

    status.innerText="";

    displayTime();

    saveState();

}

function saveNotes(){

    savedNotes[noteKey]=notesBox.value;

    localStorage.setItem("dayNotes",JSON.stringify(savedNotes));

    alert("💖 Notes Saved Successfully!");

}

function finishDay(){

    let completed=JSON.parse(localStorage.getItem("completedDays"))||{};

    if(!completed[task.name]){
        completed[task.name]=[];
    }

    if(!completed[task.name].includes(day)){
        completed[task.name].push(day);
    }

    localStorage.setItem("completedDays",JSON.stringify(completed));

    clearInterval(interval);

    isRunning=false;

    localStorage.removeItem("timerState");

    alert("🎉 Great Job! Day Completed Successfully!");

    window.location.href="taskDays.html";

}