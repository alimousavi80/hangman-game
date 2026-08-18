const randomWord = [
    "car",
    "house",
    "red",
    "garden",
    "orange",
    "beauty",
    "bullet",
    "lunch",
    "mouse",
    "tiger",
];
const selectRandom = randomWord[Math.floor(Math.random() * randomWord.length)];
const display = document.querySelector(".p");
const button = document.getElementsByClassName("button");
const result = document.querySelector(".result");
const image = document.querySelector(".image");
const modalResult = document.querySelector(".modal-result");
const modalButton = document.querySelector(".modal-button");
const lettersContainer = document.querySelector(".container");

const splitedWord = selectRandom.split("");
let letter = "";
let splitedUnderLines = [];

const setUnderScores = () => {
    let underLines = [];
    if (letter == "") {
        for (let item of splitedWord) {
            underLines += "_";
        }
        splitedUnderLines = underLines.split("");
        display.innerHTML = splitedUnderLines;
    }
};

setUnderScores();

const check = (letter) => {
    if (splitedWord.includes(letter)) {
        splitedUnderLines[splitedWord.indexOf(letter)] = letter;
        display.innerHTML = splitedUnderLines;
        let str = String(splitedUnderLines);
        let str2 = String(splitedWord);
        if (str2.includes(str)) {
            showResultModal("win");
        }
    } else {
        checkWrongs();
    }
};

const buttonHandler = (e) => {
    check(e.target.innerText.toLowerCase());
};

let x = 0;
const checkWrongs = () => {
    x += 1;
    let gg = (image.src = `./assets/hangman${x}.png`);
    if (x == 6) {
        showResultModal("lose");
    }
};

const showResultModal = (check) => {
    lettersContainer.classList.add("disable");
    window.removeEventListener("keydown", keyhandler);
    modalResult.style.display = "block";
    if (check === "lose") {
        result.innerText = `result was ${selectRandom}`;
        modalButton.innerText = "try again";
    } else if (check === "win") {
        image.src = "./assets/winner.png";
        modalButton.innerText = "new game";
        result.innerText = "congratulation";
    }
};

for (let item of button) {
    item.addEventListener("click", buttonHandler);
}

const keyhandler = (e) => {
    let keyLetter = e.key.toLowerCase();
    check(keyLetter);
};

window.addEventListener("keydown", keyhandler);

modalButton.addEventListener("click", () => {
    console.log("gg");

    location.reload();
});
