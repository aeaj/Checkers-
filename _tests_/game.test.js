const GameModel = require('../model/model.js');  

describe('Checkers Game Tests', () => {
  let model;

  beforeEach(() => {
    model = new GameModel();
  });

  test('green piece becomes king and moves back and forth', () => {
    model.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0]  // A green piece about to become king
    ];

    // Move the green piece to the last row to make it a king
    model.movePiece(7, 0, 6, 1); // Move green piece forward
    model.movePiece(6, 1, 5, 2);
    model.movePiece(5, 2, 4, 3);
    model.movePiece(4, 3, 3, 4);
    model.movePiece(3, 4, 2, 5);
    model.movePiece(2, 5, 1, 6);
    model.movePiece(1, 6, 0, 7); // Reaching the last row to become a king

    expect(model.board[0][7]).toBe(3); // Check if the piece became a king

    model.movePiece(0, 7, 1, 6); // Move king back
    expect(model.board[1][6]).toBe(3);

    model.movePiece(1, 6, 0, 7); // Move king forward
    expect(model.board[0][7]).toBe(3);
});  // Check if the king moved forward
  });
