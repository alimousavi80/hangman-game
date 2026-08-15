const randomWord = ["house", "car", "garden"];
const selectRandom = randomWord[Math.floor(Math.random() * randomWord.length)];
const display = document.querySelector(".p");
let button = document.getElementsByClassName("button");
const splitedWord = selectRandom.split("");

let letter = "";
let splitedUnderLines = [];
setUnderScores();

function setUnderScores() {
    let underLines = [];
    if (letter == "") {
        for (let item of splitedWord) {
            underLines += "_";
        }
        splitedUnderLines = underLines.split("");
        display.innerHTML = splitedUnderLines;
    }
}

function check(letter) {
    if (splitedWord.includes(letter)) {
        splitedUnderLines[splitedWord.indexOf(letter)] = letter;
        display.innerHTML = splitedUnderLines;
        let str = String(splitedUnderLines);
        let str2 = String(splitedWord);
        if (str2.includes(str)) {
            win();
        }
    } else {
        checkWrongs();
    }
}

for (let item of button) {
    item.addEventListener("click", buttonHandler);
}

function buttonHandler(event) {
    check(event.target.innerText);
}

window.addEventListener("keydown", function (event) {
    let keyLetter = event.key.toUpperCase();
    check(keyLetter);
});

let x = 0;
function checkWrongs() {
    x += 1;
    let gg = (document.querySelector(".image").src =
        `./assets/hangman${x}.png`);
    if (x == 6) {
        document.querySelector(".resault").innerText =
            `u lost reasault was ${selectRandom}`;
            

    }
}

function win() {
    document.querySelector(".image").src = "./assets/winner.png";
}
