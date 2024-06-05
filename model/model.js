import { minimax } from "../algorithm/minimax.js"; 

class GameModel {
  constructor() {
    console.log("Initializing Game Model");
    this.board = this.setupInitialBoard();
    console.table(this.board);
  }

  // 2D Array
  // 1 = Player 1, 2 = Player 2, 0 = Empty field
  setupInitialBoard() {
    return [
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ];
  }

  // Method to check if a position is valid (within the bounds of the board)
  isValidPosition(row, col) {
    const isValid = row >= 0 && row < 8 && col >= 0 && col < 8;
    //console.log(`Checking if position (${row}, ${col}) is valid: ${isValid}`);
    return isValid;
  }

  //Method for defining the pieces to be king for each player
  isKing(row, col) {
    // Kings are denoted by 3 for player 1, and 4 for player 2
    return this.board[row][col] === 3 || this.board[row][col] === 4;
  }

  // Method to move a piece from one position to another
  movePiece(fromRow, fromCol, toRow, toCol) {
    //console.log(`Attempting to move piece from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol})...`);

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
        if (
          this.board[middleRow][middleCol] !== 0 &&
          this.board[middleRow][middleCol] !== this.board[fromRow][fromCol]
        ) {
          this.board[toRow][toCol] = this.board[fromRow][fromCol];
          this.board[fromRow][fromCol] = 0;
          this.board[middleRow][middleCol] = 0;
          console.log("Jump successful. Updated board:");
          console.table(this.board);

          //Check for King Promotion
          this.checkForKing(toRow, toCol);
          return true;
        } else {
          console.log(
            "Jump move invalid: No opponent piece in the middle position."
          );
        }
      } else {
        console.log("Invalid move: Not a valid normal or jump move.");
      }
    } else {
      console.log("Target position invalid or not empty.");
    }
    return false;
  }

  // Method to evaluate the board for AI
  evaluate() {
    let evaluation = 0; // Initialize the evaluation score

    // Iterate over each row of the board
    for (let row = 0; row < this.board.length; row++) {
      // Iterate over each column of the board
      for (let col = 0; col < this.board[row].length; col++) {
        // Check the type of piece at the current position

        if (this.board[row][col] === 1 || this.board[row][col] === 3) {
          evaluation += 1; // Both normal and king pieces for Player 1 are worth 1 point
        } else if (this.board[row][col] === 2 || this.board[row][col] === 4) {
          evaluation -= 1; // Both normal and king pieces for Player 2 are worth -1 point
        }
      }
    }
    console.log(`Board evaluation: ${evaluation}`);
    return evaluation;
  }

  // Method to check for a winner
  winner() {
    let player1Pieces = 0; // Initialize the counter for Player 1's pieces
    let player2Pieces = 0; // Initialize the counter for Player 2's pieces

    // Iterate over each row of the board
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        // Check the type of piece at the current position
        if (this.board[row][col] === 1 || this.board[row][col] === 3) {
          player1Pieces++; // Increment the counter for Player 1's pieces
        } else if (this.board[row][col] === 2 || this.board[row][col] === 4) {
          player2Pieces++; // Increment the counter for Player 2's pieces
        }
      }
    }

    // Determine if Player 1 has no pieces left
    if (player1Pieces === 0) {
      console.log("Player 2 wins!");
      return 2; // indicate Player 2 is the winner
    }
    // Determine if Player 2 has no pieces left
    else if (player2Pieces === 0) {
      console.log("Player 1 wins!");
      return 1; // indicate Player 1 is the winner
    }
    // If both players still have pieces, there is no winner yet
    return null; // Return null to indicate the game is still ongoing
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

  // Simulate a move for Minimax algorithm
  simulateMove(from, to, board, skip) {
    const [fromRow, fromCol] = from; // Extracts starting row and column
    const [toRow, toCol] = to; // Extracts destination row and column
    const piece = board[fromRow][fromCol]; // Gets the piece at the starting position

    board[fromRow][fromCol] = 0; // Clears the starting position
    board[toRow][toCol] = piece; // Moves the piece to the destination

    // If there's a piece to skip (jump over), remove it
    if (skip) {
      const [skipRow, skipCol] = skip; // Extracts the row and column of the skipped piece
      board[skipRow][skipCol] = 0; // Clears the skipped position
    }

    return board; // Returns the updated board
  }

  // Get valid moves for a piece
  getValidMoves(board, piece) {
    const [row, col] = piece; // Extracts the piece's current row and column
    const pieceType = board[row][col]; // Gets the type of the piece
    const moves = {}; // Initializes an empty object to store valid moves
    const directions = this.getDirections(pieceType); // Gets movement directions based on the piece type

    for (const [dr, dc] of directions) {
      const newRow = row + dr; // Calculates the new row
      const newCol = col + dc; // Calculates the new column
      if (this.isValidMove(board, newRow, newCol, row, col)) {
        moves[[newRow, newCol]] = null; // Adds a normal move to the valid moves
      } else if (this.isJumpPossible(board, newRow, newCol, row, col, dr, dc)) {
        const jumpRow = newRow + dr; // Calculates the jump row
        const jumpCol = newCol + dc; // Calculates the jump column
        moves[[jumpRow, jumpCol]] = [newRow, newCol]; // Adds a jump move to the valid moves
      }
    }
    return moves; // Returns the valid moves
  }

  getDirections(pieceType) {
    // Defines normal piece movement directions
    const normalDirections = (pieceType === 1 || pieceType === 3) ? [[-1, -1], [-1, 1]] : [];
    // Defines king piece movement directions
    const kingDirections = (pieceType === 2 || pieceType === 4) ? [[1, 1], [1, -1]] : [];
    return [...normalDirections, ...kingDirections]; // Combines and returns both sets of directions
  }  

  isValidMove(board, newRow, newCol, row, col) {
    // Checks if the new position is within bounds and empty
    return this.isValidPosition(newRow, newCol, row, col) && board[newRow][newCol] === 0;
  }
  

  isJumpPossible(board, newRow, newCol, row, col, dr, dc) {
    const middleRow = row + dr; // Calculates the middle row
    const middleCol = col + dc; // Calculates the middle column
    // Checks if the jump move is valid by ensuring the middle piece is an opponent's piece and the destination is empty
    return (
      this.isValidPosition(middleRow, middleCol) &&
      board[middleRow][middleCol] !== 0 &&
      board[middleRow][middleCol] !== board[row][col] &&
      this.isValidPosition(newRow + dr, newCol + dc) &&
      board[newRow + dr][newCol + dc] === 0
    );
  }
  

  getAllPossibleMoves(player) {
    const allMoves = []; // Initializes an array to store all possible moves
    
    // Iterate through all pieces of the current player
    const pieces = this.getAllPieces(player);
    
    for (const piece of pieces) {
      const validMoves = this.getValidMoves(this.board, piece); // Gets valid moves for each piece
      for (const [move, skip] of Object.entries(validMoves)) {
        const newBoard = this.simulateMove(piece, move.split(',').map(Number), this.board, skip); // Simulates the move
        allMoves.push(new GameModel(newBoard)); // Creates a new GameModel for each possible move
      }
    }
    
    return allMoves; // Returns all possible moves
  }
  

  getAllPieces(player) {
    const pieces = []; // Initializes an array to store all pieces
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        // Checks if the current position contains a piece of the player
        if (
          this.board[row][col] === player ||
          this.board[row][col] === player + 2
        ) {
          pieces.push([row, col]); // Adds the piece to the array
        }
      }
    }
    return pieces; // Returns all pieces
  }
  

  // Check if the game is over
  isGameOver() {
    // Game over logic based on remaining pieces
    const player1Pieces = this.getAllPieces(1).length;
    const player2Pieces = this.getAllPieces(2).length;
    return player1Pieces === 0 || player2Pieces === 0;
  }
}

//Exporting GameModel to Test and Controller
export default GameModel;
