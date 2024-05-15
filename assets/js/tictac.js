const board = document.getElementById('board');
const result = document.getElementById('result');
const playAgainButton = document.getElementById('play-again');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Create the Tic-Tac-Toe board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => cellClick(i));
  board.appendChild(cell);
}

// Handle cell click
function cellClick(index) {
  if (!gameOver && gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Render the Tic-Tac-Toe board
function renderBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = board.children[i];
    cell.textContent = gameBoard[i];
    cell.classList.remove('player-x', 'player-o');
    cell.classList.add(gameBoard[i] === 'X' ? 'player-x' : 'player-o');
  }
}

// Check for a winner or a tie
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      result.textContent = `Oyuncu ${gameBoard[a]} Kazandı!`;
      playAgainButton.style.display = 'block';
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameOver = true;
    result.textContent = "Tekrar Deneyiniz !";
    playAgainButton.style.display = 'block';
  }
}

// Reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  result.textContent = '';
  playAgainButton.style.display = 'none';
  renderBoard();
}