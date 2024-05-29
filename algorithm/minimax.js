const RED = 2; //Constant Player 2 (AI)
const GREEN = 1; //Constant Player 1 (Human)

//Minimax og Alpha-Beta-Pruning
export function minimax(
  position,
  depth,
  maxPlayer,
  alpha = -Infinity,
  beta = Infinity
) {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);

    // Base case: if depth is 0 or the game is over, return the evaluation of the position
  if (depth === 0 || position.isGameOver()) {
    const evaluation = position.evaluate();
    console.log("Reached terminal node with evaluation:", evaluation);
    return [evaluation, position];
  }

   // If it's the maximizing player's turn (Player 1)
  if (maxPlayer) {
    let maxEval = -Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(GREEN); // Player 1 (green)
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
    return [maxEval, bestMove];
  } else {
    let minEval = Infinity;
    let bestMove = null;

    const moves = position.getAllPossibleMoves(RED); // Player 2 (red)
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
    return [minEval, bestMove];
  }
}

export default minimax ;

