class GameView {
    constructor(controller) {
        this.controller = controller;
        this.boardElement = document.getElementById('gameBoard');
    }

    createBoard(gameBoard) {
        this.boardElement.innerHTML = ''; // Clears the existing board
        gameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.style.backgroundColor = ((rowIndex + colIndex) % 2 === 0) ? '#808080' : '#000';
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;

                if (cell === 1 || cell === 2) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `player${cell} piece`;
                    pieceElement.style.width = '40px'; // Style as needed
                    pieceElement.style.height = '40px';
                    pieceElement.style.borderRadius = '50%';
                    pieceElement.style.backgroundColor = cell === 1 ? 'green' : 'red';
                    cellElement.appendChild(pieceElement);
                }
                this.boardElement.appendChild(cellElement);
            });
        });
    }

    updateBoard(gameBoard) {
        this.createBoard(gameBoard);  // Redraw the board with current state
    }
}
