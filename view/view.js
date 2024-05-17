class GameView {
    constructor(controller) {
        this.controller = controller;
        this.boardElement = document.getElementById('gameBoard');
    }

    createBoard(gameBoard) {
        this.boardElement.innerHTML = '';  // Clear the board
        gameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                cellElement.style.backgroundColor = ((rowIndex + colIndex) % 2 === 0) ? '#808080' : '#000'; // Checkered pattern

                if (cell === 1 || cell === 2) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `player${cell} piece`;
                    cellElement.appendChild(pieceElement);
                }

                this.boardElement.appendChild(cellElement);
            });
        });
    }
}
