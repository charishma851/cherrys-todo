function loadDashboardStats(){

    let goals=JSON.parse(localStorage.getItem("goals"))||[];

    document.getElementById("goalCount").innerText=goals.length;

    let completed=JSON.parse(localStorage.getItem("completedDays"))||{};

    let totalCompleted=0;

    for(let goal in completed){
        totalCompleted+=completed[goal].length;
    }

    document.getElementById("completedDays").innerText=totalCompleted;

    let totalHours=0;

    goals.forEach(goal=>{

        let done=completed[goal.name]?completed[goal.name].length:0;

        totalHours+=done*Number(goal.time);

    });

    document.getElementById("studyHours").innerText=totalHours;

    document.getElementById("streakCount").innerText=calculateStreak();

}

function calculateStreak(){

    let completed=JSON.parse(localStorage.getItem("completedDays"))||{};

    let total=0;

    for(let goal in completed){
        total+=completed[goal].length;
    }

    return total;
}

document.addEventListener("DOMContentLoaded",loadDashboardStats);