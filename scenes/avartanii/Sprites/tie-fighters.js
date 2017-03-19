(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighters = false;

    // Import and prime images for drawing
    var tieFighters = new Image();
    tieFighters.onload = () => {
        readyTieFighters = true;
    };
    tieFighters.src = "Images/tie-fighters/tie-fighters.svg";

    let drawTieFighters = (renderingContext) => {
        renderingContext.save();
        if (readyTieFighters) {
            renderingContext.drawImage(tieFighters, -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFighters = (empireReppin) => {
        let renderingContext = empireReppin.renderingContext;

        renderingContext.save();
        drawTieFighters(renderingContext);
        renderingContext.restore();
    };
})();
