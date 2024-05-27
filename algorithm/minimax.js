const RED = 2; //Constant Player 2 (AI)
const GREEN = 1; //Constant Player 1 (Human)

//Minimax og Alpha-Beta-Pruning
function minimax(
  position,
  depth,
  maxPlayer,
  alpha = -Infinity,
  beta = Infinity
) {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);

    // Base case: if depth is 0 or the game is over, return the evaluation of the position
  if (depth === 0 || position.isGameOver()) {
    const eval = position.evaluate();
    console.log("Reached terminal node with evaluation:", eval);
    return [eval, position];
  }

   // If it's the maximizing player's turn (Player 1)
  if (maxPlayer) {
    let maxEval = -Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(GREEN); // Player 1 (green)
    for (const move of moves) {
      const evaluation = minimax(move, depth - 1, false, alpha, beta)[0];
      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestMove = move;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return [maxEval, bestMove];
  } else {
    let minEval = Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(RED); // Player 2 (red)
    for (const move of moves) {
      const evaluation = minimax(move, depth - 1, true, alpha, beta)[0];
      if (evaluation < minEval) {
        minEval = evaluation;
        bestMove = move;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return [minEval, bestMove];
  }
}

module.exports = { minimax };
