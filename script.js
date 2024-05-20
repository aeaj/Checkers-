document.addEventListener('DOMContentLoaded', () => {
    var gameBoard = setupInitialBoard();
    var boardElement = document.getElementById('gameBoard');
    createBoard(gameBoard, boardElement);
    attachEventListeners(gameBoard, boardElement);
});

// Board
// 1 = Spiller
// 2 = AI/CP
// 0 = Tomme Felter
function setupInitialBoard() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0], // Player 2/AI (red) starts from the top
        [0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0], // Empty middle rows
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0], // Player 1 (green) starts from the bottom
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
    ];
}


function createBoard(gameBoard, boardElement) {
    boardElement.innerHTML = ''; // Clear the board
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.style.backgroundColor = (rowIndex + colIndex) % 2 === 0 ? '#FFFFFF' : '#000000'; //Farve på brættet
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;

            if (cell === 1 || cell === 2) {
                const pieceElement = document.createElement('div');
                pieceElement.className = cell === 1 ? 'player1 piece' : 'player2 piece';
                cellElement.appendChild(pieceElement);
            }
            boardElement.appendChild(cellElement);
        });
    });
}

function attachEventListeners(gameBoard, boardElement) {
    boardElement.querySelectorAll('.player1.piece').forEach(piece => {
        piece.addEventListener('click', event => {
            const row = parseInt(piece.parentElement.dataset.row);
            const col = parseInt(piece.parentElement.dataset.col);
            selectPiece(row, col, gameBoard, boardElement);
            event.stopPropagation();
        });
    });
}

function selectPiece(row, col, gameBoard, boardElement) {
    console.log(`Piece at row ${row}, col ${col} selected`);
    highlightPossibleMoves(row, col, gameBoard, boardElement);
}

function highlightPossibleMoves(row, col, gameBoard, boardElement) {
    const moves = [];
    const captures = [];
    const player = gameBoard[row][col];
    const directions = player === 1 ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]]; // Only forward moves for normal pieces

    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        // Check simple move
        if (isValidPosition(newRow, newCol) && gameBoard[newRow][newCol] === 0) {
            moves.push({ newRow, newCol });
        }
        // Check for captures
        const jumpRow = newRow + dr;
        const jumpCol = newCol + dc;
        if (isValidPosition(jumpRow, jumpCol) && gameBoard[jumpRow][jumpCol] === 0 && gameBoard[newRow][newCol] === (player % 2) + 1) {
            captures.push({ jumpRow, jumpCol, overRow: newRow, overCol: newCol });
        }
    });

    // Highlight moves and captures
    moves.forEach(({ newRow, newCol }) => {
        highlightCell(newRow, newCol, boardElement);
    });
    captures.forEach(({ jumpRow, jumpCol }) => {
        highlightCell(jumpRow, jumpCol, boardElement, true);
    });

    // Add click event to execute move or capture
    moves.concat(captures).forEach(move => {
        const { newRow, newCol } = move;
        const targetCell = boardElement.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`);
        targetCell.addEventListener('click', () => movePiece(row, col, newRow, newCol, gameBoard, boardElement, move.overRow, move.overCol));
    });
}

function movePiece(fromRow, fromCol, toRow, toCol, gameBoard, boardElement, overRow, overCol) {
    // Move piece
    gameBoard[toRow][toCol] = gameBoard[fromRow][fromCol];
    gameBoard[fromRow][fromCol] = 0;
    // Handle capture
    if (overRow !== undefined && overCol !== undefined) {
        gameBoard[overRow][overCol] = 0; // Remove the captured piece
        console.log(`Captured piece at [${overRow}, ${overCol}]`);
    }
    createBoard(gameBoard, boardElement); // Re-render the board
}

function isValidPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function highlightCell(row, col, boardElement, isCapture = false) {
    const cell = boardElement.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add(isCapture ? 'highlight-capture' : 'highlight-move');
}

function handlePlayerMove(fromRow, fromCol, toRow, toCol, gameBoard, boardElement) {
    // Assuming the move is valid and has been made
    movePiece(fromRow, fromCol, toRow, toCol, gameBoard, boardElement);
    console.log(`Player 1 moves piece from [${fromRow},${fromCol}] to [${toRow},${toCol}]`);
    // Trigger AI move
    initAI(gameBoard, boardElement);
}
// Additional helper functions to manage game state