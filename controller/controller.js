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

    handleCellClick(event) {
        const cell = event.target.closest('.cell'); // Ensure we get the cell, not the piece inside
        if (!cell) return; // Skip if clicked outside a cell

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const hasPiece = this.model.board[row][col] > 0;

        // If a piece is already selected and the click is on a different cell, try to move
        if (this.selectedCell && (this.selectedCell.row !== row || this.selectedCell.col !== col)) {
            if (this.model.movePiece(this.selectedCell.row, this.selectedCell.col, row, col)) {
                this.view.updateBoard(this.model.board); // Redraw board if move was successful
                this.selectedCell = null; // Reset selected piece after move
            }
        } else if (hasPiece) {
            // Select the piece if there's one at the clicked cell
            this.selectedCell = { row, col };
        }
    }
}
