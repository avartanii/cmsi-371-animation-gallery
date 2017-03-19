(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterLeft = false;

    // Import and prime images for drawing
    var tieFighterLeft = new Image();
    tieFighterLeft.onload = () => {
        readyTieFighterLeft = true;
    };
    tieFighterLeft.src = "Images/tie-fighters/tie-fighter-left.svg";

    let drawTieFighterLeft = (renderingContext) => {
        renderingContext.save();
        if (readyTieFighterLeft) {
            renderingContext.drawImage(tieFighterLeft,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.tieFighterLeft = (flightPlan) => {
        let renderingContext = flightPlan.renderingContext;

        renderingContext.save();
        drawTieFighterLeft(renderingContext);
        renderingContext.restore();
    };
})();
