const Words = [
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
    "hill",
    "hello",
    "blue",
    "green",
    "white",
    "yellow",
    "planet",
    "table",
    "cat",
    "dog",
];
let selectRandom = "";
const display = document.querySelector(".display");
const button = document.getElementsByClassName("button");
const result = document.querySelector(".result");
const image = document.querySelector(".image");
const modalResult = document.querySelector(".modal-result");
const modalButton = document.querySelector(".modal-button");
const lettersContainer = document.querySelector(".container");
let splitedWord = "";

let letter = "";
let splitedUnderLines = [];

const randomWordMaker = () => {
    selectRandom = Words[Math.floor(Math.random() * Words.length)];
    splitedWord = selectRandom.split("");
};

randomWordMaker();

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
        let counter = 0;
        for (let item of splitedUnderLines) {
            if (splitedWord[counter] === letter) {
                splitedUnderLines[counter] = letter;
                display.innerHTML = splitedUnderLines;
            }
            counter++;
        }
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

let checkWrongsCounter = 0;

const checkWrongs = () => {
    checkWrongsCounter += 1;
    let gg = (image.src = `./assets/hangman${checkWrongsCounter}.png`);
    if (checkWrongsCounter == 6) {
        showResultModal("lose");
    }
};

const showResultModal = (check) => {
    lettersContainer.classList.add("disable");
    window.removeEventListener("keydown", keyhandler);
    window.addEventListener("keydown", enterKeyHandler);
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

const enterKeyHandler = (e) => {
    if (e.key === "Enter") {
        reloadGame();
    }
};

const reloadGame = () => {
    randomWordMaker();
    setUnderScores();
    lettersContainer.classList.remove("disable");
    window.addEventListener("keydown", keyhandler);
    window.removeEventListener("keydown", enterKeyHandler);
    modalResult.style.display = "none";
    checkWrongsCounter = 0;
    image.src = "./assets/hangman0.png";
};

window.addEventListener("keydown", keyhandler);

modalButton.addEventListener("click", reloadGame);
