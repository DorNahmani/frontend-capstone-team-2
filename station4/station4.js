// --- הגדרת אלמנטים ---
const music = document.getElementById("bgMusic");
const catchSound = document.getElementById("catchSound");
const loseSound = document.getElementById("loseSound");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");

let savedName = localStorage.getItem("playerName");
if (savedName) { 
    document.getElementById("welcomeMsg").innerText = "שלום " + savedName + "!"; 
}

// עדכון סטטוס לתחנה הנוכחית
localStorage.setItem("status", 4);

let caughtGhosts = 0;
let timeForCurrentGhost = 5; 
let gameActive = false;
let countdownInterval; 

// --- פונקציה להפעלת מוזיקת הרקע ---
function ensureMusicPlays() {
    if (music && music.paused) {
        music.play().catch(err => console.log("מוזיקה מחכה לאינטראקציה..."));
    }
}

// ניסיון הפעלה בטעינה (יעבוד אם עברת מתחנה 3)
window.addEventListener("load", ensureMusicPlays);

function startGame() {
    // הפעלת מוזיקה ברגע הלחיצה על כפתור ההתחלה
    ensureMusicPlays();

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-stats").style.display = "block";
    document.getElementById("ui-container").style.backgroundColor = "rgba(22, 22, 45, 0.4)";
    gameActive = true;
    spawnGhost();
}

function moveGhost(ghostElement) {
    if (!gameActive || !ghostElement) return;
    const maxX = window.innerWidth - 110; 
    const maxY = window.innerHeight - 110;
    ghostElement.style.left = Math.floor(Math.random() * Math.max(0, maxX)) + "px";
    ghostElement.style.top = Math.floor(Math.random() * Math.max(0, maxY)) + "px";
}

function startTimer() {
    clearInterval(countdownInterval); 
    timeForCurrentGhost = 5;
    timerDisplay.innerText = timeForCurrentGhost;

    countdownInterval = setInterval(() => {
        if (!gameActive) return;
        timeForCurrentGhost--;
        timerDisplay.innerText = timeForCurrentGhost;
        if (timeForCurrentGhost <= 0) {
            clearInterval(countdownInterval);
            gameOver();
        }
    }, 1000);
}

function spawnGhost() {
    if (!gameActive) return;

    const ghost = document.createElement("img");
    ghost.src = "ghost.png"; 
    ghost.className = "ghost";
    gameArea.appendChild(ghost);

    ghost.onload = () => {
        moveGhost(ghost);
        startTimer(); 
        const ghostMovement = setInterval(() => {
            if (ghost.parentElement) moveGhost(ghost);
            else clearInterval(ghostMovement);
        }, 800);

        ghost.onclick = function() {
            // מוודא שהמוזיקה ממשיכה לנגן
            ensureMusicPlays();

            if (catchSound) {
                catchSound.currentTime = 0; 
                catchSound.play();
            }
            caughtGhosts++;
            scoreDisplay.innerText = caughtGhosts;
            clearInterval(ghostMovement); 
            ghost.remove(); 
            if (caughtGhosts < 5) spawnGhost(); 
            else winStage();
        };
    };
}

function gameOver() {
    gameActive = false;
    clearInterval(countdownInterval);
    gameArea.innerHTML = "";

    if (loseSound) {
        loseSound.currentTime = 0;
        loseSound.play();
    }

    document.getElementById("ui-container").style.backgroundColor = "rgba(22, 22, 45, 0.9)";
    document.getElementById("game-stats").innerHTML = `
        <img src="loser ghost.png" class="loser-ghost-img">
        <br>
        <button class="start-btn" style="background-color: #e74c3c; color: white;" onclick="location.reload()">נכשלת! נסה שוב</button>
    `;
}

function winStage() {
    gameActive = false;
    clearInterval(countdownInterval);
    gameArea.innerHTML = "";
    document.getElementById("ui-container").style.backgroundColor = "rgba(22, 22, 45, 0.9)";
    document.getElementById("game-stats").innerHTML = "<h2 style='color: #2ecc71; font-size: 2rem;'>כל הכבוד! הצלחת ללכוד את כולן!</h2>";
    nextBtn.style.display = "inline-block"; 
    localStorage.setItem("status", 5);
}

function goToNextStation() {
    window.location.href = "../station5/station5.html"; 
}