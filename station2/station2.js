let savedName = localStorage.getItem("playerName");
const welcomeElement = document.getElementById("welcomeMsg");
// --- הגדרת אלמנטים ---
const music = document.getElementById("bgMusic");
const roarSound = new Audio('mixkit-angry-dragon-growl-309.wav'); 
const clickSound = new Audio('magic_click.mp3.wav'); 
const dragonImg = document.getElementById("dragonImg");
const colors = ["white", "blue", "red", "green"];

// --- פונקציה להפעלת מוזיקת הרקע ---
function ensureMusicPlays() {
    if (music && music.paused) {
        music.play().catch(err => console.log("מחכה לאינטראקציה ראשונה לנגינת מוזיקה..."));
    }
}

// ניסיון ראשון בטעינת הדף
window.addEventListener("load", () => {
    ensureMusicPlays();
});

// --- ניהול שם שחקן וסטטוס ---
let savedName = localStorage.getItem("playerName");
const welcomeElement = document.getElementById("welcomeMsg");
if (savedName) { 
    welcomeElement.innerText = "שלום " + savedName + "!"; 
} else {
    window.location.href = "../station1/station1.html";
}

if (savedName) { 
    welcomeElement.innerText = "שלום " + savedName + "!"; 
} else {
    window.location.href = "../station1/station1.html";
}

// בדיקת סטטוס מושבתת לצורך עבודה חלקה על הפרויקט
/*
let statusGame = localStorage.getItem("status");
if(statusGame != 2) {
    window.location.href = "../station"+statusGame+"/station"+statusGame+".html";
}
*/

const roarSound = new Audio('mixkit-angry-dragon-growl-309.wav'); 
const clickSound = new Audio('magic_click.mp3.wav'); 

const colors = ["white", "blue", "red", "green"];
const dragonImg = document.getElementById("dragonImg");
    window.location.href = "../station" + statusGame + "/station" + statusGame + ".html";
}

// --- פונקציית שינוי צבע ---
function changeColor(id) {
    if (clickSound) {
        clickSound.currentTime = 0; 
        clickSound.play().catch(e => console.log("Sound blocked"));
    }
    // וידוא שהמוזיקה מתחילה ברגע שנוגעים בקריסטל הראשון
    ensureMusicPlays();

    clickSound.currentTime = 0; 
    clickSound.play().catch(e => console.log("צליל קליק נחסם"));

    const crystal = document.getElementById(id);
    let currentColor = crystal.style.backgroundColor;
    let nextIndex = (colors.indexOf(currentColor) + 1) % colors.length;
    let newColor = colors[nextIndex];
    
    crystal.style.backgroundColor = newColor;
    crystal.style.boxShadow = "0 0 20px " + newColor; 
}

// --- בדיקת שילוב ---
document.getElementById("checkBtn").addEventListener("click", function() {
    const left = document.getElementById("crystalL").style.backgroundColor;
    const middle = document.getElementById("crystalM").style.backgroundColor;
    const right = document.getElementById("crystalR").style.backgroundColor;

    // בדיקת השילוב הנכון (ירוק, ירוק, כחול)
    if (left === "green" && middle === "green" && right === "blue") {
        alert("הקריסטלים מאירים! השער נפתח.");
        
        // עדכון סטטוס ומעבר מיידי לתחנה הבאה
        localStorage.setItem("status", 3);
        window.location.href = "../station3/station3.html"; 
    } else {
        // צליל הדרקון ואנימציה בטעות
        roarSound.currentTime = 0;
        roarSound.play().catch(e => console.error("Sound blocked"));
        roarSound.play().catch(e => console.error("שאגת הדרקון נחסמה"));
        
        dragonImg.src = "dragon_awake.png";
        dragonImg.classList.add("shake");

        alert("זהירות! השילוב לא נכון. הדרקון התעורר והוא עצבני!");

        setTimeout(function() {
            dragonImg.src = "dragon_sleep.png";
            dragonImg.classList.remove("shake");
        }, 3000);
    }
});