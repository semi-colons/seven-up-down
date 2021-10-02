let currentBet = 0; //0 = equal, 1 = up, -1 = down

//Elements
const upBtn = document.querySelector("#bet-up");
const sevenBtn = document.querySelector("#bet-seven");
const downBtn = document.querySelector("#bet-down");
const rollBtn = document.querySelector("#roll-btn");
const die1Img = document.querySelector("#die-1-img");
const die2Img = document.querySelector("#die-2-img");
const resultTxt = document.querySelector("#result-txt");
const historyUl = document.querySelector("#history-ul");

function clearButtonStyles() {
  upBtn.classList.remove("betBtn-pressed");
  downBtn.classList.remove("betBtn-pressed");
  sevenBtn.classList.remove("betBtn-pressed");
}

function getRoll() {
  let num1 = Math.floor(Math.random() * 6) + 1;
  let num2 = Math.floor(Math.random() * 6) + 1;
  return [num1, num2];
}

function addToHistory(bet, roll1, roll2, win) {
  let newRow = document.createElement("li");
  let icon1 = document.createElement("img");
  let icon2 = document.createElement("img");
  let imgSpan = document.createElement("span");
  let betSpan = document.createElement("span");
  let betSpanInner = document.createElement("span");
  let rollSpan = document.createElement("span");
  let resultSpan = document.createElement("span");
  let resultSpanInner = document.createElement("span");

  icon1.setAttribute("src", `images/icons/dice-${roll1}.png`);
  icon1.classList.add("history-img");

  icon2.setAttribute("src", `images/icons/dice-${roll2}.png`);
  icon2.classList.add("history-img");

  imgSpan.append(icon1);
  imgSpan.append(" ");
  imgSpan.append(icon2);

  betSpan.append("Bet: ");
  switch (bet) {
    case 1:
      betSpanInner.append("Up");
      betSpanInner.classList.add("up");
      break;
    case 0:
      betSpanInner.append("Seven");
      betSpanInner.classList.add("seven");
      break;
    case -1:
      betSpanInner.append("Down");
      betSpanInner.classList.add("down");
      break;
  }
  betSpanInner.classList.add("result-text");

  betSpan.classList.add("history-row-section");
  betSpan.append(betSpanInner);

  rollSpan.append(" Roll: ");
  rollSpan.append(imgSpan);
  rollSpan.classList.add("history-row-section");

  resultSpan.append(" Result: ");
  if (win) {
    resultSpanInner.append("Won!");
    resultSpanInner.classList.add("win");
  } else {
    resultSpanInner.append("Lost");
    resultSpanInner.classList.add("lose");
  }

  resultSpanInner.classList.add("result-text");
  resultSpan.append(resultSpanInner);
  resultSpan.classList.add("history-row-section");

  newRow.classList.add("history-row");
  newRow.append(betSpan);
  newRow.append(rollSpan);
  newRow.append(resultSpan);

  historyUl.prepend(newRow);
}

//Event listeners and handlers
upBtn.addEventListener("click", function () {
  currentBet = 1;
  clearButtonStyles();
  this.classList.add("betBtn-pressed");
});

downBtn.addEventListener("click", function () {
  currentBet = -1;
  clearButtonStyles();
  this.classList.add("betBtn-pressed");
});

sevenBtn.addEventListener("click", function () {
  currentBet = 0;
  clearButtonStyles();
  this.classList.add("betBtn-pressed");
});

rollBtn.addEventListener("click", function () {
  let roll = getRoll();
  let sum = roll[0] + roll[1];
  console.log(`Current bet: ${currentBet}, Roll: ${roll[0]}, ${roll[1]}`);
  die1Img.setAttribute("src", `images/dice${roll[0]}.png`);
  die2Img.setAttribute("src", `images/dice${roll[1]}.png`);
  let win = false;
  switch (currentBet) {
    case 1:
      win = sum > 7 ? true : false;
      break;
    case 0:
      win = sum === 7 ? true : false;
      break;
    case -1:
      win = sum < 7 ? true : false;
      break;
  }

  resultTxt.classList.add("result-text");

  if (win) {
    resultTxt.innerText = "You won!";
    resultTxt.classList.remove("lose");
    resultTxt.classList.add("win");
  } else {
    resultTxt.innerText = "Sorry, you lost!";
    resultTxt.classList.remove("win");
    resultTxt.classList.add("lose");
  }

  addToHistory(currentBet, roll[0], roll[1], win);
});
