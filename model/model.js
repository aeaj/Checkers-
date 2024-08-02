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

  // Method for defining the pieces to be king for each player
  isKing(row, col) {
    // Kings are denoted by 3 for player 1, and 4 for player 2
    return this.board[row][col] === 3 || this.board[row][col] === 4;
  }

  // Method to move a piece from one position to another
  movePiece(fromRow, fromCol, toRow, toCol) {
    if (!this.isValidPosition(fromRow, fromCol) || !this.isValidPosition(toRow, toCol)) {
        return false;
    }

    const piece = this.board[fromRow][fromCol];
    if (this.isValidPosition(toRow, toCol) && this.board[toRow][toCol] === 0) {
        if (!this.isKing(fromRow, fromCol)) {
            if (piece === 1 && toRow >= fromRow) {
                console.log("Invalid move for Player 1: Cannot move backwards.");
                return false;
            } else if (piece === 2 && toRow <= fromRow) {
                console.log("Invalid move for Player 2: Cannot move backwards.");
                return false;
            }
        }

        if (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 1) {
            this.board[toRow][toCol] = this.board[fromRow][fromCol];
            this.board[fromRow][fromCol] = 0;
            this.checkForKing(toRow, toCol, this.board);
            console.table(this.board);
            return true;
        }

        if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2) {
            const middleRow = (fromRow + toRow) / 2;
            const middleCol = (fromCol + toCol) / 2;

            if (this.isValidPosition(middleRow, middleCol)) {
                const middlePiece = this.board[middleRow][middleCol];
                if (middlePiece !== 0 && middlePiece % 2 !== piece % 2) {
                    this.board[toRow][toCol] = this.board[fromRow][fromCol];
                    this.board[fromRow][fromCol] = 0;
                    this.board[middleRow][middleCol] = 0;
                    this.checkForKing(toRow, toCol, this.board);
                    console.table(this.board);
                    return true;
                }
            }
        }
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
  checkForKing(row, col, board) {
    if (!this.isValidPosition(row, col)) {
        return;
    }

    const piece = board[row][col];
    
    if (piece === 1 && row === 0) {
        board[row][col] = 3; // King for Player 1
    } else if (piece === 2 && row === 7) {
        board[row][col] = 4; // King for Player 2
    }
}
  // Simulate a move for Minimax algorithm
  simulateMove(from, to, board, skip) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = board[fromRow][fromCol];
    
    // Ensure to correctly clone and update the board
    const newBoard = board.map(row => row.slice());
    newBoard[fromRow][fromCol] = 0;
    newBoard[toRow][toCol] = piece;
    
    if (skip) {
      const [skipRow, skipCol] = skip;
      newBoard[skipRow][skipCol] = 0;
    }
    
    this.checkForKing(toRow, toCol, newBoard);
    
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
            const jumpCol = newCol;
            moves[[jumpRow, jumpCol]] = [newRow, newCol];
        }
    }
    return moves;
}

  getDirections(pieceType) {
    if (pieceType === 1) return [[-1, -1], [-1, 1]]; // Normal piece for Player 1
    if (pieceType === 2) return [[1, 1], [1, -1]]; // Normal piece for Player 2
    if (pieceType === 3 || pieceType === 4) return [[-1, -1], [-1, 1], [1, 1], [1, -1]]; // King for both players
    return [];
  }

  isValidMove(board, newRow, newCol, row, col) {
    return this.isValidPosition(newRow, newCol) && board[newRow][newCol] === 0;
  }

  
  //Calculates moddle row and middle column
  isJumpPossible(board, newRow, newCol, row, col, dr, dc) {
    const middleRow = row + dr;
    const middleCol = col + dc;
    console.log(`Checking jump: from (${row}, ${col}) to (${newRow}, ${newCol}), middle: (${middleRow}, ${middleCol})`);
    
    if (!this.isValidPosition(middleRow, middleCol)) {
        console.log(`Invalid position for jump: middleRow=${middleRow}, middleCol=${middleCol}`);
        return false;
    }
    
    const middlePiece = board[middleRow][middleCol];
    const currentPiece = board[row][col];
    const isOpponentPiece = middlePiece !== 0 && (middlePiece % 2 !== currentPiece % 2);
    console.log(`Middle piece value: ${middlePiece}, Current piece value: ${currentPiece}, Is opponent: ${isOpponentPiece}`);
    
    return (
        isOpponentPiece &&
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