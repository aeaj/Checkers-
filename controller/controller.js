import GameModel from "../model/model.js";
import { minimax } from "../algorithm/minimax.js"; 

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.selectedCell = null; 
    this.currentPlayer = 1; // Player 1 starts
    this.view.createBoard(this.model.board);
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.view.boardElement.addEventListener(
      "click",
      this.handleCellClick.bind(this)
    );
  }

  // Method for handling clicks on pieces and empty cells
  handleCellClick(event) {
    // Ensure we get the cell, not the piece inside
    const cell = event.target.closest(".cell");
    // Skip if clicked outside a cell
    if (!cell) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    console.log(`Cell clicked: (${row}, ${col})`);

    const hasPiece = this.model.board[row][col] > 0;
    const piece = this.model.board[row][col];

    // If a piece is already selected and the click is on a different cell, try to move
    if (this.selectedCell && (this.selectedCell.row !== row || this.selectedCell.col !== col)) {
      console.log(
        `Attempting to move piece from (${this.selectedCell.row}, ${this.selectedCell.col}) to (${row}, ${col})`
      );

      if ( this.model.movePiece(this.selectedCell.row, this.selectedCell.col, row, col)) {
        console.log("Move successful.");
        this.view.updateBoard(this.model.board); // Redraw board if move was successful
        this.switchPlayer();
        this.view.unhighlightPiece(
          this.selectedCell.row,
          this.selectedCell.col
        ); 
        this.selectedCell = null;
      } else {
        console.log("Move failed.");
      }
    } else if (hasPiece && piece % 2 === this.currentPlayer % 2) {
      // Select the piece if there's one at the clicked cell and ensure player only selects their own pieces
      if (this.selectedCell) {
        this.view.unhighlightPiece(
          this.selectedCell.row,
          this.selectedCell.col
        ); // Unhighlight the previously selected piece
      }
      this.selectedCell = { row, col };
      this.view.highlightPiece(row, col);
      // Highlight the newly selected piece
      console.log(`Piece selected at (${row}, ${col})`);
    }
  }

  // Method to switch to the next player
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; // Toggle between player 1 and 2
    console.log(`Switched to Player ${this.currentPlayer}`);

    if (this.currentPlayer === 2) {
      // If it's the AI's turn, let the AI make a move
      this.aiMove();
    }
  }

  // Method for AI move
  async aiMove() {
    console.log("AI is thinking...");
    
    // Introduce a delay to simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 2000)); //1000 milliseconds

    const [evaluation, bestMove] = minimax(this.model, 2, true); // depth is = 2 and may have to adjust
    console.log(`AI selected move with evaluation: ${evaluation}`);
    
    if (bestMove && bestMove.board) {
      this.updateModelAndView(bestMove.board);
      this.switchPlayer(); // Switch back to the human player after the AI move
    } else {
      console.log("AI could not find a valid move.");
    }
  }

  updateModelAndView(newBoard) {
    this.model.board = newBoard;
    this.view.updateBoard(this.model.board);
  }
}

export default GameController;
