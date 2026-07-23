let diaryInput = document.getElementById("diaryText");
let dateInput = document.getElementById("dateInput");
let entriesList = document.getElementById("entriesList");

let diaryData = JSON.parse(localStorage.getItem("diary")) || {};

window.onload = () => {
  let today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
  loadEntries();
  loadToday();
};

function saveDiary(){
  let date = dateInput.value;
  let text = diaryInput.value.trim();

  if(text === ""){
    alert("Write something sweetie 🥺💗");
    return;
  }

  diaryData[date] = text;
  localStorage.setItem("diary", JSON.stringify(diaryData));

  loadEntries();
  alert("Saved successfully 💖");
}

function clearDiary(){
  diaryInput.value = "";
}

function loadEntries(){
  entriesList.innerHTML = "";
  Object.keys(diaryData).forEach(date => {
    let li = document.createElement("li");
    li.innerHTML = `📅 ${date}`;
    li.onclick = () => loadEntry(date);
    entriesList.appendChild(li);
  });
}

function loadEntry(date){
  dateInput.value = date;
  diaryInput.value = diaryData[date];
}

function loadToday(){
  let today = dateInput.value;
  if(diaryData[today]){
    diaryInput.value = diaryData[today];
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