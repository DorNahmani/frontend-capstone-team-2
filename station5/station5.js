document.addEventListener("DOMContentLoaded", function() {
    
    const music = document.getElementById("bgMusic");
    
    function playFinalMusic() {
        if (music && music.paused) {
            music.play().catch(err => console.log("המוזיקה מחכה לקליק קטן על הדף..."));
        }
    }

    playFinalMusic();

    document.addEventListener("click", playFinalMusic, { once: true });

    const savedName = localStorage.getItem("playerName") || "שוליה";
    
    const titleElement = document.querySelector("h1");
    if (titleElement) {
        titleElement.innerText = `כל הכבוד, ${savedName}!`;
    }

    const nameInput = document.getElementById("userNameInput");
    if (nameInput && savedName !== "שוליה") {
        nameInput.value = savedName;
    }

    const contactForm = document.getElementById("contactForm");
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        const email = document.getElementById("userEmail").value;
        const name = document.getElementById("userNameInput").value;

        alert(`תודה ${name}! הקופון שלך בדרך למייל: ${email}. ניפגש במעבדה האמיתית!`);
        
    });
});