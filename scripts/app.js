let currentBet = 0; //0 = equal, 1 = up, -1 = down
let totalRolls = 0;
let betUp = 0;
let betSeven = 0;
let betDown = 0;
let timesWon = 0;
let timesLost = 0;
let upWin = 0;
let upLose = 0;
let sevenWin = sevenLose = downWin = downLose = 0;

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

function updateStats(bet, win) {
    switch (bet) {
        case 1:
            betUp += 1;
            break;
        case 0:
            betSeven += 1;
            break;
        case -1:
            betDown += 1;
            break;
    }

    if (win) {
        timesWon += 1;
        switch(bet) {
            case 1:
                upWin += 1;
                break;
            case 0:
                sevenWin += 1;
                break;
            case -1:
                downWin += 1;
                break;
        }
    } else {
        timesLost += 1;
        switch(bet) {
            case 1:
                upLose += 1;
                break;
            case 0:
                sevenLose += 1;
                break;
            case -1:
                downLose += 1;
                break;
        }
    }

    totalRolls += 1;

    document.getElementById('stat-total-roll').innerText = totalRolls;
    document.getElementById('stat-total-win').innerText = timesWon;    
    document.getElementById('stat-total-lose').innerText = timesLost;
    document.getElementById('stat-total-up').innerText = betUp;
    document.getElementById('stat-total-seven').innerText = betSeven;
    document.getElementById('stat-total-down').innerText = betDown;
    document.getElementById('stat-up-win').innerText = upWin;
    document.getElementById('stat-up-lose').innerText = upLose;
    document.getElementById('stat-seven-win').innerText = sevenWin;
    document.getElementById('stat-seven-lose').innerText = sevenLose;
    document.getElementById('stat-down-win').innerText = downWin;
    document.getElementById('stat-down-lose').innerText = downLose;
}

//Event listeners and handlers
upBtn.addEventListener("click", function () {
  changeBet(1, this);
});

downBtn.addEventListener("click", function () {
  changeBet(-1, this)
});

sevenBtn.addEventListener("click", function () {
  changeBet(0, this)
});

rollBtn.addEventListener("click", function () {
    rollDice();
});

document.addEventListener('keydown', function(e){
    switch(e.code) {
        case 'ArrowRight':
            switch (currentBet){
                case 1:
                    changeBet(0, sevenBtn);
                    break;
                case 0:
                    changeBet(-1, downBtn);
                    break;
                case -1:
                    changeBet(1, upBtn);
                    break;
            }
            break;
        case 'ArrowLeft':
            switch(currentBet){
                case -1:
                    changeBet(0, sevenBtn);
                    break;
                case 0:
                    changeBet(1, upBtn);
                    break;
                case 1:
                    changeBet(-1, downBtn);
                    break;
            }
            break;
        case 'Enter':
            rollDice();
            break;
    }
    e.stopPropagation();
})

function changeBet(bet, button) {
    currentBet = bet;
    clearButtonStyles();
    button.classList.add('betBtn-pressed');
}

function rollDice() {
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
  updateStats(currentBet, win);
}


//Collapsibles
let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}