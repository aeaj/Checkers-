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
    // Først sikre, at positionen er gyldig og at det ønskede felt er tomt
    if (!this.isValidPosition(toRow, toCol) || this.board[toRow][toCol] !== 0) {
      return false;
    }

    const piece = this.board[fromRow][fromCol];
    const rowDelta = toRow - fromRow;
    const colDelta = Math.abs(toCol - fromCol);

    // Tjek om bevægelsen er diagonal og kun et felt væk
    if (colDelta !== 1 || Math.abs(rowDelta) !== 1) {
      return false;
    }

    // Definer gyldige bevægelsesretninger baseret på briktype
    if ((piece === 1 && rowDelta !== 1) || (piece === 2 && rowDelta !== -1)) {
      return false;
    }

    // Udfør bevægelsen
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = 0;
    return true;
  }

  isValidPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }
}
*/