class GameController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.selectedCell = null;  // Keeps track of the selected piece
      this.view.createBoard(this.model.board);
      this.attachEventListeners();
      this.currentPlayer=1; // Game start with player one
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
      const hasPiece = this.model.board[row][col] ===this.currentPlayer;
  
      console.log(`Cell clicked: (${row}, ${col})`);
  
      // If a piece is already selected and the click is on a different cell, try to move
      if (this.selectedCell && (this.selectedCell.row !== row || this.selectedCell.col !== col)) {
        console.log(`Attempting to move piece from (${this.selectedCell.row}, ${this.selectedCell.col}) to (${row}, ${col})`);
         // Attempts to move the piece acording to the game rules 
        if (this.model.movePiece(this.selectedCell.row, this.selectedCell.col, row, col)) {
          console.log("Move successful.");
          this.view.updateBoard(this.model.board); // Redraw board if move was successful
          this.view.unhighlightPiece(this.selectedCell.row, this.selectedCell.col); // Unhighlight the previously selected piece
          this.selectedCell = null; // Reset selected piece after move
          // switch the current player after a succesful move
           this.currentPlayer=this.currentPlayer===1?2:1;
           }else{
            console.log("Move faild"); // Log a failed move attempt 
           }  
    } else if (hasPiece) {
        // if the clicked cell contains a piece of the current player 
        if (this.selectedCell) {
          // if another pices was slected  before, unhelight it 
          this.view.unhighlightPiece(this.selectedCell.row, this.selectedCell.col); // Unhighlight the previously selected piece
        }
        this.selectedCell = { row, col };
        this.view.highlightPiece(row, col); 
        // Highlight the newly selected piece
        console.log(`Piece selected at (${row}, ${col})`);
      }
    }
  }

