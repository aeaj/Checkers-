const RED = 2; //Player 2 (AI)
const GREEN = 1; //Player 1 (Human)

//Minimax
export function minimax(position, depth,  maxPlayer,  alpha = -Infinity, beta = Infinity) {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);
  console.group("Depth " + depth);

  // Base case: if depth is 0 or the game is over, return the evaluation of the position
  if (depth === 0 || position.isGameOver()) {
    const evaluation = position.evaluate(); //evaluates the current position on the board.
    console.log("Reached terminal node with evaluation:", evaluation);
    console.groupEnd();
    return [evaluation, position]; //Return value is an array containing the evaluation score and the position.
  }

  // Maximizing (Player 1)
  if (maxPlayer) {
    let maxEval = -Infinity; 
    let bestMove = null; 

    const moves = position.getAllPossibleMoves(GREEN); //Player 1 (Human)
    console.log(`Maximizing player possible moves:`, moves);
    for (const move of moves) {
      const evaluation = minimax(move, depth - 1, false, alpha, beta)[0]; // Recursive call to minimax for minimizing player
      console.log(`Evaluation for move: ${move} = ${evaluation}`);

      if (evaluation > maxEval) {
        maxEval = evaluation; // Updates maxEval if the current evaluation is higher
        bestMove = move; // Updates bestMove if the current evaluation is higher
      } 
      //Alpha-Beta-Pruning
      alpha = Math.max(alpha, evaluation); //Updates alpha
      if (beta <= alpha) {
        console.log("Alpha-Beta Pruning activated for maximizing player.");
        break; 
      }
    }
    console.groupEnd();
    return [maxEval, bestMove]; // Returns the highest evaluation and the best move
  } 
  //Minimizing
  else {
    let minEval = Infinity; 
    let bestMove = null; 

    const moves = position.getAllPossibleMoves(RED); // Player 2 (AI)
    console.log(`Minimizing player possible moves:`, moves);

    for (const move of moves) {
      const evaluation = minimax(move, depth - 1, true, alpha, beta)[0];// Recursive call to minimax for maximizing player
      if (evaluation < minEval) {
        minEval = evaluation; // Updates minEval if the current evaluation is lower
        bestMove = move; // Updates bestMove if the current evaluation is lower
      } 
      //Alpha Beta Pruning
      beta = Math.min(beta, evaluation); // Updates beta
      if (beta <= alpha) {
        console.log("Alpha-Beta Pruning activated for minimizing player.");
        break; 
      }
    }
    console.groupEnd();
    return [minEval, bestMove]; // Returns the lowest evaluation and the best move
  }
}
export default minimax;
