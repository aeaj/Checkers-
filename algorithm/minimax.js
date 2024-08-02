const RED = 2; //Player 2 (AI)
const GREEN = 1; //Player 1 (Human)

//Minimax
export function minimax(position, depth, maxPlayer, alpha = -Infinity, beta = Infinity) {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);
  console.group("Depth " + depth);

  if (depth === 0 || position.isGameOver()) {
    const evaluation = position.evaluate();
    console.log("Reached terminal node with evaluation:", evaluation);
    console.groupEnd();
    return [evaluation, position];
  }

  if (maxPlayer) {
    let maxEval = -Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(RED);
    console.log(`Maximizing player possible moves:`, moves);
    for (const move of moves) {
      const evaluation = minimax(move, depth - 1, false, alpha, beta)[0];
      console.log(`Evaluation for move: ${move} = ${evaluation}`);

      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestMove = move;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        console.log("Alpha-Beta Pruning activated for maximizing player.");
        break;
      }
    }
    console.groupEnd();
    return [maxEval, bestMove];
  } else {
    let minEval = Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(GREEN);
    console.log(`Minimizing player possible moves:`, moves);

    for (const move of moves) {
      const evaluation = minimax(move, depth - 1, true, alpha, beta)[0];
      if (evaluation < minEval) {
        minEval = evaluation;
        bestMove = move;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        console.log("Alpha-Beta Pruning activated for minimizing player.");
        break;
      }
    }
    console.groupEnd();
    return [minEval, bestMove];
  }
}
export default minimax;
