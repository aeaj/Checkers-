class GameView {
    constructor() {
        this.boardElement = document.getElementById('gameBoard');
    }

    createBoard(gameBoard) {
        this.boardElement.innerHTML = '';
        gameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                cellElement.style.cssText = `background-color: ${((rowIndex + colIndex) % 2 === 0) ? '#808080' : '#000'}; position: relative;`;
                this.boardElement.appendChild(cellElement);
                if (cell > 0) {
                    cellElement.appendChild(this.createPiece(cell));
                }
            });
        });
    }

    createPiece(cell) {
        const pieceElement = document.createElement('div');
        pieceElement.className = `player${cell} piece`;
        pieceElement.style.cssText = `width: 40px; height: 40px; border-radius: 50%; background-color: ${cell === 1 ? 'green' : 'red'}; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
        return pieceElement;
    }

    updateBoard(gameBoard) {
        this.createBoard(gameBoard);
    }

    highlightPieces(row, col) {
        const cells = this.boardElement.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('highlight'));
        const index = row * 8 + col;
        cells[index].classList.add('highlight');
    }
}
