function toggleTheme() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");

        if(btn){
            btn.innerHTML = "☀️";
        }

    } else {
        localStorage.setItem("theme", "light");

        if(btn){
            btn.innerHTML = "🌙";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("themeBtn");

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");

        if(btn){
            btn.innerHTML = "☀️";
        }
    }

});