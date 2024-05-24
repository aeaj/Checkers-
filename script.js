document.addEventListener('DOMContentLoaded', function() {
    // Opret instanser af MVC-komponenterne
    const model = new GameModel();
    const view = new GameView(); // Husk at sikre, at 'gameBoard' elementet eksisterer i din HTML
    const controller = new GameController(model, view);

    // Tildel view til controller
    view.controller = controller;

    // Andre globale handlinger eller initialiseringer kan inkluderes her
    console.log("Game initialized successfully");
});
