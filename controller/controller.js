class GameController {
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
