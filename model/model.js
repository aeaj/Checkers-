class GameModel {
    constructor() {
      console.log("Initializing the game model...");
      this.board = this.setupInitialBoard();
      console.table(this.board);
      console.log("Initial board setup complete:");
    }
  
    // Method to set up the initial game board
    // 1 = Player 1
    // 2 = Player 2
    // 0 = Empty field
    setupInitialBoard() {
      return [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ];
    }
  
    // Method to check if a position is valid (within the bounds of the board)
    isValidPosition(row, col) {
      const isValid = row >= 0 && row < 8 && col >= 0 && col < 8;
      console.log(`Checking if position (${row}, ${col}) is valid: ${isValid}`);
      return isValid;
    }
  
    //Method for defining it the pieces to be king for each player
    isKing(row, col) {
      // Assuming kings are denoted by 3 and 4 for player 1 and player 2 respectively
      return this.board[row][col] === 3 || this.board[row][col] === 4;
    }

    // Method to move a piece from one position to another
    movePiece(fromRow, fromCol, toRow, toCol) {
      console.log(`Attempting to move piece from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol})...`);

      const piece = this.board[fromRow][fromCol];

      if (this.isValidPosition(toRow, toCol) && this.board[toRow][toCol] === 0) {
        console.log("Target position is valid and empty.");
        
        // Check if the move is valid for non-king pieces
        if (!this.isKing(fromRow, fromCol)) {
           if (piece === 1 && toRow >= fromRow) {
            console.log("Invalid move for Player 1: Cannot move backwards.");
            return false;
          } else if (piece === 2 && toRow <= fromRow) {
            console.log("Invalid move for Player 2: Cannot move backwards.");
            return false;
          }
        }

        // Normal move (one step diagonally)
        if (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 1) {
          console.log("Performing a normal move.");
          this.board[toRow][toCol] = this.board[fromRow][fromCol];
          this.board[fromRow][fromCol] = 0;
          console.log("Move successful. Updated board:");
          console.table(this.board);

          //Check for King Promotion
          this.checkForKing(toRow, toCol);
          return true;
        }
  
        // Jump move (two steps diagonally, capturing an opponent's piece)
        if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2) {
          console.log("Attempting a jump move.");
          const middleRow = (fromRow + toRow) / 2;
          const middleCol = (fromCol + toCol) / 2;
          console.log(`Middle position to check: (${middleRow}, ${middleCol})`);
          
          // Check if the middle position has an opponent's piece
          if (this.board[middleRow][middleCol] !== 0 && this.board[middleRow][middleCol] !== this.board[fromRow][fromCol]) {
            console.log("Jump move valid. Performing the jump.");
            this.board[toRow][toCol] = this.board[fromRow][fromCol];
            this.board[fromRow][fromCol] = 0;
            this.board[middleRow][middleCol] = 0;
            console.log("Jump successful. Updated board:");
            console.table(this.board);

            //Check for King Promotion
            this.checkForKing(toRow, toCol);
            return true;
          } else {
            console.log("Jump move invalid: No opponent piece in the middle position.");
          }
        } else {
          console.log("Invalid move: Not a valid normal or jump move.");
        }
      } else {
        console.log("Target position invalid or not empty.");
      }
      return false;
    }
  
  
  // Method to promote a piece to a king if it reaches the opposite end
  checkForKing(row, col) {
    // Player 1 (green) becomes king when reaching the last row (0)
    if (this.board[row][col] === 1 && row === 0) {
        console.log("Player 1 piece promoted to King!");
        this.board[row][col] = 3; // King for Player 1
    }
    // Player 2 (red) becomes king when reaching the last row (7)
    if (this.board[row][col] === 2 && row === 7) {
        console.log("Player 2 piece promoted to King!");
        this.board[row][col] = 4; // King for Player 2
    }
  }
}

//Exporting GameModel to _tests_ for testing
module.exports = GameModel;