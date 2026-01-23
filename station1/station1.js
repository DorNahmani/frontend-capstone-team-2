// 1. הגדרת המשתנים
const startBtn = document.querySelector("#startBtn");
const nameInput = document.querySelector("#userName");
const music = document.querySelector("#bgMusic");

// 2. פונקציה להפעלת המוזיקה (שתרוץ פעם אחת בלבד)
function initMusic() {
    if (music) {
        music.play().then(() => {
            // אם הניגון הצליח, נסיר את המאזינים כדי שלא יופעלו שוב בכל לחיצה
            document.removeEventListener("click", initMusic);
            document.removeEventListener("keydown", initMusic);
            console.log("המוזיקה התחילה בהצלחה!");
        }).catch(err => {
            console.log("הדפדפן עדיין חוסם את המוזיקה, מחכה לפעולה מהמשתמש...");
        });
    }
}

// 3. הוספת מאזינים לכל אינטראקציה ראשונה במסך (לחיצה או הקלדה)
document.addEventListener("click", initMusic);
document.addEventListener("keydown", initMusic);

// 4. לוגיקת כפתור ההתחלה המקורי שלך
startBtn.addEventListener("click", function() {
    let name = nameInput.value;

    if (name.trim() === "") {
        alert("עליך להזין שם כדי להתחיל במשימה!");
    } else {
        // ליתר ביטחון, נפעיל את המוזיקה גם כאן אם היא עדיין לא התחילה
        if (music) music.play();

        localStorage.setItem("playerName", name);
        localStorage.setItem("status", 2);
        
        alert("בהצלחה " + name + "! המעבדה נפתחת...");

        // מעבר לתחנה הבאה
        window.location.href = "../station2/station2.html";
    }
});