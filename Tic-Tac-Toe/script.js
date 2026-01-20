const boxes = document.querySelectorAll(".box");
const restart = document.querySelector(".restartGame");
const win = document.querySelector(".winner");
const draw = document.querySelector(".drawGame");

let isOTurn = true;
let count = 0;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerHTML = isOTurn ? "O" : "X";
    box.style.color = isOTurn ? "green" : "red";
    isOTurn = !isOTurn;
    box.disabled = true; 
    count++;

    let winner = checkWinner();
    if (count === 9 && !winner) {
      draw.innerHTML = "🤝 It's a Draw! Restart to play again.";
    }
  });
});

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
  win.innerHTML = `🎉 Winner is ${winner}! 🏆`;
  disableBoxes();
  setTimeout(() => {
    draw.innerHTML = "Let's play again 🔄🔥";
  }, 2000);
};

const checkWinner = () => {
  for (const pattern of winConditions) {
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
};

const restartGame = () => {
  win.innerHTML = "";
  draw.innerHTML = "";
  count = 0;
  boxes.forEach(box => {
    box.innerHTML = "";
    box.disabled = false;
  });
};

restart.addEventListener("click", restartGame);
