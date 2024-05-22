class GameModel {
    constructor() {
      this.board = this.setupInitialBoard(); // Initialiserer spillebrættet med startkonfigurationen af brikkerne.
    }
  
    setupInitialBoard() {
      // Opretter et 8x8 skakbræt med specifik initial placering af brikkerne.
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
      // Kontrollerer gyldigheden af den foreslåede bevægelse og opdaterer spillebrættet hvis gyldig.
      if (!this.isValidPosition(toRow, toCol) || this.board[toRow][toCol] !== 0) {
        return false;
      }
  
      const piece = this.board[fromRow][fromCol];
      const rowDelta = toRow - fromRow;
      const colDelta = Math.abs(toCol - fromCol);
  
      // Tjekker om bevægelsen er diagonal og kun et felt væk.
      if (colDelta !== 1 || Math.abs(rowDelta) !== 1) {
        return false;
      }
  
      // Definerer gyldige bevægelsesretninger baseret på briktype.
      if ((piece === 1 && rowDelta !== 1) || (piece === 2 && rowDelta !== -1)) {
        return false;
      }
  
      // Udfører bevægelsen ved at flytte brikken og rydde den gamle position.
      this.board[toRow][toCol] = piece;
      this.board[fromRow][fromCol] = 0;
      return true;
    }
  
    isValidPosition(row, col) {
      // Kontrollerer om den angivne position er inden for brættets grænser.
      return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
  }
  