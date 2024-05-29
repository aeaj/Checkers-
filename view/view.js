class GameView {
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;
    this.boardElement = document.getElementById("gameBoard");
  }

  //Creates the board and configures the pieces
  createBoard(gameBoard) {
    // Clears the existing board
    this.boardElement.innerHTML = "";
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";

        //Alternates cell colors in the gameboard between gray and black
        cellElement.style.backgroundColor =
          (rowIndex + colIndex) % 2 === 0 ? "#808080" : "#000";
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;

        if (cell === 1 || cell === 2 || cell === 3 || cell === 4) {
          const pieceElement = document.createElement("div");
          pieceElement.className = `player${cell} piece`;

          //Dimensions and shape for pieces
          pieceElement.style.width = "40px";
          pieceElement.style.height = "40px";
          pieceElement.style.borderRadius = "50%";

          //Set background color based on piece type for player 1 and 2
          if (cell === 1 || cell === 3) {
            pieceElement.style.backgroundColor = "green";
          } else if (cell === 2 || cell === 4) {
            pieceElement.style.backgroundColor = "red";
          }

          //Set indicator for king pieces for player 1 and 2
          if (cell === 3 || cell === 4) {
            pieceElement.style.border = "4px solid gold";
          }
          cellElement.appendChild(pieceElement);
        }
        this.boardElement.appendChild(cellElement);
      });
    });
  }

  //Updates the board with current game state
  updateBoard(gameBoard) {
    this.createBoard(gameBoard); // Redraw the board with current state
  }

  //Highlights a specific piece
  highlightPiece(row, col) {
    const piece = this.getPieceElement(row, col);
    if (piece) {
      piece.classList.add("selected");
    }
  }

  //Unhighlight a specific piece
  unhighlightPiece(row, col) {
    const piece = this.getPieceElement(row, col);
    if (piece) {
      piece.classList.remove("selected");
    }
  }

  //Retrieves the piece element at the specified position
  getPieceElement(row, col) {
    const cellElement = this.boardElement.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    return cellElement ? cellElement.querySelector(".piece") : null;
  }
}

export default GameView; 
