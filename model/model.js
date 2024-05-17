class GameModel {
    constructor() {
        this.board = this.setupInitialBoard();
    }

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

    isValidPosition(row, col) {
        return row >= 0 && col >= 0 && row < 8 && col < 8;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
    gameBoard[toRow][toCol] = gameBoard[fromRow][fromCol];
    gameBoard[fromRow][fromCol] = 0;
    // Handle capture
    if (overRow !== undefined && overCol !== undefined) {
        gameBoard[overRow][overCol] = 0; // Remove the captured piece
        console.log(`Captured piece at [${overRow}, ${overCol}]`);
    }
    createBoard(gameBoard, boardElement); // Re-render the board
    }
}
