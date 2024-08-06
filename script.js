import GameModel from "./model/model.js";
import GameView from "./view/view.js";
import GameController from "./controller/controller.js";
import minimax from "./algorithm/minimax.js";

document.addEventListener('DOMContentLoaded', function() {
    const model = new GameModel();
    const view = new GameView();
    const controller = new GameController(model, view); //Update
});
