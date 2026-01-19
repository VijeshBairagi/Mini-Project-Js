const submitBtn = document.querySelector(".submit");
const attemptEl = document.querySelector(".attempt");
const resultEl = document.querySelector(".result");
const errorEl = document.querySelector(".error");
const inputEl = document.querySelector("#guess");
const restartBtn = document.querySelector(".restart");
const prevValueEl = document.querySelector(".prevValue");

let attempts = 10;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let prevValues = [];

attemptEl.textContent = attempts;

submitBtn.addEventListener("click", guessGame);
restartBtn.addEventListener("click", restartGame);

function guessGame() {
  const guess = Number(inputEl.value);

  if (inputEl.value === "" || isNaN(guess) || guess < 1 || guess > 100) {
    errorEl.textContent = "Please enter a valid number between 1 and 100";
    resultEl.innerHTML = "";
    return;
  }

  errorEl.textContent = "";

  if (prevValues.includes(guess)) {
    errorEl.textContent = "Already entered this value";
    return;
  }

  if (guess === randomNumber) {
    resultEl.innerHTML = "Correct 🏆 You Win!";
    submitBtn.style.display = "none";
    attempts = 0
    setTimeout(() => errorEl.innerHTML = "Please restart the game!"
      , 2000)
    return;
  } else if (guess > randomNumber) {
    resultEl.innerHTML = "Too HIGH ⬆️";
  } else {
    resultEl.innerHTML = "Too LOW ⬇️";
  }

  attempts--;
  attemptEl.textContent = attempts;

  prevValues.push(guess);
  prevValueEl.textContent = prevValues.join(", ");

  if (attempts === 0) {
    resultEl.innerHTML = `Game Over 😢 <br> Number was ${randomNumber}`;
    submitBtn.style.display = "none";
    setTimeout(() => errorEl.innerHTML = "Please restart the game!"
      , 2000)
  }
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  prevValues = [];
  attemptEl.textContent = attempts;
  prevValueEl.textContent = "";
  resultEl.innerHTML = "";
  errorEl.textContent = "";
  inputEl.value = "";
  submitBtn.style.display = "inline";
}

inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && attempts > 0) {
    guessGame();
  }
});
