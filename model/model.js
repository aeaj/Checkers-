import { minimax } from "../algorithm/minimax.js"; 

class GameModel {
  constructor() {
    console.log("Initializing the game model...");
    this.board = this.setupInitialBoard();
    console.table(this.board);
    console.log("Initial board setup complete:");
  }

  // Method to set up the initial game board
  // 1 = Player 1
  // 2 = Player 2 (AI)
  // 0 = Empty field
  setupInitialBoard() {
    return [
      [0, 0, 0, 2, 0, 2, 0, 2],
      [2, 0, 1, 0, 2, 0, 2, 0],
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
    console.log(
      `Attempting to move piece from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol})...`
    );

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

  // Method to evaluate the board
  evaluate() {
    let evaluation = 0;
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 1) {
          evaluation += 1;
        } else if (this.board[row][col] === 2) {
          evaluation -= 1;
        } else if (this.board[row][col] === 3) {
          evaluation += 2; // Kings are more valuable
        } else if (this.board[row][col] === 4) {
          evaluation -= 2;
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
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 1 || this.board[row][col] === 3) {
          player1Pieces++;
        } else if (this.board[row][col] === 2 || this.board[row][col] === 4) {
          player2Pieces++;
        }
      }
    }

    if (player1Pieces === 0) {
      console.log("Player 2 wins!");
      return 2;
    } else if (player2Pieces === 0) {
      console.log("Player 1 wins!");
      return 1;
    }
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

    board[fromRow][fromCol] = 0;
    board[toRow][toCol] = piece;

    if (skip) {
      const [skipRow, skipCol] = skip;
      board[skipRow][skipCol] = 0;
    }

    return board;
  }

  // Get valid moves for a piece
  getValidMoves(board, piece) {
    const [row, col] = piece;
    const pieceType = board[row][col];
    const moves = {};

    // Define directions for normal pieces and kings
    const directions =
      pieceType === 1 || pieceType === 3
        ? [
            [-1, -1],
            [-1, 1],
          ]
        : [];
    const kingDirections =
      pieceType === 2 || pieceType === 4
        ? [
            [1, 1],
            [1, -1],
          ]
        : [];

    for (const [dr, dc] of [...directions, ...kingDirections]) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (this.isValidPosition(newRow, newCol) && board[newRow][newCol] === 0) {
        moves[[newRow, newCol]] = null;
      } else if (
        this.isValidPosition(newRow, newCol) &&
        (board[newRow][newCol] === 1 || board[newRow][newCol] === 2)
      ) {
        const jumpRow = newRow + dr;
        const jumpCol = newCol + dc;
        if (
          this.isValidPosition(jumpRow, jumpCol) &&
          board[jumpRow][jumpCol] === 0
        ) {
          moves[[jumpRow, jumpCol]] = [newRow, newCol];
        }
      }
    }
    return moves;
  }

  getAllPieces(player) {
    const pieces = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (
          this.board[row][col] === player ||
          this.board[row][col] === player + 2
        ) {
          pieces.push([row, col]);
        }
      }
    }
    return pieces;
  }
  
  getAllPossibleMoves(player) {
    const allMoves = [];

    // Iterate through all pieces of the current player
    const pieces = this.getAllPieces(player);

    for (const piece of pieces) {
      const validMoves = this.getValidMoves(this.board, piece);

      for (const [move, skip] of Object.entries(validMoves)) {
        const newBoard = this.simulateMove(piece, move.split(',').map(Number), this.board, skip);
        allMoves.push(new GameModel(newBoard)); // Create a new GameModel for each possible move
      }
    }

    return allMoves;
  }

  isPlayerPices(piece,player){
    if(player==1)return[1,3]
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
