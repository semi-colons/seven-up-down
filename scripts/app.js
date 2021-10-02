let currentBet = 0; //0 = equal, 1 = up, -1 = down

//Elements
const upBtn = document.querySelector('#bet-up');
const sevenBtn = document.querySelector('#bet-seven');
const downBtn = document.querySelector('#bet-down');
const rollBtn = document.querySelector('#roll-btn');
const die1Img = document.querySelector('#die-1-img');
const die2Img = document.querySelector('#die-2-img');
const resultTxt = document.querySelector('#result-txt');
const historyUl = document.querySelector('#history-ul');

function getRoll() {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    return [num1, num2];
}

function addToHistory(bet, roll1, roll2, win) {
    let newRow = document.createElement('li');
    let icon1 = document.createElement('img');
    let icon2 = document.createElement('img');
    let imgSpan = document.createElement('span');

    icon1.setAttribute('src', `images/icons/dice-${roll1}.png`);
    //TODO: set style class

    icon2.setAttribute('src', `images/icons/dice-${roll2}.png`);
    //TODO: set style class

    imgSpan.append(icon1);
    imgSpan.append(icon2);
    //TODO: set style class

    newRow.append('Bet: ');
    switch(bet) {
        case 1:
            newRow.append('Up');
            break;
        case 0:
            newRow.append('Seven');
            break;
        case -1:
            newRow.append('Down');
    }

    newRow.append(' Roll: ');
    newRow.append(imgSpan);
    newRow.append(' Result: ');
    if(win) {
        newRow.append('Won!');
    } else {
        newRow.append('Lost');
    }
    
    historyUl.append(newRow);
}

upBtn.addEventListener('click', function() {
    currentBet = 1;
});

downBtn.addEventListener('click', function() {
    currentBet = -1;
});

sevenBtn.addEventListener('click', function() {
    currentBet = 0;
});

rollBtn.addEventListener('click', function() {
    let roll = getRoll();
    let sum = roll[0] + roll[1];
    console.log(`Current bet: ${currentBet}, Roll: ${roll[0]}, ${roll[1]}`);
    die1Img.setAttribute('src', `images/dice${roll[0]}.png`);
    die2Img.setAttribute('src', `images/dice${roll[1]}.png`);
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

    if (win) {
        resultTxt.innerText = 'You won!';
    } else {
        resultTxt.innerText = "Sorry, you lost!";
    }

    addToHistory(currentBet, roll[0], roll[1], win);
})