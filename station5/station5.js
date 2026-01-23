document.addEventListener("DOMContentLoaded", function() {
    
    const savedName = localStorage.getItem("playerName") || "שוליה";
    
   
    const titleElement = document.querySelector("h1");
    titleElement.innerText = `כל הכבוד, ${savedName}!`;

    const contactForm = document.getElementById("contactForm");
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        const email = document.getElementById("userEmail").value;
        const name = document.getElementById("userNameInput").value;

       
        alert(`תודה ${name}! הקופון שלך בדרך למייל: ${email}. ניפגש במעבדה האמיתית!`);
        
        
    });
});