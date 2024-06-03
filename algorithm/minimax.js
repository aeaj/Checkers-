const RED = 2; //Player 2 (AI)
const GREEN = 1; //Player 1 (Human)

//Minimax
export function minimax(
  position, //The current state of the game board.
  depth, //The current depth in the game tree.
  maxPlayer, //A boolean indicating if the current player is the maximizing player (true for Player 1, false for Player 2).
  alpha = -Infinity, //The best value that the maximizing player can guarantee.
  beta = Infinity) //The best value that the minimizing player can guarantee.
  {
  console.log("Minimax called with depth:", depth, "and maxPlayer:", maxPlayer);
  console.group("Depth " + depth);

  // Base case: if depth is 0 or the game is over, return the evaluation of the position
  if (depth === 0 //depth === 0: Indicates we've reached the maximum depth for evaluation.
    || position.isGameOver()) //Checks if the game has ended.
    {
    const evaluation = position.evaluate(); //This evaluates the current position on the board.
    console.log("Reached terminal node with evaluation:", evaluation);
    console.groupEnd();
    return [evaluation, position]; //The return value is an array containing the evaluation score and the position.
  }

  // Maximizing (Player 1)
  if (maxPlayer) {
    let maxEval = -Infinity; // Initialiserer maxEval til negativ uendelighed
    let bestMove = null; // Initializes bestMove to null

    const moves = position.getAllPossibleMoves(GREEN); // Gets all possible moves for Player 1
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
        break; //Exits the loop early
      }
    }
    console.groupEnd();
    return [maxEval, bestMove]; // Returns the highest evaluation and the best move
  } 
  //Minimizing
  else {
    let minEval = Infinity; // Initializes minEval to infinity
    let bestMove = null; // Initializes bestMove to null

    const moves = position.getAllPossibleMoves(RED); // Player 2
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
        break; // Exits the loop early
      }
    }
    console.groupEnd();
    return [minEval, bestMove]; // Returns the lowest evaluation and the best move
  }
}
export default minimax;
