document.addEventListener('DOMContentLoaded', function() {
    // Create instances of the MVC components.
    const model = new GameModel();
    const view = new GameView();
    const controller = new GameController(model, view);
    // If you have other global actions or initializations, include them here.
});