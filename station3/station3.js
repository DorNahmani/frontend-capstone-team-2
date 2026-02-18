let savedName = localStorage.getItem("playerName");
const welcomeElement = document.getElementById("welcomeMsg");

if (savedName) { 
    welcomeElement.innerText = "שלום " + savedName + "!"; 
} else {
    window.location.href = "../station1/station1.html";
}
let statusnum = localStorage.getItem("status")
if (statusnum != 3 ) {
    window.location.href = "../station" + statusnum + "/station" + statusnum + ".html";
}

const music = document.getElementById("bgMusic");
const clinkSound = document.getElementById("clinkSound");

function ensureMusicPlays() {
    if (music && music.paused) {
        music.play().catch(err => console.log("מחכה לאינטראקציה לנגינת מוזיקה..."));
    }
}

window.addEventListener("load", () => {
    ensureMusicPlays();
});

document.addEventListener("click", ensureMusicPlays);



const correctIngredients = ["blue-mushroom", "green-herb", "purple-crystal"];
let selectedIngredients = [];

function selectIngredient(ingredientId) {
    ensureMusicPlays();

    if (clinkSound) {
        clinkSound.currentTime = 0;
        clinkSound.play();
    }

    const element = document.getElementById(ingredientId);
    const statusMsg = document.getElementById("statusMsg");

    if (selectedIngredients.includes(ingredientId)) {
        selectedIngredients = selectedIngredients.filter(item => item !== ingredientId);
        element.style.opacity = "1";
        statusMsg.innerText = "המרכיב הוצא מהקדירה.";
        statusMsg.style.color = "#e74c3c"; 
        return;
    }

    if (selectedIngredients.length >= 3) {
        statusMsg.innerText = "הקדירה כבר מלאה!";
        return;
    }

    selectedIngredients.push(ingredientId);
    element.style.opacity = "0.4";
    
    statusMsg.innerText = "הוספת מרכיב לקדירה...";
    statusMsg.style.color = "#3498db";

    if (selectedIngredients.length === 3) {
        statusMsg.innerText = "הקדירה מלאה! לחץ על הערבוב...";
        statusMsg.style.color = "#f1c40f";
    }
}

function checkPotion() {
    const statusMsg = document.getElementById("statusMsg");

    if (selectedIngredients.length < 3) {
        statusMsg.innerText = "חסרים לך מרכיבים!";
        return;
    }

    const isCorrect = selectedIngredients.every(ing => correctIngredients.includes(ing));

    if (isCorrect) {
        statusMsg.innerText = "השיקוי מוכן! הצלחת במשימה!";
        statusMsg.style.color = "#2ecc71";         
        
        alert("כל הכבוד " + savedName + "! רקיחת השיקוי הושלמה. אתה בדרך לחופש!");
        
        localStorage.setItem("status", 4);
        window.location.href = "../station4/station4.html"; 

    } else {
        statusMsg.innerText = "אוי לא! השיקוי התפוצץ...";
        statusMsg.style.color = "#e74c3c"; 
        
        setTimeout(() => {
            resetGame();
        }, 1200);
    }
}

function resetGame() {
    selectedIngredients = [];
    const statusMsg = document.getElementById("statusMsg");
    statusMsg.innerText = "נסה שוב...";
    statusMsg.style.color = "#3498db";

    const allIngredients = document.querySelectorAll(".ingredient");
    allIngredients.forEach(ing => {
        ing.style.opacity = "1";
    });
}