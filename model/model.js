import { minimax } from "../algorithm/minimax.js"; 

class GameModel {
  constructor(board = null) {
    console.log("Initializing Game Model");
    this.board = board ? board : this.setupInitialBoard();
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
    console.log(`Checking if position (${row}, ${col}) is valid: ${isValid}`);
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
    let evaluation = 0;

    // Iterate over each row of the board
    for (let row = 0; row < this.board.length; row++) {
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
    let player1Pieces = 0; 
    let player2Pieces = 0; 

    // Iterate over each row of the board
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {

        // Check the type of piece at the current position
        if (this.board[row][col] === 1 || this.board[row][col] === 3) {
          player1Pieces++; 
        } else if (this.board[row][col] === 2 || this.board[row][col] === 4) {
          player2Pieces++; 
        }
      }
    }

    // Determine if Player 1 has no pieces left
    if (player1Pieces === 0) {
      console.log("Player 2 wins!");
      return 2; 
    }
    // Determine if Player 2 has no pieces left
    else if (player2Pieces === 0) {
      console.log("Player 1 wins!");
      return 1; 
    }
    // If both players still have pieces, there is no winner yet
    return null;
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
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = board[fromRow][fromCol];

    const newBoard = board.map(row => row.slice()); // Clone the board
    newBoard[fromRow][fromCol] = 0;
    newBoard[toRow][toCol] = piece;

    if (skip) {
      const [skipRow, skipCol] = skip;
      newBoard[skipRow][skipCol] = 0;
    }
    return newBoard;
  }

  // Get valid moves for a piece
  getValidMoves(board, piece) {
    const [row, col] = piece;
    const pieceType = board[row][col];
    const moves = {};
    const directions = this.getDirections(pieceType);

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (this.isValidMove(board, newRow, newCol, row, col)) {
        moves[[newRow, newCol]] = null;
      } else if (this.isJumpPossible(board, newRow, newCol, row, col, dr, dc)) {
        const jumpRow = newRow + dr;
        const jumpCol = newCol + dc;
        moves[[jumpRow, jumpCol]] = [newRow, newCol];
      }
    }
    return moves;
  }

  getDirections(pieceType) {
    const normalDirections = (pieceType === 1 || pieceType === 3) ? [[-1, -1], [-1, 1]] : [];
    const kingDirections = (pieceType === 2 || pieceType === 4) ? [[1, 1], [1, -1]] : [];
    return [...normalDirections, ...kingDirections];
  } 

  isValidMove(board, newRow, newCol, row, col) {
    return this.isValidPosition(newRow, newCol) && board[newRow][newCol] === 0;
  }

  
  //Calculates moddle row and middle column
  isJumpPossible(board, newRow, newCol, row, col, dr, dc) {
    const middleRow = row + dr;
    const middleCol = col + dc;
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
    const pieces = this.getAllPieces(player);
    
    for (const piece of pieces) {
      const validMoves = this.getValidMoves(this.board, piece); 
      for (const [move, skip] of Object.entries(validMoves)) {
        const newBoard = this.simulateMove(piece, move.split(',').map(Number), this.board, skip); // Simulates the move
        allMoves.push(new GameModel(newBoard)); // Creates a new GameModel for each possible move
      }
    }
    
    return allMoves;
  }

  getAllPieces(player) {
    const pieces = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === player || this.board[row][col] === player + 2) {
          pieces.push([row, col]);
        }
      }
    }
    return pieces;
  }
  

  // Check if the game is over
  isGameOver() {
    const player1Pieces = this.getAllPieces(1).length;
    const player2Pieces = this.getAllPieces(2).length;
    return player1Pieces === 0 || player2Pieces === 0;
  }
}
export default GameModel;
