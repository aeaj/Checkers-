const RED = 2; // Constant Player 2 (AI)
const GREEN = 1; // Constant Player 1 (Human)

// Minimax with Alpha-Beta Pruning
export function minimax(
  position,
  depth,
  maxPlayer,
  alpha = -Infinity,
  beta = Infinity
) {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);
  console.log(position);
  // Base case: if depth is 0 or the game is over, return the evaluation of the position
  if (depth === 0 || position.isGameOver()) {
    const evaluation = position.evaluate();
    console.log("Reached terminal node with evaluation:", evaluation);
    return [evaluation, null]; // Return null for bestMove as it doesn't apply here
  }

  let bestMove = null;

  // If it's the maximizing player's turn (Player 1)
  if (maxPlayer) {
    let maxEval = -Infinity;

    // Get all possible moves for GREEN
    const moves = position.getAllPossibleMoves(GREEN);
    console.log(`Maximizing player possible moves:`, moves);

    for (const move of moves) {
      // Assume `move` is a new position resulting from a valid move application
      const [evaluation] = minimax(move, depth - 1, false, alpha, beta);
      console.log(`Evaluation for move: ${move} = ${evaluation}`);

      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestMove = move; // This needs to be the state of the game after the move
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        console.log("Alpha-Beta Pruning activated for maximizing player.");
        break;
      }
    }
    return [maxEval, bestMove];
  } else {
    let minEval = Infinity;

    // Get all possible moves for RED
    const moves = position.getAllPossibleMoves(RED);
    console.log(`Minimizing player possible moves:`, moves);

    for (const move of moves) {
      const [evaluation] = minimax(move, depth - 1, true, alpha, beta);
      if (evaluation < minEval) {
        minEval = evaluation;
        bestMove = move; // This needs to be the state of the game after the move
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        console.log("Alpha-Beta Pruning activated for minimizing player.");
        break;
      }
    }
    return [minEval, bestMove];
  }
}

export default minimax;
