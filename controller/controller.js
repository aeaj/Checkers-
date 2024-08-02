import GameModel from "../model/model.js";
import { minimax } from "../algorithm/minimax.js"; 

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentPlayer = 1; // Player 1 starts (Green)
    this.selectedCell = null; 
    this.view.createBoard(this.model.board); // Initialize the board view
    this.attachEventListeners();
  }

  // Method for handling clicks on pieces and empty cells
  handleCellClick(event) {
    // Ensure we get the cell, not the piece inside
    const cell = event.target.closest(".cell");
    if (!cell) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    const hasPiece = this.model.board[row][col] > 0;
    const piece = this.model.board[row][col];

    if (this.selectedCell && (this.selectedCell.row !== row || this.selectedCell.col !== col)) {
      if (this.model.movePiece(this.selectedCell.row, this.selectedCell.col, row, col)) {
        this.updateModelAndView(this.model.board); // Update model and view
        this.switchPlayer();
        this.view.unhighlightPiece(this.selectedCell.row, this.selectedCell.col); 
        this.selectedCell = null;
      }
    } else if (hasPiece && piece % 2 === this.currentPlayer % 2) {
      if (this.selectedCell) {
        this.view.unhighlightPiece(this.selectedCell.row, this.selectedCell.col);
      }
      this.selectedCell = { row, col };
      this.view.highlightPiece(row, col);
    }
  }

  // Method to switch to the next player
  switchPlayer() {
    if (this.model.isGameOver() !== null) {
      this.handleGameOver();
      return;
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    if (this.currentPlayer === 2) {
      this.aiMove();
    }
  }

  handleGameOver() {
    const winner = this.model.isGameOver();
    if (winner === 1) {
      alert("Game over! Player 1 (Green) wins!");
    } else if (winner === 2) {
      alert("Game over! Player 2 (Red) wins!");
    }

    // Optionally, reset the game or disable further moves
  }

  // Method for AI move
  async aiMove() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI thinking time

    const [evaluation, bestMove] = minimax(this.model, 2, true); // Use minimax to find the best move
    if (bestMove && bestMove.board) {
      this.updateModelAndView(bestMove.board); // Update model and view with the AI's move
      this.switchPlayer(); // Switch back to the human player
    }
  }

  // Update model and view with new board state
  updateModelAndView(newBoard) {
    this.model.board = newBoard;
    this.view.updateBoard(this.model.board);

    if (this.model.isGameOver() !== null) {
      this.handleGameOver();
    }
  }


  // Method to attach event listeners to the view
  attachEventListeners() {
    this.view.boardElement.addEventListener(
      "click",
      this.handleCellClick.bind(this)
    );
  }
}

export default GameController;
