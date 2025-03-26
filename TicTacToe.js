let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let winner = null;

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(220);
  drawBoard();
  drawMarkers();

  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    if (winner) {
      text(`Winner: ${winner}`, width / 2, height - 50);
    } else {
      text("It's a Draw!", width / 2, height - 50);
    }
  } else {
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`Current Player: ${currentPlayer}`, width / 2, height - 20);
  }
}

function drawBoard() {
  strokeWeight(3);
  line(100, 0, 100, 300);
  line(200, 0, 200, 300);
  line(0, 100, 300, 100);
  line(0, 200, 300, 200);
}

function drawMarkers() {
  for (let i = 0; i < 9; i++) {
    let x = (i % 3) * 100 + 50;
    let y = floor(i / 3) * 100 + 50;
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(0);
    text(board[i], x, y);
  }
}

function mouseClicked() {
  if (!gameOver) {
    let row = floor(mouseY / 100);
    let col = floor(mouseX / 100);
    let index = col + row * 3;

    if (index >= 0 && index < 9 && board[index] === '') {
      board[index] = currentPlayer;
      checkForWin();
      switchPlayer();
    }
  } else {
    resetGame();
  }
}

function checkForWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      winner = board[a];
      return;
    }
  }

  if (!board.includes('')) {
    gameOver = true;
  }
}

function switchPlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  winner = null;
}
