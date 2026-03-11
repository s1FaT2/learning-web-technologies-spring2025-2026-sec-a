const gameBoardEl = document.getElementById('board');
const gameStatusEl = document.getElementById('status');
const activePlayerEl = document.getElementById('currentPlayer');
const gameMsgEl = document.getElementById('message');
const resetGameBtn = document.getElementById('resetButton');
const resetScoresBtn = document.getElementById('resetScoresButton');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

let gridState = Array(9).fill('');
let activePlayer = 'X';
let isGameActive = true;
let playerScores = { X: 0, O: 0 };

const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function startGame() {
    gameBoardEl.innerHTML = '';
    gridState = Array(9).fill('');
    activePlayer = 'X';
    isGameActive = true;
    updateStatus();
    for(let i=0; i<9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i, cell));
        gameBoardEl.appendChild(cell);
    }
    gameMsgEl.textContent = '';
}

function handleCellClick(index, cell) {
    if(!isGameActive){
        gameMsgEl.textContent = 'Game over! Press Reset to play again.';
        return;
    }
    if(gridState[index] !== ''){
        gameMsgEl.textContent = 'Cell is already taken!';
        return;
    }
    gridState[index] = activePlayer;
    cell.textContent = activePlayer;
    cell.classList.add('marked');
    setTimeout(() => cell.classList.remove('marked'), 160);
    const result = checkGameResult();
    if(result.winner){
        result.combo.forEach(idx => {
            const c = gameBoardEl.querySelector(`[data-index='${idx}']`);
            if(c) c.classList.add('winning');
        });
        playerScores[result.winner] += 1;
        updateScores();
        gameStatusEl.innerHTML = `Winner: <strong>${result.winner}</strong> 🎉`;
        isGameActive = false;
        gameMsgEl.textContent = 'Press Reset to play again.';
        return;
    }
    if(result.draw){
        gameStatusEl.innerHTML = `It's a draw! 🤝`;
        isGameActive = false;
        gameMsgEl.textContent = 'Press Reset to play again.';
        return;
    }
    activePlayer = (activePlayer === 'X') ? 'O' : 'X';
    updateStatus();
    gameMsgEl.textContent = '';
}

function checkGameResult(){
    for(let combo of winCombos){
        const [a,b,c] = combo;
        if(gridState[a] && gridState[a] === gridState[b] && gridState[a] === gridState[c]){
            return { winner: gridState[a], combo: combo, draw: false };
        }
    }
    const isDraw = gridState.every(cell => cell !== '');
    if(isDraw) return { winner: null, combo: null, draw: true };
    return { winner: null, combo: null, draw: false };
}

function updateStatus(){
    activePlayerEl.textContent = activePlayer;
    gameStatusEl.innerHTML = `Current player: <strong>${activePlayer}</strong>`;
}

function updateScores(){
    scoreXEl.textContent = playerScores.X;
    scoreOEl.textContent = playerScores.O;
}

resetGameBtn.addEventListener('click', () => {
    const winCells = gameBoardEl.querySelectorAll('.cell.winning');
    winCells.forEach(c => c.classList.remove('winning'));
    startGame();
});

resetScoresBtn.addEventListener('click', () => {
    playerScores.X = 0;
    playerScores.O = 0;
    updateScores();
    startGame();
});

startGame();