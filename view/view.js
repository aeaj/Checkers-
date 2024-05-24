class GameView {
  constructor(controller) {
    this.controller = controller;
    this.boardElement = document.getElementById('gameBoard');
  }

  createBoard(gameBoard) {
    // Clears the existing board
    this.boardElement.innerHTML = ''; 
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.style.backgroundColor = ((rowIndex + colIndex) % 2 === 0) ? '#808080' : '#000';
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;

        if (cell === 1 || cell === 2) {
          const pieceElement = document.createElement('div');
          pieceElement.className = `player${cell} piece`;
          // Style as needed
          pieceElement.style.width = '40px'; 
          pieceElement.style.height = '40px';
          pieceElement.style.borderRadius = '50%';
          pieceElement.style.backgroundColor = cell === 1 ? 'green' : 'red';
          cellElement.appendChild(pieceElement);
        }
        this.boardElement.appendChild(cellElement);
      });
    });
  }

  updateBoard(gameBoard) {
    this.createBoard(gameBoard);  // Redraw the board with current state
  }

  highlightPiece(row, col) {
      const piece = this.getPieceElement(row, col);
      if (piece) {
        piece.classList.add('selected');
      }
    }

    unhighlightPiece(row, col) {
      const piece = this.getPieceElement(row, col);
      if (piece) {
        piece.classList.remove('selected');
      }
    }

    getPieceElement(row, col) {
      const cellElement = this.boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      return cellElement ? cellElement.querySelector('.piece') : null;
    }
  }

/*class GameView {
  constructor(controller) {
      this.controller = controller;
      this.boardElement = document.getElementById('gameBoard');
  }

  createBoard(gameBoard) {
      this.boardElement.innerHTML = ''; // Clears the existing board
      gameBoard.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
              const cellElement = document.createElement('div');
              cellElement.className = 'cell';
              cellElement.style.backgroundColor = ((rowIndex + colIndex) % 2 === 0) ? '#808080' : '#000';
              cellElement.dataset.row = rowIndex;
              cellElement.dataset.col = colIndex;

              if (cell === 1 || cell === 2) {
                  const pieceElement = document.createElement('div');
                  pieceElement.className = `player${cell} piece`;
                  pieceElement.style.width = '40px'; // Style as needed
                  pieceElement.style.height = '40px';
                  pieceElement.style.borderRadius = '50%';
                  pieceElement.style.backgroundColor = cell === 1 ? 'green' : 'red';
                  cellElement.appendChild(pieceElement);
              }
              this.boardElement.appendChild(cellElement);
          });
      });
  }

  updateBoard(gameBoard) {
      this.createBoard(gameBoard);  // Redraw the board with current state
  }
}
*/




