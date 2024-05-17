class GameModel {
    constructor() {
        this.board = this.setupInitialBoard();
    }

    setupInitialBoard() {
        // Initial setup based on your game
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

    movePiece(fromRow, fromCol, toRow, toCol) {
        if (this.isValidPosition(toRow, toCol) && this.board[toRow][toCol] === 0) {
            // Swap positions
            this.board[toRow][toCol] = this.board[fromRow][fromCol];
            this.board[fromRow][fromCol] = 0;
            return true;
        }
        return false;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
}
