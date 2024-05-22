class GameController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.selectedCell = null;  // Keeps track of the selected piece
      this.view.createBoard(this.model.board);
      this.attachEventListeners();
    }
  
    attachEventListeners() {
      // Ensure event listeners are attached to dynamically created elements
      this.view.boardElement.addEventListener('click', this.handleCellClick.bind(this));
    }
  
    // Method for handling clicks on cells (pieces or empty cells)
    handleCellClick(event) {
      const cell = event.target.closest('.cell'); 
      // Ensure we get the cell, not the piece inside
      if (!cell) return; 
      // Skip if clicked outside a cell
  
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const hasPiece = this.model.board[row][col] > 0;
  
      console.log(`Cell clicked: (${row}, ${col})`);
  
      // If a piece is already selected and the click is on a different cell, try to move
      if (this.selectedCell && (this.selectedCell.row !== row || this.selectedCell.col !== col)) {
        console.log(`Attempting to move piece from (${this.selectedCell.row}, ${this.selectedCell.col}) to (${row}, ${col})`);

        if (this.model.movePiece(this.selectedCell.row, this.selectedCell.col, row, col)) {
          console.log("Move successful.");
          this.view.updateBoard(this.model.board); // Redraw board if move was successful
          this.view.unhighlightPiece(this.selectedCell.row, this.selectedCell.col); // Unhighlight the previously selected piece
          this.selectedCell = null; // Reset selected piece after move
        } else {
          console.log("Move failed.");
        }
    } else if (hasPiece) {
        // Select the piece if there's one at the clicked cell
        if (this.selectedCell) {
          this.view.unhighlightPiece(this.selectedCell.row, this.selectedCell.col); // Unhighlight the previously selected piece
        }
        this.selectedCell = { row, col };
        this.view.highlightPiece(row, col); 
        // Highlight the newly selected piece
        console.log(`Piece selected at (${row}, ${col})`);
      }
    }
  }

/*class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.selectedCell = null;
        this.view.createBoard(this.model.board);
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Tilføj event listeners til cellerne en enkelt gang
        this.view.boardElement.addEventListener('click', (event) => {
            const cell = event.target.closest('.cell'); // Sikrer at vi får cellen
            if (!cell) return;
            this.handleCellClick(cell);
        });
    }

    handleCellClick(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const hasPiece = this.model.board[row][col] > 0;

        if (this.selectedCell && (this.selectedCell.row !== row || this.selectedCell.col !== col) && hasPiece) {
            if (this.model.movePiece(this.selectedCell.row, this.selectedCell.col, row, col)) {
                this.view.updateBoard(this.model.board);
                this.selectedCell = null;
            }
        } else if (hasPiece) {
            this.selectedCell = { row, col };
            this.view.highlightPieces(row, col);
        }
    }
}
*/
