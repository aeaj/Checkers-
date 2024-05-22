
/*
function initAI(gameBoard, boardElement) {
    console.log("Initializing AI move...");
    
    makeComputerMove(gameBoard, boardElement);
}
 
function makeComputerMove(gameBoard, boardElement) {
    console.log("AI is calculating moves...");
    const possibleMoves = getPossibleMoves(gameBoard, 2); // Assuming '2' is the AI's player number
    if (possibleMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const move = possibleMoves[randomIndex];
        console.log(`AI chooses to move piece from [${move.fromRow},${move.fromCol}] to [${move.toRow},${move.toCol}]`);
        movePiece(move.fromRow, move.fromCol, move.toRow, move.toCol, gameBoard, boardElement);
    } else {
        console.log("No moves available for AI.");
    }
}

function getPossibleMoves(gameBoard, aiPlayer) {
    let moves = [];
    console.log(gameBoard)
    console.log(`AI (Player ${aiPlayer}) checking moves...`);
    for (let row = 0; row < gameBoard.length; row++) {
        for (let col = 0; col < gameBoard[row].length; col++) {
            console.log(gameBoard[row][col])
            console.log(aiPlayer)
            if (gameBoard[row][col] === aiPlayer) {
                console.log(`AI piece identified at [${row},${col}].`);
                const newMoves = getValidMoves(row, col, gameBoard, aiPlayer);
                moves = moves.concat(newMoves);
                if (newMoves.length > 0) {
                    console.log(`Valid moves found for AI piece at [${row},${col}]:`, newMoves);
                }
            }
        }
    }
    return moves;
}

function getValidMoves(row, col, gameBoard, playerNumber) {
    const directions = playerNumber === 2 ? [[1, -1], [1, 1]] : [[-1, 1], [-1, -1]];
    let validMoves = [];
    console.log(`Evaluating moves for player ${playerNumber} from position [${row},${col}]`);

    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < gameBoard.length && newCol >= 0 && newCol < gameBoard[row].length) {
            if (gameBoard[newRow][newCol] === 0) {
                validMoves.push({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol });
                console.log(`Valid move detected from [${row},${col}] to [${newRow},${newCol}]`);
            } else {
                console.log(`Blocked move from [${row},${col}] to [${newRow},${newCol}] - Space occupied`);
            }
        } else {
            console.log(`Out of bounds move attempted from [${row},${col}] to [${newRow},${newCol}]`);
        }
    });
    return validMoves;
}


function isValidMove(row, col, gameBoard) {
    const valid = row >= 0 && row < gameBoard.length && col >= 0 && col < gameBoard[row].length && gameBoard[row][col] === 0;
    console.log(`Move validation at [${row},${col}]: ${valid}`);
    return valid;
}


function movePiece(fromRow, fromCol, toRow, toCol, gameBoard, boardElement) {
    console.log(`Moving piece from [${fromRow},${fromCol}] to [${toRow},${toCol}]`);
    gameBoard[toRow][toCol] = gameBoard[fromRow][fromCol];
    gameBoard[fromRow][fromCol] = 0;
    updateBoardDisplay(gameBoard, boardElement);
}

function updateBoardDisplay(gameBoard, boardElement) {
    // Re-render the board based on the updated gameBoard array
    createBoard(gameBoard, boardElement);
}


function checkMovesAndJumps(row, col, gameBoard, playerNumber) {
    const directions = playerNumber === 2 ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : [[-1, 1], [-1, -1]]; // Ensure directions are correct for player
    let validMoves = [];
    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        // Check simple move
        if (isValidMove(newRow, newCol, gameBoard)) {
            validMoves.push({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol });
            console.log(`Simple move valid from [${row}, ${col}] to [${newRow}, ${newCol}]`);
        }
        // Check jump
        const jumpRow = newRow + dr;
        const jumpCol = newCol + dc;
        if (isValidJump(row, col, newRow, newCol, jumpRow, jumpCol, gameBoard, playerNumber)) {
            validMoves.push({ fromRow: row, fromCol: col, toRow: jumpRow, toCol: jumpCol });
            console.log(`Jump valid from [${row}, ${col}] to [${jumpRow}, ${jumpCol}] over [${newRow}, ${newCol}]`);
        }
    });
    return validMoves;
}

function isValidMove(row, col, gameBoard) {
    const valid = row >= 0 && row < gameBoard.length && col >= 0 && col < gameBoard[row].length && gameBoard[row][col] === 0;
    if (!valid) {
        console.log(`Move to [${row}, ${col}] is not valid.`);
    }
    return valid;
}

function isValidJump(fromRow, fromCol, overRow, overCol, toRow, toCol, gameBoard, playerNumber) {
    // Check that the jump is over an opponent's piece
    const isOverOpponent = gameBoard[overRow][overCol] === ((playerNumber % 2) + 1);
    // Check that the landing spot is valid and empty
    const isValidLanding = isValidMove(toRow, toCol, gameBoard);

    if (!isValidLanding) {
        console.log(`Invalid landing at [${toRow}, ${toCol}]`);
    }
    if (!isOverOpponent) {
        console.log(`No opponent to jump over at [${overRow}, ${overCol}]`);
    }

    return isOverOpponent && isValidLanding;
}
*/