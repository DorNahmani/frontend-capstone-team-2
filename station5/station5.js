document.addEventListener("DOMContentLoaded", function() {
    
    // --- ניהול מוזיקה ---
    const music = document.getElementById("bgMusic");
    
    function playFinalMusic() {
        if (music && music.paused) {
            music.play().catch(err => console.log("המוזיקה מחכה לקליק קטן על הדף..."));
        }
    }

    // ניסיון הפעלה אוטומטי (בזכות המעבר מתחנה 4 זה אמור לעבוד חלק)
    playFinalMusic();

    // גיבוי - הפעלה בלחיצה ראשונה על הטופס או על הדף
    document.addEventListener("click", playFinalMusic, { once: true });

    // --- ניהול תוכן ושם שחקן ---
    const savedName = localStorage.getItem("playerName") || "שוליה";
    
    const titleElement = document.querySelector("h1");
    if (titleElement) {
        titleElement.innerText = `כל הכבוד, ${savedName}!`;
    }

    // מילוי אוטומטי של השם בתוך ה-Input בטופס
    const nameInput = document.getElementById("userNameInput");
    if (nameInput && savedName !== "שוליה") {
        nameInput.value = savedName;
    }

    // --- ניהול הטופס ---
    const contactForm = document.getElementById("contactForm");
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        const email = document.getElementById("userEmail").value;
        const name = document.getElementById("userNameInput").value;

        alert(`תודה ${name}! הקופון שלך בדרך למייל: ${email}. ניפגש במעבדה האמיתית!`);
        
        // כאן המשחק נגמר - אפשר לאפס את הסטטוס אם רוצים לאפשר משחק חוזר
        // localStorage.setItem("status", 1);
    });
});