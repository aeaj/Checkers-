class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.createBoard(this.model.board);  // Initially create the board
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.view.boardElement.addEventListener('click', (event) => {
            if (event.target.className.includes('piece')) {
                const fromRow = parseInt(event.target.parentNode.dataset.row);
                const fromCol = parseInt(event.target.parentNode.dataset.col);
                // Define logic to determine toRow and toCol based on game rules
                // this.model.movePiece(fromRow, fromCol, toRow, toCol);
                // this.view.createBoard(this.model.board);  // Refresh the board
            }
        });
    }
}
