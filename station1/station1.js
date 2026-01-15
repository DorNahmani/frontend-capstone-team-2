

const startBtn = document.querySelector("#startBtn");

const nameInput = document.querySelector("#userName");

startBtn.addEventListener("click", function() {

    let name = nameInput.value;

    if (name.trim() === "") {

        alert("עליך להזין שם כדי להתחיל במשימה!");

    } else {

        localStorage.setItem("playerName", name);

        alert("בהצלחה " + name + "! המעבדה נפתחת...");

        localStorage.setItem("status", 2);

        window.location.href = "../station2/station2.html";

    }

});