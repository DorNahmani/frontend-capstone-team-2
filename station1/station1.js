const startBtn = document.querySelector("#startBtn");
const nameInput = document.querySelector("#userName");
const music = document.querySelector("#bgMusic");

function initMusic() {
    if (music) {
        music.play().then(() => {
            document.removeEventListener("click", initMusic);
            document.removeEventListener("keydown", initMusic);
            console.log("המוזיקה התחילה בהצלחה!");
        }).catch(err => {
            console.log("הדפדפן עדיין חוסם את המוזיקה, מחכה לפעולה מהמשתמש...");
        });
    }
}

document.addEventListener("click", initMusic);
document.addEventListener("keydown", initMusic);

startBtn.addEventListener("click", function() {
    let name = nameInput.value;

    if (name.trim() === "") {
        alert("עליך להזין שם כדי להתחיל במשימה!");
    } else {
        if (music) music.play();

        localStorage.setItem("playerName", name);
        localStorage.setItem("status", 2);
        
        alert("בהצלחה " + name + "! המעבדה נפתחת...");

        window.location.href = "../station2/station2.html";
    }
});