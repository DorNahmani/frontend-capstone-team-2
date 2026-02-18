let savedName = localStorage.getItem("playerName");
const welcomeElement = document.getElementById("welcomeMsg");

if (savedName) { 
    welcomeElement.innerText = "שלום " + savedName + "!"; 
} else {
    window.location.href = "../station1/station1.html";
}
let statusnum = localStorage.getItem("status")
if (statusnum != 2 ) {
    window.location.href = "../station" + statusnum + "/station" + statusnum + ".html";
}


const music = document.getElementById("bgMusic");
const roarSound = new Audio('mixkit-angry-dragon-growl-309.wav'); 
const clickSound = new Audio('magic_click.mp3.wav'); 
const dragonImg = document.getElementById("dragonImg");
const colors = ["white", "blue", "red", "green"];

function ensureMusicPlays() {
    if (music && music.paused) {
        music.play().catch(err => {});
    }
}

window.addEventListener("load", () => {
    ensureMusicPlays();
});

function changeColor(id) {
    ensureMusicPlays();

    if (clickSound) {
        clickSound.currentTime = 0; 
        clickSound.play().catch(e => {});
    }

    const crystal = document.getElementById(id);
    let currentColor = crystal.style.backgroundColor || "white";
    let nextIndex = (colors.indexOf(currentColor) + 1) % colors.length;
    let newColor = colors[nextIndex];
    
    crystal.style.backgroundColor = newColor;
    crystal.style.boxShadow = "0 0 20px " + newColor; 
}

document.getElementById("checkBtn").addEventListener("click", function() {
    ensureMusicPlays();

    const left = document.getElementById("crystalL").style.backgroundColor;
    const middle = document.getElementById("crystalM").style.backgroundColor;
    const right = document.getElementById("crystalR").style.backgroundColor;

    if (left === "blue" && middle === "green" && right === "green") {
        alert("הקריסטלים מאירים! השער נפתח.");
        localStorage.setItem("status", 3);
        window.location.href = "../station3/station3.html"; 
    } else {
        roarSound.currentTime = 0;
        roarSound.play().catch(e => {});
        
        dragonImg.src = "dragon_awake.png";
        dragonImg.classList.add("shake");

        alert("זהירות! השילוב לא נכון. הדרקון התעורר והוא עצבני!");

        setTimeout(function() {
            dragonImg.src = "dragon_sleep.png";
            dragonImg.classList.remove("shake");
        }, 3000);
    }
});