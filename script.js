// script.js
let board;
let currentPlayer;
let isGameOver;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            message.textContent = `Player ${currentPlayer} wins!`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            message.textContent = 'Draw!';
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

resetBtn.addEventListener('click', startGame);
startGame();
