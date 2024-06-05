const GameModel = require('../model/model.js');

describe('GameModel', () => {
  let model;

  beforeEach(() => {
    model = new GameModel();
  });

  test('should set up initial board correctly', () => {
    const expectedBoard = [
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    expect(model.board).toEqual(expectedBoard);
  });

  test('should evaluate board correctly', () => {
    model.board[0][1] = 0; // Remove one AI piece
    expect(model.evaluate()).toBe(1); // Player 1 is up by one piece
  });

  test('should check for a winner correctly', () => {
    model.board = model.board.map(row => row.map(cell => (cell === 2 ? 0 : cell))); // Remove all AI pieces
    expect(model.winner()).toBe(1); // Player 1 wins
  });

  test('should move a piece correctly', () => {
    const fromRow = 5;
    const fromCol = 0;
    const toRow = 4;
    const toCol = 1;
    const piece = model.board[fromRow][fromCol];

    expect(model.movePiece(fromRow, fromCol, toRow, toCol)).toBe(true);
    expect(model.board[toRow][toCol]).toBe(piece);
    expect(model.board[fromRow][fromCol]).toBe(0);
  });
});
