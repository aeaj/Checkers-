const RED = 2; //Player 2 (AI)
const GREEN = 1; //Player 1 (Human)

//Minimax
export function minimax(position, depth, maxPlayer, alpha = -Infinity, beta = Infinity) {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);
  console.group("Depth " + depth);

  if (depth === 0 || position.isGameOver() !== null) {
    const evaluation = position.evaluate();
    console.log("Reached terminal node with evaluation:", evaluation);
    console.groupEnd();
    return [evaluation, position];
  }

  if (maxPlayer) {
    let maxEval = -Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(RED);
    for (const move of moves) {
      const [evaluation,] = minimax(move, depth - 1, false, alpha, beta);
      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestMove = move;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return [maxEval, bestMove];
  } else {
    let minEval = Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(GREEN);
    for (const move of moves) {
      const [evaluation,] = minimax(move, depth - 1, true, alpha, beta);
      if (evaluation < minEval) {
        minEval = evaluation;
        bestMove = move;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return [minEval, bestMove];
  }
}
export default minimax;
