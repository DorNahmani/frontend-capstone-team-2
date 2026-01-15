let savedName = localStorage.getItem("playerName");
const welcomeElement = document.getElementById("welcomeMsg");
if (savedName) { welcomeElement.innerText = "שלום " + savedName + "!"; }
else {window.location.href = "station1.html";}

const correctIngredients = ["blue-mushroom", "green-herb", "purple-crystal"];

let selectedIngredients = [];

function selectIngredient(ingredientId) {
    const element = document.getElementById(ingredientId);
    const statusMsg = document.getElementById("statusMsg");

    if (selectedIngredients.includes(ingredientId)) {
        selectedIngredients = selectedIngredients.filter(item => item !== ingredientId);
        
        element.style.opacity = "1";
        element.classList.remove("selected-glow"); 
        
        statusMsg.innerText = "המרכיב הוצא מהקדירה.";
        statusMsg.style.color = "#e74c3c"; 
        return;
    }

    // הגבלה: שלא יהיה אפשר לבחור יותר מ-3 מרכיבים
    if (selectedIngredients.length >= 3) {
        statusMsg.innerText = "הקדירה כבר מלאה! אי אפשר להוסיף עוד.";
        return;
    }

    selectedIngredients.push(ingredientId);
    
    element.style.opacity = "0.4";
    element.style.pointerEvents = "auto"; 
    
    statusMsg.innerText = "הוספת מרכיב לקדירה...";
    statusMsg.style.color = "#3498db";

    if (selectedIngredients.length === 3) {
        statusMsg.innerText = "הקדירה מלאה! לחצי על הערבוב...";
        statusMsg.style.color = "#f1c40f";
    }
}

function checkPotion() {
    const statusMsg = document.getElementById("statusMsg");

    if (selectedIngredients.length < 3) {
        statusMsg.innerText = "חסרים לך מרכיבים לשיקוי!";
        return;
    }

    // בודק אם בחרו את כל המרכיבים הנכונים.
    const isCorrect = selectedIngredients.every(ing => correctIngredients.includes(ing));

    if (isCorrect) {
        statusMsg.innerText = "השיקוי מוכן! הצלחת במשימה!";
        statusMsg.style.color = "#2ecc71";         
        
        setTimeout(() => {
            alert("כל הכבוד שוליה! רקיחת השיקוי הושלמה. אתה בדרך לחופש!");
            // window.location.href = "station4.html"; // כאן נשים את הקישור לסוף
        }, 1200);

    } else {
        statusMsg.innerText = "אוי לא! השיקוי התפוצץ. נסה שוב...";
        statusMsg.style.color = "#e74c3c"; 
        
        
        setTimeout(() => {
            resetGame();
        }, 1200);
    }
}

//  פונקציית איפוס הקדירה במקרה של טעות
function resetGame() {
    selectedIngredients = [];
    const statusMsg = document.getElementById("statusMsg");
    
    statusMsg.innerText = "נסה שוב... זכור את הרמז!";
    statusMsg.style.color = "#3498db";

    // החזרת כל המרכיבים למצב רגיל
    const allIngredients = document.querySelectorAll(".ingredient");
    allIngredients.forEach(ing => {
        ing.style.opacity = "1";
        ing.style.pointerEvents = "auto";
    });
}