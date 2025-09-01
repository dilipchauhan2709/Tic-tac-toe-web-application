const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;

    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    function createBoard() {
      board.innerHTML = '';
      gameState.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.className = `cell`;
        cell.dataset.index = idx;
        cell.textContent = val;
        if (val === 'X') cell.classList.add('x');
        if (val === 'O') cell.classList.add('o');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      });
    }

    function handleCellClick(e) {
      const index = e.target.dataset.index;
      if (gameState[index] || !isGameActive) return;

      gameState[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      e.target.classList.add(currentPlayer.toLowerCase());

      if (checkWinner()) {
        statusText.innerHTML = `🎉 Player <span>${currentPlayer}</span> wins!`;
        isGameActive = false;
        return;
      }

      if (gameState.every(cell => cell !== "")) {
        statusText.innerHTML = "🤝 It's a draw!";
        isGameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.innerHTML = `Player <span>${currentPlayer}</span>'s turn`;
    }

    function checkWinner() {
      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        );
      });
    }

    function resetGame() {
      gameState = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = 'X';
      isGameActive = true;
      statusText.innerHTML = `Player <span>${currentPlayer}</span>'s turn`;
      createBoard();
    }

    
    createBoard();
