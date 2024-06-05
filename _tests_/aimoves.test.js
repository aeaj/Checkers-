const GameModel = require('../model/model.js');
const GameView = require('../view/view.js');
const GameController = require('../controller/controller.js');
const minimax = require('../algorithm/minimax.js');

jest.mock('../algorithm/minimax.js', () => ({
  minimax: jest.fn(),
}));

describe('GameController', () => {
  let model, view, controller;

  beforeEach(() => {
    model = new GameModel();
    view = new GameView(model);
    controller = new GameController(model, view);
  });

  test('should switch to AI move after player 1 move', async () => {
    controller.model.movePiece = jest.fn().mockReturnValue(true);
    controller.switchPlayer = jest.fn();

    // Simulate player 1 moving a piece
    controller.selectedCell = { row: 5, col: 0 };
    controller.handleCellClick({ target: { closest: () => ({ dataset: { row: '4', col: '1' } }) } });

    // Ensure the player move was made
    expect(controller.model.movePiece).toHaveBeenCalledWith(5, 0, 4, 1);
    expect(controller.switchPlayer).toHaveBeenCalled();

    // Simulate AI move
    minimax.mockReturnValue([0, { board: model.board }]);
    await controller.aiMove();

    // Ensure AI move was processed
    expect(minimax).toHaveBeenCalledWith(model, 2, true);
    expect(controller.switchPlayer).toHaveBeenCalled();
  });

  test('AI move updates model and view', async () => {
    const newBoard = model.board.map(row => row.slice());
    newBoard[5][0] = 0;
    newBoard[4][1] = 1;
    minimax.mockReturnValue([0, { board: newBoard }]);

    await controller.aiMove();

    expect(controller.model.board).toEqual(newBoard);
    expect(controller.view.updateBoard).toHaveBeenCalledWith(newBoard);
  });
});
