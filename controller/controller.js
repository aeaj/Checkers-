class GameController {
  constructor(model, view) {
      this.model = model;
      this.view = view;
      this.selectedCell = null;  // Keeps track of the selected piece
      this.view.createBoard(this.model.board);
      this.attachEventListeners();
    }

    // Attach event listeners to the game board
    attachEventListeners() {
      // Ensure event listeners are attached to dynamically created elements
      this.view.boardElement.addEventListener('click', this.handleCellClick.bind(this));
    }
  
    // Method for handling clicks on pieces and empty cells)
    handleCellClick(event) {
      // Ensure we get the cell, not the piece inside
      const cell = event.target.closest('.cell'); 
      // Skip if clicked outside a cell
      if (!cell) return;   

      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      console.log(`Cell clicked: (${row}, ${col})`);

      const hasPiece = this.model.board[row][col] > 0;
      const piece = this.model.board[row][col];
    
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